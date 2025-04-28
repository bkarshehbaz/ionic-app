import { Content, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { ISearchableType } from './searchable-popover.options';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, ViewRef } from '@angular/core';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { filter, isEmpty, map as _map, isNumber } from 'lodash';
import * as cf from '../../constants/constant-fields';
import * as t from '../../constants/constant-titles';
import { checkValue, doScroll } from "../../util/index";
import { Observable, fromEvent, merge } from 'rxjs';
import { IMake, IModel } from '../../lib/vvs-bridge';
// import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, startWith, map, finalize, takeWhile } from 'rxjs/operators';
import { Logger } from "../../providers/vvs-controller/util/logger";
// import { takeWhile } from 'rxjs/operators';
import { Taptic } from '../../providers/haptic-service';
import { to } from '../../util/to';
import { FormControl } from '@angular/forms';
import { includesIgnoreCase } from '../../util/equals-ignore-case';
const logger = Logger.get("searchable-popover");

interface InputEvent {
    composed: boolean;
    inputType: "deleteContentBackward"|"insertText";
    target: {value: string};
}

export interface ISearchablePopoverCallbackResult {
    makeID?: number;
    makeName?: string;
    lastMakeFilterKeyword?: string;

    modelID?: number;
    modelName?: string;
    lastModelFilterKeyword?: string;
}

@IonicPage({
	name: "searchable-popover"
})
@Component({
    selector: "searchable-popover",
    templateUrl: "./searchable-popover.html"
})
export class SearchablePopover implements OnInit, OnDestroy {

    @ViewChild('searchableContent') searchableContent: Content;

    // @ViewChild("searchBar") searchBar: Searchbar;

	filter = new FormControl('');

    isLoading: boolean = true;

    callback: (data: ISearchablePopoverCallbackResult) => void;


    title: string;
    searchableType: ISearchableType = "make";

    make: IMake;

	makes$: Observable<IMake[]>;
	models$: Observable<IModel[]>;

    myLimit: number = 10;

    // loading;
    contentInitTimeout = undefined;
	isFiltering: boolean = false;

	isDestroyed = false;

	private makes: IMake[];
	private models: IModel[];

    constructor(
		private vvsApp: VVSApp,
		public viewCtrl: ViewController,
		private navParams: NavParams,
		private cdr: ChangeDetectorRef,
	) {

        this.isLoading = true;
		this.isDestroyed = false;
	}


	ngOnDestroy() {
		this.isDestroyed = true;
	}

    trackByMakeId(index: number, item: IMake) {
        return item != null ? item.makeID : null;
    }
    trackByModelId(index: number, item: IModel) {
        return item != null ? item.modelID : null;
    }

    isMake = () => this.searchableType === cf.make;
    isModel = () => this.searchableType === cf.model;

    ngOnInit() {//NOTE: //this one is ideal, but it doesn't look as good.
    // ngAfterContentInit() {//NOTE: //this one looks better, but it gets call so many times, but maybe it doesn't affect Performance
		this.isDestroyed = false;

		if (checkValue(this.contentInitTimeout)) {
            clearTimeout(this.contentInitTimeout);
        } else {

            this.searchableType = this.navParams.get(cf.searchableType) || logger.e("No searchableType");
            this.callback = this.navParams.get(cf.callback);

			this.title = (this.isMake()) ? t.SELECT_A_MAKE : t.SELECT_A_MODEL_FOR + this.navParams.get(cf.make).makeName;

            if (this.searchableType && this.isMake()) {

				this.contentInitTimeout = setTimeout( () => {
                    this.myLimit = 10;

                    this.initMake();

                    this.addMakeListScrollListener();

                    this.restoreSearch();

				}, 150);

				this.makes$ = this.filter.valueChanges.pipe(
					takeWhile( _ => !this.isDestroyed ),
					startWith(''),
					map(text =>
						filter(this.makes, make => includesIgnoreCase(make.makeName, text) )
						.slice(0, this.myLimit)
					),
					finalize( () => {
						this.isFiltering = false;
						this.detectChanges();
					})
				);

            } else {
                this.contentInitTimeout = setTimeout( () => {
                    this.initModel();

                    this.addModelListScrollListener();

                    this.restoreSearch();

				}, 150);

				this.models$ = this.filter.valueChanges.pipe(
					takeWhile( _ => !this.isDestroyed ),
					startWith(''),
					map(text =>
						filter(this.models, model => includesIgnoreCase(model.modelName, text) )
						.slice(0, this.myLimit)
					),
					finalize( () => {
						this.isFiltering = false;
						this.detectChanges();
					})
				);

            }
        }
    }

    restoreSearch() {
		const searchTerm = this.navParams.get("lastSearchKeyword") || "";
		this.filter.setValue(searchTerm);
    }

    addMakeListScrollListener() {

		// console.log("searchableContent", this.searchableContent.getScrollElement())
        merge(
			fromEvent(this.searchableContent.getScrollElement(), "scroll"),
			fromEvent(this.searchableContent.getScrollElement(), "wheel")
		)
        .pipe(
			takeWhile( _ => !this.isDestroyed ),
			debounceTime(100),
			// distinctUntilChanged(),
		)
		.subscribe( (event: Event) => {
			logger.info("scrolling");
			doScroll(
				event,
				this.filter.value,
				3,
				() => {
					logger.info("scrolling");
					if (this.myLimit <= this.makes.length) {
						this.myLimit += 10;
						this.triggerInputChange();
						this.detectChanges();
					}
				}
			);

		});
	}

	triggerInputChange() {
		this.filter.setValue(this.filter.value);
	}

    addModelListScrollListener() {

        fromEvent(this.searchableContent.getScrollElement(), "scroll")
		.pipe(
			takeWhile( _ => !this.isDestroyed ),
			debounceTime(100)
		)
		.subscribe(
			(event: Event) => {
				doScroll(
					event,
					this.filter.value,
					3,
					() => {
						if (this.myLimit <= this.models.length) {
							this.myLimit += 10;
							this.triggerInputChange();
							this.detectChanges();
						}
					}
				);
			},
			logger.error
		);
    }

    async initMake() {
		const [makes] = await to<IMake[]>(this.vvsApp.lss.getMakesWithCommon());
		this.makes = makes || [];
		this.triggerInputChange();
		this.isLoading = false;
		this.detectChanges();
    }

    async initModel() {
		this.make = this.navParams.get(cf.make);
		const [models] = await to<IModel[]>(this.vvsApp.lss.getModelsByMakeID(this.make.makeID));
		this.models = models || [];
		this.triggerInputChange();
		this.isLoading = false;
		this.detectChanges();
	}

    onMakeSelected({ makeID, makeName }: IMake) {
        logger.assert(!isNumber(makeID), "makeID must be a number", { makeID, makeName });
		logger.assert(isEmpty(makeName), "makeName must not be empty", { makeID, makeName });
		Taptic.selection();
        this.callback({ makeID, makeName, lastMakeFilterKeyword: this.filter.value });
        this.close();
    }

    onModelSelected({ modelID, modelName }: IModel) {
        logger.assert(!isNumber(modelID), "modelID must be a number", { modelID, modelName });
		logger.assert(isEmpty(modelName), "modelName must not be empty", { modelID, modelName });
		Taptic.selection();
        this.callback({ modelID, modelName, lastModelFilterKeyword: this.filter.value });
        this.close();
    }

    close() {
        this.searchableType = "" as ISearchableType;
        this.viewCtrl.dismiss().then().catch(logger.e);
    }

	onInput() {
		this.detectChanges();
	}

	detectChanges() {
		if (this.isDestroyed) {
			return;
		}

		this._detectChanges();
		setTimeout( () => {
			this._detectChanges();
		});
	}

	private _detectChanges() {
		if (this.cdr && !(this.cdr as ViewRef).destroyed) {
			this.cdr.detectChanges();
		}
	}

}
