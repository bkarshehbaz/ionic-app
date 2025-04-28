import { forEach, lowerCase } from "lodash";
import { Observable, Observer, of, Subject } from "rxjs";
import * as cf from "../../constants/constant-fields";
import * as cat from "../../constants/event-categories";
import { LocalStorageService } from "../local-storage-service/local-storage-service";
import { VVSApp } from "../vvs-controller/vvs-controller";
import { _get_MakeModelIDs_by_Names } from './util/get-make-model-ids-by-names';
import { IElasticLunrItemResult, IElasticLunrResultSet } from '../../lib/vvs-bridge/elastic-lunr';
import { _getChatIndex } from "./util/get-chat-index";
import { _getMakeIndex } from './util/get-make-index';
import { _getModelIndex } from './util/get-model-index';
import { _getRecentActivityIndex } from "./util/get-recent-activity-index";
import { _getTicketIndex } from "./util/get-ticket-index";
import { _initIndexChat } from './util/init-index-chat';
import { _initIndexRecentActivity } from './util/init-index-recent-activity';
import { _initIndexTicket } from './util/init-index-ticket';
import { _initModelIndex } from "./util/init-model-index";

// import { of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Logger } from '../vvs-controller/util/logger';
import { GlobalSearch } from "../../pages/global-search/global-search";
import { IObservableData } from "../../lib/vvs-bridge";
const logger = Logger.get("search-service");

export interface IMakeModelResults {
	results: {ref: number}[];
	query: string;
}

export class SearchService {

    public static instance: SearchService;
    public static get(vvsApp: VVSApp): SearchService {
        return SearchService.instance || ( SearchService.instance = new SearchService(vvsApp) );
    }

    chatIndex: any ;
    makeIndex: any ;
    modelIndex: any ;
    recentActivityIndex: any ;
    ticketIndex: any ;

    makeModelService: Observable<IObservableData<IMakeModelResults>>;
    makeModelObserver: Observer<IObservableData<IMakeModelResults>>;

    public lss: LocalStorageService;

    constructor(private vvsApp: VVSApp) {
        this.lss = this.vvsApp.lss;

        this.makeModelService = new Observable( (observer: Observer<IObservableData<IMakeModelResults>>) => {
				this.makeModelObserver = observer;
		});

        this.ticketIndex = _getTicketIndex();
        this.chatIndex = _getChatIndex();
        this.makeIndex = _getMakeIndex();
        this.modelIndex = _getModelIndex();
        this.recentActivityIndex = _getRecentActivityIndex();

    }


    /********************************************************************
    * elasticlunr indexes
    * http://elasticlunr.com/
    ********************************************************************/

    // TODO: to finish this
    initIndexRecentActivity = (cb: any): void => _initIndexRecentActivity(this, cb);

    searchRecentActivitiesIndex(query: string): IElasticLunrItemResult[] {
        return this.recentActivityIndex.search(query, { expand: true });
    }

    initIndexChat = (cb: any): void => _initIndexChat(this, cb);

    searchIndexChat(query: string): IElasticLunrItemResult[] {
        return this.chatIndex.search(query, {expand: true});
    }

    initMakeIndex($makes: any): void {
        forEach($makes, (value) => { this.makeIndex.addDoc(value); });
    }

    searchMakeIndex(query: string): void {
        this.makeModelObserver
        .next({
			category: cat.SEARCH_MAKES_RESULT,
			data: {
				results: this.makeIndex.search(query, {expand: true}),
				query
			}
		});
    }

    get_MakeModelIDs_by_Names = (makeName: string, modelName: string) =>
        _get_MakeModelIDs_by_Names(this, makeName, modelName)

    initModelIndex = ( modelObject: any): Promise<any> =>
        _initModelIndex(this, modelObject)

    searchModelIndex(query: string): void {
        this.makeModelObserver.next({
			category: cat.SEARCH_MODELS_RESULT,
			data: {
				results: this.modelIndex.search(query, {expand: true}),
				query
			}
		});
    }

    /*******************************************************************
    * elasticlunr indexes
    * http://elasticlunr.com/
    ********************************************************************/
    initIndexTicket = (): void => _initIndexTicket(this);

    search(terms: Subject<string>, type: GlobalSearch): Observable<IElasticLunrResultSet> {
        // logger.l("search, times called?", type.segment, type.searchableType);
        return terms.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap(term => this._search(term, type.segment))
		);
    }

    private _search(term: string, type: "ticket" | "chat" | "recent"): Observable<IElasticLunrResultSet> {
        logger.l(term, type);
        switch (type) {
            case cf.ticket:
                return of( { result: this.ticketIndex.search(term, { expand: true }), type, term } );

            case cf.chat:
                return of( { result : this.searchIndexChat(term), type, term } );

            case cf.recent:
                return of( { result : this.searchRecentActivitiesIndex(term), type, term } );

        }
    }

}
