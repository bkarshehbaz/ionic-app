import {
	ChangeDetectionStrategy,
	Component,
	ComponentRef,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	QueryList,
	Renderer2,
	ViewChildren,
	ViewContainerRef,
	ViewRef,
	ChangeDetectorRef,
} from '@angular/core';

import * as c from '../../../constants/css-values';
import { VVSApp, IActions } from "../../../providers/vvs-controller/vvs-controller";
import { TicketItemOptions } from "../ticket-item-options/ticket-item-options";

import {
	forEach,
	isBoolean,
	map as _map,
	// delay,
	cloneDeep,
	get
} from "lodash";
import { IOpenSpanOption, NumericMap, IImage } from '../../../lib/vvs-bridge';
// import { from } from 'rxjs/observable/from';
// import { debounceTime } from 'rxjs/operators/debounceTime';
// import { map } from 'rxjs/operators/map';
import { takeWhile, debounceTime, repeatWhen, map, delay } from 'rxjs/operators';
// import { repeatWhen } from 'rxjs/operators/repeatWhen';
import { Observable, Observer, from } from 'rxjs';
import { Logger } from "../../../providers/vvs-controller/util/logger";
import { getFormattedHTML, getTimeDiffInMinute } from './ticket-item-view.util';
import { IFullTicket } from '../../../util/process-full-ticket';
import { getAllowedOperations } from '../../../util/ticket/get-allowed-operations';
import { Debounce } from 'lodash-decorators';
import { InfiniteScroll } from 'ionic-angular';
import { Taptic } from '../../../providers/haptic-service';
import { RollbarService } from '../../../services/rollbar';

const logger = Logger.get("TicketItemView");

@Component({
    selector: "ticket-item-view",
    templateUrl: "./ticket-item-view.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketItemView implements OnInit, OnDestroy {

    _tickets: IFullTicket[];

	@Input()
	set tickets(val: IFullTicket[]) {
        logger.i({ tickets: val });
        if (val) {
            this._tickets = val;

			logger.info("type", this.type);
            if (this.type !== 'search') {
				this.setTimers();
			}
        }
    }
    get tickets() {
        return this._tickets;
	}

	// @Input()
	// set data(val: { tickets: IFullTicket[], type: any }) {
	// 	this.type = val.type;
	// 	this.tickets = val.tickets;
	// }

    @Input() noContentMsg: string;

	@Input()
	type: "staged" | "pull" | "all" | "parked" | 'search' | 'busy';

    ionScrollEnabled: boolean = false;

    @ViewChildren("spanItem", { read: ElementRef }) spanItems : QueryList<ElementRef>;
    @ViewChildren("ionItem", { read: ViewContainerRef }) ionItems : QueryList<ViewContainerRef>;

    myLimit: number = 10;

    openSpanOption: IOpenSpanOption = {};
    minHeights: NumericMap<number> = {};
	addElementMiddleWare: Observer<any>;

    isDestroyed = false;

    // tslint:disable-next-line: member-ordering
    constructor(private vvsApp: VVSApp, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
		this.myLimit = this.vvsApp.platform.is("ipad") ? 16 : 10;
	}

    ngOnInit() {
        this.isDestroyed = false;

        this.vvsApp.lss.getLoginUser().then();

        this.vvsApp
		.ticketOptionSubject
		.pipe(takeWhile(_ => !this.isDestroyed))
		.subscribe(
			(ticket) => {
				if (ticket && ticket.currentTicketID && this.openSpanOption[ticket.currentTicketID]) {
					logger.i("updateOptions", ticket.currentTicketID, {
						name: "ticketOptionSubject",
						openSpanOptionAt: this.openSpanOption[ticket.currentTicketID],
						openSpanOption: this.openSpanOption,
						ticketID: ticket.currentTicketID,
						ticket
					});

					this.openSpanOption[ticket.currentTicketID].ticket = cloneDeep(ticket);

					this.updateOptions(this.openSpanOption[ticket.currentTicketID]);
				}
			},
			logger.e
		);

		new Observable( (obs) => { this.addElementMiddleWare = obs; })
		.pipe(
			debounceTime(100),
			takeWhile( _ => !this.isDestroyed )
		)
        .subscribe(
            ( { ev, i, ticket }: { ev: Event, i: number, ticket: IFullTicket }) => {
                if (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
				}

				Taptic.light();

				this.addElement(ev, i, ticket);

				// if (this.defaultAction) {
				// 	this.onOptionClicked({ action: this.defaultAction, ticket });
				// } else {
				// 	this.addElement(ev, i, ticket);
				// }
            },
            logger.e
        );
    }

    ngOnDestroy() {
        this.isDestroyed = true;
	}

    setTimers = () => {
		logger.info("setTimers", this.type);
        forEach(this._tickets, (item, i) => {

			if (!item) {
				RollbarService.error(`There is undefined ticket with index: ${i} and type: ${this.type}`);
			}

			// this._tickets[i].profilePhoto = this.vvsApp.getProfilePhoto(item.currentTicketID, item.TicketSequence.images as IImage[])
			let date;

			
			if (this.type == "staged") {
				logger.assert(!item.TicketSequence, `TicketSequece at line 164 ticket-item-view is undefined with ticketID: ${item.currentTicketID}, ticketNumber: ${item.ticketNumber} and type: ${this.type}`);
				date = get(item, "TicketSequence.checkInTimeStamp") || new Date();
			}

			if (this.type == "pull") {
				const { pullRequestTime, pullTimeStamp } = item.TicketSequence;
				date = pullRequestTime || pullTimeStamp;
			}

			if (date) {
				this._tickets[i].timer = this.getObservable(new Date(date).getTime().toString());
			}

		});

		this.cdr.detectChanges();
    }

    trackById(index: number, item: IFullTicket) {
        return item && item != null ? item.currentTicketID : null;
    }

    addElement(ev: MouseEvent|any, index: number, ticket: IFullTicket) {
        logger.i({ name: "addElement", ev,index,ticket });
        let val = true;
        if (Object.keys(this.openSpanOption).length > 0) {
            forEach(this.openSpanOption, (op: {ionItem: ComponentRef<TicketItemOptions>, spanItem: any, minHeight: number }) => {

                this.renderer.setStyle(op.spanItem, c.height, op.minHeight + c.px);
                // this.renderer.setStyle(op.spanItem, c.bcolor, "white");

                op.ionItem.destroy();

            });

            if (ticket.currentTicketID in this.openSpanOption) {
                val = false;
            }
            this.openSpanOption = {};

        }

		if (val === true) {

            const spanItem = this.spanItems.toArray()[index].nativeElement;

			const originalHeight = (ev.target.closest(".span-ion-item") || {} as any).offsetHeight;
			
			if (!originalHeight) {
				return;
			}

            this.minHeights[ticket.currentTicketID] = (this.minHeights[ticket.currentTicketID] &&
                                                       this.minHeights[ticket.currentTicketID] < originalHeight)
                                                     ? this.minHeights[ticket.currentTicketID]
                                                     : originalHeight;

            this.renderer.setStyle(spanItem, c.height, ( originalHeight + 80 ) + c.px);
            // NOTE: test the menu option with this background-color, it shows the menu to be slow
            // this.renderer.setStyle(spanItem, c.bcolor, c.iob);
            // this.renderer.setStyle(spanItem, "background-color", "#9e9e9e");

            // logger.debug("this.currentUser",this.currentUser);

            const ionItem: ComponentRef<TicketItemOptions> = this.ionItems.toArray()[index].createComponent(this.vvsApp.ticketItemOptions);

            this.updateOptions({ ticket, ionItem });

            ionItem.instance.callback = (itemClicked: IActions) => {
                this.onOptionClicked({ action: itemClicked, ticket });
            };

            this.openSpanOption[ticket.currentTicketID] = {
				ionItem,
				spanItem,
				minHeight: this.minHeights[ticket.currentTicketID],
				ticket
			};
        }

	}

	@Debounce(250)
	doInfinite(infiniteScroll: InfiniteScroll): void {
		logger.info("doInfinite 201", infiniteScroll, this.myLimit);
		if (this.myLimit <= this.tickets.length) {
			this.myLimit += 10;
			// this..markForCheck();
		}
		logger.info("doInfinite 206", infiniteScroll, this.myLimit);
		if (infiniteScroll) {
			logger.info("doInfinite 208", infiniteScroll, this.myLimit);
			try {
				logger.info("doInfinite 210", infiniteScroll, this.myLimit);
				infiniteScroll.complete();
				this.cdr.detectChanges();
			} catch (err) {
				logger.info("doInfinite 213", infiniteScroll, this.myLimit);
				logger.error(err);
			}
		}

	}

    onOptionClicked(val: {action: IActions, ticket: any}) {
		Taptic.light();
		this.vvsApp.performOperation(val);
    }

    async updateOptions({ ticket, ionItem } = {} as {ticket: IFullTicket, ionItem: ComponentRef<TicketItemOptions>}) {
        logger.i("updateOptions", { name: "updateOptions", ticket, ionItem });

        if (ionItem) {

            if (ionItem.instance) {
				try {
					ionItem.instance.refresh(await getAllowedOperations(ticket, this.vvsApp));
				} catch(e) {
					RollbarService.error(e);
				}
            }

            logger.assert( !isBoolean( (ionItem.changeDetectorRef as ViewRef).destroyed), "ionItem.changeDetectorRef must be a boolean");

            if (ionItem.changeDetectorRef && (ionItem.changeDetectorRef as ViewRef).destroyed === false ) {
                ionItem.changeDetectorRef.detectChanges();
            }
        }
        // ionItem.instance.detectChanges();
        logger.i({ ticket });

    }

    // https://forum.ionicframework.com/t/timeago-pipe/111108
    getObservable(timestamp: string): Observable<string> {
        let nextBackoff = 0;
		return from([true])
		.pipe(
			repeatWhen(emitTrue => emitTrue.pipe( delay(nextBackoff)) ),
			takeWhile(_ => !this.isDestroyed),
			map((x, i) => {
				nextBackoff = this.getSecondsUntilUpdate(timestamp).seconds;
				return getFormattedHTML(timestamp);
			}),
		);
	}

	private getSecondsUntilUpdate(timestamp: string) {
        const howOld = getTimeDiffInMinute(timestamp);

        return {
                 seconds: howOld < 2 ? 2000
                        : howOld < 10 ? 4000
                        : howOld < 180 ? 8000
                        : 64000,
                 minutes: howOld
                };

	}

}
