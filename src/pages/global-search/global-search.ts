import { Component, Renderer2, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { SearchSegmentType } from './global-search.options';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { Content, InfiniteScroll, NavController, NavParams, Segment, IonicPage } from 'ionic-angular';
import { forEach, isEmpty, values, orderBy, lowerCase, map } from 'lodash';
import * as t from '../../constants/constant-titles';
import * as c from '../../constants/css-values';
import * as cf from '../../constants/constant-fields';

import {
	StringMap,
	NumericMap,
	IRecentActivityItem,
	IKeyboardShowEvent,
	IImportantHeaders,
	IChat,
    IRecentActivityType
} from '../../lib/vvs-bridge';

import { IElasticLunrItemResult, IElasticLunrResultSet } from '../../lib/vvs-bridge/elastic-lunr';

import { Logger } from "../../providers/vvs-controller/util/logger";
import { IRecentActivityItemClick } from '../logs-page/recent-activity-item/recent-activity-item.options';

import { IFullTicket } from '../../util';
import { takeWhile } from 'rxjs/operators';
import { KeyboardService } from '../../providers/keyboard/keyboard-service';
import { Debounce } from 'lodash-decorators/debounce';

const logger = Logger.get("GlobalSearch");

interface InputEvent {
    composed: boolean;
    inputType: "deleteContentBackward"|"insertText";
    target: {value: string};
}

@IonicPage({
	name: "global-search"
})
@Component({
    selector: 'global-search',
    templateUrl: './global-search.html'
})
export class GlobalSearch implements OnDestroy {

    @ViewChild(Content) content: Content;

	searchInputValue: string = "";
    searchTerm$ = new Subject<string>();


    tickets: IFullTicket[] = [];
    ticketObject: StringMap<IFullTicket>; // = {>;
    ticketsSubject: Subject<NumericMap<IFullTicket>> = new Subject<NumericMap<IFullTicket>>();


    chats: IChat[] = [];
    chatObject: NumericMap<IChat>; // = {>;


    recents: IRecentActivityItem[] = [];
    recentObject: NumericMap<IRecentActivityItem>; // = {>;

	recentLimit: number = 30;
    recentInfinite: Observer<InfiniteScroll>;

    icons: string = cf.ticket;

    _segment: SearchSegmentType = cf.ticket;

    set segment(val) {
        this._segment = val;
        this.detectChanges();
    }
    get segment() {
        return this._segment;
    }

    detectChanges() {
		try {
			this.cdr.detectChanges();
			setTimeout( () => this.cdr.detectChanges() );
		} catch(e) {
			// nothing
		}
	}


    recentActivities: SearchSegmentType;

    initialSegment: SearchSegmentType;

    iH: IImportantHeaders;


	loadingObserver = new Subject<boolean>();

	isDestroyed = false;

    tloaded = false;
    rloaded = false;

    constructor(
        public vvsApp: VVSApp,
        public renderer: Renderer2,
        private navCtrl: NavController,
        private navParams: NavParams,
        private cdr: ChangeDetectorRef,
    ) {
		this.isDestroyed = false;
		logger.info("********* created");
	}

	ngOnDestroy() {
		logger.info("ngOnDestroy");
		this.isDestroyed = true;
	}

	ionViewDidLeave() {
		KeyboardService.unsubscribe();
	}

	ionViewDidLoad() {
		this.loadingObserver.next(true);

		setTimeout( () => this.__ionViewDidLoad(), 500);
	}

	__ionViewDidLoad() {
		logger.info("__ionViewDidLoad");

		this.isDestroyed = false;

		this._ionViewDidLoad();

		this.initialSegment = this.navParams.get(cf.segment) || undefined;

		if (this.initialSegment) {
			this.segment = this.initialSegment;
			this.searchInputValue = this.navParams.get(cf.query) || "";

			if (this.navParams.get(cf.recentActivities)) {
				this.recents = this.navParams.get(cf.recentActivities) || [];
			}

		} else {
			this.segment = cf.ticket;
		}

		this.vvsApp.searchService.initIndexTicket();

        this.vvsApp
		.searchService
		.search(this.searchTerm$, this)
		.pipe( takeWhile(_ => !this.isDestroyed) )
		.subscribe(
			(resultset: IElasticLunrResultSet) => {

				logger.l(resultset);
				switch (resultset.type as SearchSegmentType) {

					case cf.ticket:
						this.filterTicketsByIDs(resultset.result);
						break;

					case cf.recent:
						this.filterRecentActivitiesByIDs(resultset.result, resultset.term);
						break;

					case cf.chat:
						this.filterChatByIDs(resultset.result);
						break;

				}

                this.detectChanges();
			},
			logger.e
		);

        this.detectChanges();
    }

    doSearch(ev: InputEvent) {
        if (ev.inputType !== "deleteContentBackward") {
            this.searchTerm$.next(ev.target.value);
            this.detectChanges();
        } else if (ev.target.value.length < 3) {
            this.reset();
        }
    }

    filterTicketsByIDs(items: IElasticLunrItemResult[]) {
        this.tickets = [];
        if (items.length > 0) {
            forEach( items, (item: IElasticLunrItemResult) => {
                !isEmpty(this.ticketObject[item.ref])
                && this.tickets.push(this.ticketObject[item.ref]);
            });
        } else {
            // this.resetTickets();
        }
    }

    filterChatByIDs(items: IElasticLunrItemResult[]) {
        this.chats = [];
        if (items.length > 0) {
            forEach( items, (item: IElasticLunrItemResult) => {
                !isEmpty(this.chatObject[item.ref])
                && this.chats.push(this.chatObject[item.ref]);
            });
        } else {
            this.resetChats();
        }
    }

    filterRecentActivitiesByIDs(items: IElasticLunrItemResult[], term: string) {
        // debugger;
        this.recents = [];
        if (items.length > 0) {
            forEach( items, (item: IElasticLunrItemResult) => {
                !isEmpty(this.recentObject[item.ref])
                && this.recents.push(this.recentObject[item.ref]);
            });

            // debugger;

            const rtypes = this.vvsApp.lss.getRawValue("RecentActivityType") as NumericMap<IRecentActivityType>;

            const lterm = lowerCase(term).replace(" ", "_");
            if (map(rtypes, x => x.recentActivityTypeName.toLowerCase()).includes(lterm)) {
                this.recents = this.recents.filter( x => rtypes[x.recentActivityTypeID] && rtypes[x.recentActivityTypeID].recentActivityTypeName.toLowerCase() == lterm );
            }
            // else if ( lowerCase(term) == "pull request" ) {
            //     this.recents.filter( x => rtypes[x.activityTypeID].recentActivityTypeName.toLowerCase() == "pull request" );
            // }

            // logger.info("this.recents", this.recents, rtypes);

        } else {
            // this.resetRecents();
        }
    }


    setScrollContentWhenKeyboardClose(contentMarginBottom: string) {
        this.renderer.setStyle(this.scrollContentElement, c.marginBottom, contentMarginBottom);
    }
    setScrollContentWhenKeyboardOpen(marginBottom: string) {
        this.renderer.setStyle(this.scrollContentElement, c.marginBottom, marginBottom);
    }

    _ionViewDidLoad() {
        this.addKeyboardListeners();
        this.scrollContentElement = this.content.getScrollElement();

        this.getTickets();
	}

	@Debounce(100)
	doRecentInfinite(infiniteScroll: InfiniteScroll) {
		const max = this.recents && this.recents.length ? this.recents.length : 9999;

		if (this.recentLimit <= max) {
			this.recentLimit += 30;
		}
		if (infiniteScroll) {
			try {
				infiniteScroll.complete();
			} catch (err) {
				logger.error(err);
			}
		}
	}

    hideKeyboard() {
        KeyboardService.hide();
    }

    // TODO add footer photos bar height
    addKeyboardListeners() {

		const show = KeyboardService.onShow(this.renderer).subscribe(
			(e: IKeyboardShowEvent) =>
				this.setScrollContentWhenKeyboardOpen(e.keyboardHeight + c.px)
		);

		const hide = KeyboardService.onHide(this.renderer).subscribe(
			() => this.setScrollContentWhenKeyboardClose(c.zpx)
		);

		KeyboardService.setSubscriptions(show, hide);
    }

    onSegmentChange(ev: Segment) {
        logger.l("onSegmentChange", this.initialSegment, ev._value, this.recentObject);
        if (this.initialSegment && ev._value === this.initialSegment) {
            switch (this.initialSegment) {
                case cf.recent:
                    this.resetRecents();
                    break;

                case cf.chat:
                    this.resetChats();
                    break;
            }
            this.initialSegment = undefined;
        } else {
            switch (ev._value) {
                case cf.ticket:
                    !this.ticketObject && this.getTickets();
                    break;

                case cf.recent:
                    if (!this.recentObject) {
                        this.vvsApp.searchService.initIndexRecentActivity(() => {
							logger.info("onSegmentChange", "getRecents");
                            this.getRecents();
                        });
                    }
                    break;

                case cf.chat:
                    if (!this.chatObject) {
                        this.vvsApp.searchService.initIndexChat(() => {});
                        this.getChats();
                    }
                    break;
            }
        }
    }

    onCancel(ev: any) {
        logger.l("onCancel");
        this.onClear(ev);
    }

    onClear(ev: any) {
        logger.l("onClear");
        this.searchTerm$.next('');
        this.reset();
    }

    reset() {
        this.resetTickets();
        this.resetRecents();
        this.resetChats();

        this.detectChanges();
    }

    presentSelectPopover({ ev, rAI }: IRecentActivityItemClick) {
        // logger.l(event);
        // presentSelectPopover({ev, rAI}: IRecentActivityItemClick) {

        this.vvsApp.presentSelectPopover(
			this.navCtrl,
			{ ev, rAI },
			(val: number) => { },
			t.FILTER_OPTIONS,
			false,
			"search"
		);

        // this.vvsApp.presentSelectPopover(this.navCtrl, );
    }

    resetTickets() {
        logger.l("resetTickets");
        const tickets = [];
        forEach(this.ticketObject, (ticket) => {
            !isEmpty(ticket) && tickets.push(ticket);
        });

        this.tickets = tickets; //values(this.ticketObject);
        this.detectChanges();
    }

    resetChats() {
        logger.l("resetChats");
		this.chats = orderBy(values(this.chatObject), ["chatID"], ["desc"]);

        this.detectChanges();
    }

    resetRecents() {
        logger.l("resetRecents");
		this.recents = this.recentObject ? values(this.recentObject) : this.recents;

        this.detectChanges();
    }

    getTickets() {
		// throw new Error("Not Implemented");
		this.vvsApp.lss.getCurrentTicketData()
		.then( (ticketObject) => {
			this.ticketObject = ticketObject;
			this.resetTickets();
            this.dismissLoading();
            this.tloaded = true;
		})
		.catch(logger.error);
	}

	dismissLoading() {
		this.loadingObserver.next(false);
	}

    getRecents() {
		this.vvsApp.lss.getRecentActivityRequiredData()
		.then( ([$recents, raTypes, users, tickets]) => {
            // forEach( $recents, recent => {
            //     recent.message = recent.message || this.vvsApp.lss.getRaMessage(recent, raTypes, users, tickets);
            // });
            this.vvsApp.lss.transformRecentActivities($recents, raTypes, users, tickets);

			this.recentObject = $recents;
            this.rloaded = true;
            this.resetRecents();
		});
    }

    getChats() {
		Promise.all([
			this.vvsApp.lss.getChatData(),
			this.vvsApp.lss.getPropertyUserData()
		])
		.then( (chatData) => {
			this.chatObject = chatData[0];
            this.resetChats();
		})
		.catch(logger.error);
    }

    private scrollContentElement: HTMLElement;

}
