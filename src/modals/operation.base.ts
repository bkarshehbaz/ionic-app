import { VVSApp } from "../providers/vvs-controller/vvs-controller";
import { IFullTicket } from "../util";
import { Logger } from "../providers/vvs-controller/util/logger";
import * as cat from "../constants/event-categories";
import { forEach, merge, cloneDeep } from "lodash";
import { ViewController, NavParams } from "ionic-angular";
import { IAblyUpdate } from "../providers/ably-service";
import { SomethingWentWrong } from "../constants/code-messages";
// import { ICheckOutNew, ICheckOut } from "../lib/vvs-bridge/api-return";
import { takeWhile } from "rxjs/operators";
import { OnDestroy, Optional } from "@angular/core";
import { ICardNotesPhotosView } from "../components/card-notes-photos-map-view/card-notes-photos-map-view.options";
import * as cf from "../constants/constant-fields";

const logger = Logger.get("OperationBase");

// @Component({
// 	selector: "operation-base",
// 	template: ""
// })
export class OperationBase implements OnDestroy {
	ticket: IFullTicket;
	config: ICardNotesPhotosView;
	itCanLeave: boolean = false;
	isDestroyed = false;


	touched: boolean = false;

	constructor(
		public vvsApp: VVSApp,
		protected viewCtrl: ViewController,
		private id: "park" | "checkout" | "pull" | "rcheckin" | "pull-request",
		protected navParams?: NavParams,
	) {
	}


	ngOnDestroy() {
		this.isDestroyed = true;
	}

	ngOnInit() {
		this.vvsApp.reactive.tickets
			.pipe(takeWhile(_ => !this.isDestroyed))
			.subscribe(event => {
				logger.info(
					"services.tickets",
					event,
					JSON.stringify(event, null, 3)
				);

				if (event.category === cat.SINGLE_TICKETS) {
					forEach(event.data, (ticket: IFullTicket) => {
						if (
							this.ticket &&
							ticket &&
							this.ticket.currentTicketID ==
								ticket.currentTicketID
						) {
							this.ticket = merge({}, this.ticket, ticket);
							this.config = merge(
								{},
								this.config,
								this.vvsApp.getCardConfig(this.ticket)
							);

							if ((this.id == "park")) {
								this.config.disableMap = true;
							}
							return false; // break loop
						}
					});
				}
			});
	}

	dismiss(val: boolean, $ticket = this.ticket) {
		this.vvsApp.presentLoading("", 3000);
		switch (this.id) {
			case "rcheckin":
				this._dismiss(val, $ticket);
				// this.vvsApp.httpService.pullCancel($ticket, (d) => this._dismiss(val, $ticket) );
				break;
			case "checkout":
				this.vvsApp.httpService.checkOutCancel($ticket, d =>
					this._dismiss(val, $ticket)
				);
				// if ($ticket.statusName !== "CHECKOUT_INIT") {
				// 	this._dismiss(val, $ticket);
				// } else {
				// 	this.vvsApp.httpService.checkOutCancel($ticket, d =>
				// 		this._dismiss(val, $ticket)
				// 	);
				// }
				break;
			case "pull":
				this.vvsApp.httpService.pullCancel($ticket, d =>
					this._dismiss(val, $ticket)
				);
				// if ($ticket.statusName !== "PULL_INIT") {
				// 	this._dismiss(val, $ticket);
				// } else {
				// 	this.vvsApp.httpService.pullCancel($ticket, d =>
				// 		this._dismiss(val, $ticket)
				// 	);
				// }
				break;
			case "pull-request":
				this._dismiss(val, $ticket);
				// this.vvsApp.httpService.pullCancel($ticket, (d) => this._dismiss(val, $ticket) );
				break;
			case "park":
				this.vvsApp.httpService.parkCancel($ticket, d =>
					this._dismiss(val, $ticket)
				);
				// if ($ticket.statusName !== "PARK_INIT") {
				// 	this._dismiss(val, $ticket);
				// } else {
				// 	this.vvsApp.httpService.parkCancel($ticket, d =>
				// 		this._dismiss(val, $ticket)
				// 	);
				// }
				break;
			default:
				logger.error("UNKNOWN", this.id, $ticket);
				break;
		}
	}

	_dismiss(val: boolean, $ticket: any = this.ticket) {
		this.itCanLeave = true;
		this.vvsApp.dismissModal(this.viewCtrl, val, $ticket);
	}

	editTicket(): void {
		this.itCanLeave = true;
		const ticket = cloneDeep(this.ticket);
		this.vvsApp.actions.edit(ticket, "modal");
		// this.vvsApp.performOperation({action: "edit", ticket: this.ticket, from: "modal"});
	}

	ionViewDidEnter() {
		if (this.navParams) {
			this.ticket = this.ticket || this.navParams.get(cf.ticket);
		}

		if (!this.ticket.currentTicketID) {
			return;
		}

		this.vvsApp.lss.getCurrentTicketByID(this.ticket.currentTicketID, OperationBase.name)
		.then( (ticket) => {
			if (ticket.currentTicketID == this.ticket.currentTicketID) {
				this.ticket = ticket; // merge({}, ticket, this.ticket);
				this.config = this.vvsApp.getCardConfig(this.ticket);
			}
		})
	}

	ionViewWillEnter(): void {
		this.itCanLeave = false;
		this.isDestroyed = false;
	}

	ionViewCanLeave(): boolean {
		return this.itCanLeave;
	}

	setItCanLeave(ev: boolean) {
		this.itCanLeave = ev;
	}

	submitSuccess(
		data: any,
		operation:
			| "CheckIn"
			| "CheckOut"
			| "Pull"
			| "Park"
			| "Pull_Request"
			| "RCheckIn"
			| "Edit_Park_Location"
	) {
		logger.i({ data });
		if ( (data.CurrentTicket || data.currentTicketID) && data.RecentActivity ) {
			this.vvsApp.ably
				.update(operation, data as IAblyUpdate)
				.then( () => {
					this._dismiss(true);
					this.vvsApp.dismissLoading('operation-base');
					logger.i(operation + " return promise " + this.id + "-component", "line 127", {
						// $ticket: cloneDeep($tick) // JSON.parse(JSON.stringify($tick))
					});
				})
				.catch((reason: any) => {
					this.vvsApp.dismissLoading('operation-base2');
					logger.e(reason);
				});
		} else {
			// alert("Something went wrong (Replace this alert with a AlertController)");
			this.vvsApp.presentSingleAlert(SomethingWentWrong.message);
		}
	}
}
