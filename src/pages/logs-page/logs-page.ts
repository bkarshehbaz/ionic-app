import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChildren, QueryList, ElementRef, ViewChild, ViewRef } from '@angular/core';
import { InfiniteScroll, NavController, IonicPage, List } from 'ionic-angular';
import { IRecentActivityItemClick } from './recent-activity-item/recent-activity-item.options';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { forEach, isEmpty, isNil, cloneDeep, isArray, map as _map, values, filter } from 'lodash';
import * as cat from '../../constants/event-categories';
import * as cf from '../../constants/constant-fields';
import * as t from '../../constants/constant-titles';

import { IRecentActivityGroupItem,
         IRecentActivityItem,
         IRecentActivityObservable,
         IRecentActivityObservableData,
         IRecentActivityType,
         NumericMap } from '../../lib/vvs-bridge';

import * as FO from '../../enums/filter-option.enum';
import { _getVisible, getInactiveKeys } from './logs-page.util';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { Debounce } from 'lodash-decorators/debounce';
import { takeWhile } from 'rxjs/operators';

const logger = Logger.get("LogsPage");

@IonicPage({
	name: "logs"
})
@Component({
    selector: "recent-activity",
    templateUrl: "./logs-page.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsPage implements OnDestroy {

    // @ViewChild(List, { read: ElementRef }) groupList: ElementRef;
    
    // private _itemGroups: QueryList<any>;
    // @ViewChildren("itemGroups")
    // set itemGroups(val) {
    //     this._itemGroups = val;
    //     logger.info("itemGroups", this._itemGroups);

    //     if (this._itemGroups && this._itemGroups.changes.subscribe) {
    //         this._itemGroups.changes.subscribe(
    //             x => {
    //                 logger.info("changes", x);
    //             }
    //         );
    //     }
    // }
    // get itemGroups() {
    //     return this._itemGroups;
    // }

    groups: IRecentActivityGroupItem[] = [];
    recentActivityCount: number = 0;

    recentActivityTypesArray: IRecentActivityType[] = [];
    recentActivityTypesObject: NumericMap<IRecentActivityType> = {};

    // tabSelected: string = cf.recent;

    myLimit = 150;

    pageActive: boolean = true;

	loaded: boolean;
	countShown: number = 0;

	isDestroyed = false;

    LIMIT_INCREASE_RATE = 10;
    constructor(
        private cdRef: ChangeDetectorRef,
        private navCtrl: NavController,
        public vvsApp: VVSApp
    ) {
        this.LIMIT_INCREASE_RATE = this.vvsApp.platform.is("ipad") ? 20 : 10;
	}

	openFilter() {
		const data = {
			recentActivityTypesArray: cloneDeep(this.recentActivityTypesArray)
		};

		logger.info("openFilter", data);

		this.vvsApp.presentModal(
			"recent-activity-filter",
			data,
			(res: any) => {
				logger.info("res", res);
				if (isArray(res)) {
					const changes: IRecentActivityType[] = [];
					forEach(res, (val, index) => {
						if (this.recentActivityTypesArray[index].status != res[index].status) {
							// toggle the original one
							changes.push(this.recentActivityTypesArray[index]);
						}
					});
					logger.info("changes", changes);
					_map(changes, rat => this.toggleType(rat) );
				}
			}
		);
	}

	ngOnDestroy() {
		this.isDestroyed = true;
	}

	ionViewDidEnter() {
		this.vvsApp.presentLoading();

		this.vvsApp.recentActivityBadge.clear();

		this.refresh();

         // we were already doing what Nahom suggested (  You, 4 months ago   (May 1st, 2019 10:50pm) )
		this.vvsApp.httpService.doSync();
	}

	refresh() {
		this.vvsApp.lss.getRecentActivityToDisplayTo(cf.tab)
		.then( (data: IRecentActivityObservableData) => {
            this.doRecentActivities(data);

            const ras: IRecentActivityItem[] = [];

            forEach(this.groups, (group) => {
                ras.push(...values(group.recentActivities));
            });

            forEach(this.recentActivityTypesObject, (val, key) => {
                val.recentActivityTypeNameWithCount = 
                    val.recentActivityTypeName + ` (${
                        filter(ras, ra =>
                            ra.recentActivityTypeID == val.recentActivityTypeID
                        )
                        .length
                    })`;
            });

			this.vvsApp.dismissLoading('');

		});
	}


	// mutationObserver: MutationObserver;

    /**
     * [ionViewDidLoad description]
     * @method ionViewDidLoad
     * @return {[type]}       [description]
     */
    ionViewDidLoad() {
		if (this.loaded) {
			return;
		}

		this.vvsApp.lss.getRecentActivityTypeData()
		.then( (data: NumericMap<IRecentActivityType>) => {
            this.recentActivityTypesObject = data;
        })
		.then( () => this.toggleCustomFilters(false, false, true) )
		.catch(logger.e);

		this.subscribe();

        this.loaded = true;
        

        // this.mutationObserver = new MutationObserver((mutations) => {
		// 	logger.info("chatList mutation", mutations);
        //     // this.content.scrollToBottom();
        // });

        // this.mutationObserver.observe(this.groupList.nativeElement, {
        //     // childList: true, subtree: true, 
        //     attributes: true
		// });

    }

    doRecentActivities({ groups, recentActivityCount, recentActivityTypes }: IRecentActivityObservableData) {
        // isEmpty(groups) && this.vvsApp.httpService.initializeTickets("doRecentActivities");
        this.groups = cloneDeep(groups);
        this.recentActivityCount = cloneDeep(recentActivityCount);
        this.recentActivityTypesObject = cloneDeep(recentActivityTypes);
        this.resetFilters();
		this.onFilterChange();
		// logger.info("groups", this.groups);
    }

    turnOffFilters() {
        forEach(this.recentActivityTypesObject, (r: IRecentActivityType) => {
            this.recentActivityTypesObject[r.recentActivityTypeID].status = false;
        });
    }

    toggleBy(toggleKey, toggleValue) {

		// increase limit if

        this.turnOffFilters();

        forEach(this.groups, (group: IRecentActivityGroupItem, groupKey) => {

            const offFilters = this.toggleRecentActivities(group.recentActivities,
                                                           groupKey,
                                                           toggleKey,
                                                           toggleValue,
                                                           undefined,
                                                           undefined);

            forEach( offFilters, (offFilter: number, k) => {
                this.recentActivityTypesObject[k].status = true;
            });
        });

        this.toggleCustomFilters();

        this.onFilterChange();

    }

    toggleRecentActivities(rAIs: NumericMap<IRecentActivityItem>,
                           groupKey: any,
                           toggleKey,
                           toggleValue,
                           isVisible: boolean,
                           inactives: number[],
                           overrideAll = false) {

        const offFilters: NumericMap<number> = {};
        this.groups[groupKey].shownCount = 0;

        forEach(rAIs, (rAI: IRecentActivityItem, k) => {

            const visible = overrideAll || _getVisible(isVisible, inactives, rAI[toggleKey], toggleValue);

            this.groups[groupKey].recentActivities[k].show = visible;

            if(visible === true) {
                offFilters[rAI.recentActivityTypeID] = 1;
				this.groups[groupKey].shownCount++;
				this.countShown++;
            }

        });

        return offFilters;
    }

    resetFilters() {
        this.toggleCustomFilters(false);
    }

    toggleCustomFilters(offOn?: boolean, detectChanges: boolean = true, firstTime = false) {

        if (firstTime) {
            this.detectChanges();
            return;
        }

        this.recentActivityTypesArray = [];
        forEach(this.recentActivityTypesObject, (val: IRecentActivityType) => {
            if (!isNil(offOn)) {
                val.status = offOn;
            }
            val.recentActivityTypeName && this.recentActivityTypesArray.push(val);
		});

		this.recentActivityTypesArray.sort( (a, b) => {
            return (a.recentActivityTypeName || "").localeCompare(b.recentActivityTypeName || "");
        });

        if (detectChanges !== true) {
            this.detectChanges();
        }
    }

    toggleByCurrentTicketID(currentTicketID: number) {
        this.toggleBy("currentTicketID", currentTicketID + "");
    }

    toggleByUserID(userID: number) {
        this.toggleBy("userID", userID);
    }

    toggleType(rat: any|IRecentActivityItem|{type?: string, status?: boolean, userID: number}) {

        // toggle Filter
        rat.status = rat.status === true ? false : true;

        const inactives: number[] = getInactiveKeys(this.recentActivityTypesObject);

        let overrideAll = false;
        if (inactives.length == values(this.recentActivityTypesObject).length ) {
            // alert("Do something");
            // this.toggleCustomFilters(false);
            // return;
            overrideAll = true;
        }

		this.countShown = 0;

        forEach(this.groups, (group: IRecentActivityGroupItem, groupKey: number) => {

            this.toggleRecentActivities(group.recentActivities,
                                        groupKey,
                                        "recentActivityTypeID",
                                        undefined,
                                        undefined,
                                        inactives,
                                        overrideAll);

		});

		if (this.countShown < this.recentActivityCount) {
			this.myLimit += this.LIMIT_INCREASE_RATE - 2;
		}

        this.onFilterChange();

    }

    reset() {
        this.resetFilters();

        forEach(this.groups, (group: IRecentActivityGroupItem, groupKey: number) => {
            this.toggleRecentActivities(group.recentActivities,
                                        groupKey,
                                        undefined,
                                        undefined,
                                        true,
                                        undefined);
        });

        this.onFilterChange();
    }

    // presentSelectPopover($ev: IRecentActivityItemClick) {
    presentSelectPopover({ ev, rAI }: IRecentActivityItemClick) {

        this.vvsApp.presentSelectPopover(this.navCtrl, { ev, rAI }, (val: number) => {

            switch(val) {
                 case FO.FILTER_BY_TICKET_NUMBER:
                    //  this.toggleByTicketNumber(rAI.ticketNumber);
                     this.toggleByCurrentTicketID(rAI.currentTicketID);
                     break;

                 case FO.FILTER_BY_USER:
                     this.toggleByUserID(rAI.userID);
                     break;
            }

        }, t.FILTER_OPTIONS, true, null);
    }

    onFilterChange() {
        // this.reloadElements();
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
		if (this.cdRef && !(this.cdRef as ViewRef).destroyed) {
			this.cdRef.detectChanges();
		}
	}

    ionViewWillEnter() {
        this.pageActive = true;
        this.detectChanges();
    }
    ionViewWillLeave() {
        this.pageActive = false;
        this.detectChanges();
	}

	@Debounce(100)
	doInfinite(infiniteScroll: InfiniteScroll): void {
		if (this.myLimit <= this.recentActivityCount) {
			this.myLimit += this.LIMIT_INCREASE_RATE;
		}
		if (infiniteScroll) {
			try {
				infiniteScroll.complete();
				this.detectChanges();
			} catch (err) {
				logger.error(err);
			}
		}
	}

	private subscribe() {
		this.vvsApp.reactive.recentActivity
		.pipe(takeWhile(_ => !this.isDestroyed))
		.subscribe(
			({ category, data }: IRecentActivityObservable|any) => {
				logger.i({ category, data });
				switch(category) {
					case cat.RECENT_ACTIVITIES:
						this.refresh();
						break;
				}

				this.vvsApp.dismissLoading('');
			},
			logger.e
		);
	}
}
