import { Component } from "@angular/core";
import {
	NavController,
	NavParams,
	ViewController,
	IonicPage
} from "ionic-angular";
import { isString, map, get, filter } from "lodash";
// import * as Comp from "../../constants/component-names";
import * as cf from "../../constants/constant-fields";
import * as t from "../../constants/constant-titles";
// import * as c from "../../constants/css-values";
import {
	IPark as _IPark,
	IParkArea,
	StringMap,
	ICoordinates,
	IParkLocation,
	IEditParkLocation
} from "../../lib/vvs-bridge";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { checkValue } from "../../util/index";
import { ICardNotesPhotosView } from "../../components/card-notes-photos-map-view/card-notes-photos-map-view.options";

const status: StringMap<string> = {
	valid: "vvs-park-valid",
	invalid: "vvs-park-invalid",
	invalidShake: "shake-horizontal"
};

import { IParkNew, IEditNew } from "../../lib/vvs-bridge/api-return";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { OperationBase } from "../operation.base";
import { ENV } from "../../environments";
import { getPushPay } from "../../util/get-push-pay";
const logger = Logger.get("ParkModal");

// NOTE: css shake ionic 2 http://www.discoversdk.com/blog/animations-in-ionic-2-demonstrating-different-ways-to-animate-elements
@IonicPage({
	name: "park"
})
@Component({
	selector: "park-modal",
	templateUrl: "./park.html"
})
export class ParkModal extends OperationBase {

	chosenParkArea = {} as IParkArea;
	// userID: number;
	parkLocationName: string = "";

	parkLocationID: number;

	parkAreas: IParkArea[];
	title = "Park Car";
	config: ICardNotesPhotosView;
	mode: "park" | "edit" = "park";

	validations = {} as {
		parkArea: string;
		// parkAreaShake: string;
		parkLocationName: string;
		// parkLocationNameShake: string;
	};

	constructor(
		public vvsApp: VVSApp,
		protected viewCtrl: ViewController,
		private navCtrl: NavController,
		protected navParams: NavParams
	) {
		super(vvsApp, viewCtrl, "park");

		logger.l("navParams", navParams);
		this.ticket = this.navParams.get(cf.ticket);
		this.mode = this.navParams.get(cf.mode) || this.mode;
		this.title = this.navParams.get(cf.title) || this.title;
		this.config =
			this.navParams.get(cf.cardViewConfig) ||
			this.vvsApp.getCardConfig(this.ticket);
		this.config.disableMap = true;

		this.vvsApp.lss
			.getParkAreaData()
			.then(parkAreaMap => {
				if (parkAreaMap) {
					// this.parkAreas = values(parkAreaMap);
					this.parkAreas = filter(parkAreaMap, x => x.isActive == 1);

					logger.info("mode", this.mode);

					if (this.mode == "edit") {
						const parkLocation: IParkLocation = get(this.ticket, "TicketSequence.ParkLocation");
						logger.info("parkLocation", parkLocation);
						logger.info("parkLocation", parkLocation);

						logger.info("");
						if (parkLocation) {
							this.parkLocationName = parkLocation.parkLocationName;
							this.parkLocationID = parkLocation.parkLocationID;

							if (!this.parkLocationID) {
								// tslint:disable-next-line: no-debugger
								debugger;
							}

							this.chosenParkArea = parkAreaMap[parkLocation.parkAreaID];
							
							this.validateParkArea();

						}
					}
					// // logger.info("")
					// this.parkLocationName = this.ticket.TicketSequence.ParkLocation.parkLocationName;
					// this.chosenParkArea = this.ticket.TicketSequence.
					// if () {

					// }
				}
			})
			.catch(logger.e);

			// this.validateParkArea();
	}

	ionViewDidLoad() {
		this.vvsApp.getCurrentLocation();
	}

	async submit() {
		this.vvsApp.presentLoading(t.SUBMITTING, ENV.timeout);

		let coords = {} as ICoordinates;
		try {
			coords = await this.vvsApp.getCurrentLocation();
		} catch(e) {
			logger.error(e);
			coords = {};
		}

		const dAta: _IPark = {
			parkLocationID: this.parkLocationID,
			currentTicketID: this.ticket.currentTicketID,
			userID: this.vvsApp.userID,
			parkAreaID: this.chosenParkArea.parkAreaID,
			parkLocationName: this.parkLocationName,
			latitude: coords.latitude,
			longitude: coords.longitude
		};

		if (this.mode == "edit") { // NOTE: need help from Nahom
			// this.vvsApp.presentSingleAlert("ParkLocation Edit Not Implemented.");
			// return;
			const editPL: IEditParkLocation = {
				ParkLocation: dAta,
				currentTicketID: this.ticket.currentTicketID,
				ticketNumber: this.ticket.ticketNumber
			};

			this.vvsApp.httpService.editParkLocation(editPL)
			.subscribe(
				(val: IEditNew) => {
					this.submitSuccess(val, "Edit_Park_Location");
				},
				(error) => {
					this.vvsApp.somethingWentWrong();
				}
			);

		} else {

			dAta.pushPay = getPushPay(this.vvsApp, this.ticket);

			this.vvsApp.httpService.park(dAta)
			.subscribe(
				(val: IParkNew) => {
					this.submitSuccess(val, "Park");
				},
				(error) => {
					if (get(error, "error.error.sqlMessage") == "Car has already being parked") {
                        this.itCanLeave = true;
                        this.vvsApp.dismissModal(this.viewCtrl, true, this.ticket);
                    } else {
						this.vvsApp.somethingWentWrong();
					}
				});
		}

	}

	verifyParkLocationName(pLocation: string): boolean {
		return (
			isString(pLocation) && pLocation.trim().length > 0
		);
	}

	verifyParkArea(): boolean {
		return (
			checkValue(this.chosenParkArea) &&
			checkValue(
				this.chosenParkArea.parkAreaID,
				this.chosenParkArea.parkAreaName
			)
		);
	}

	validateParkArea() {
		if (this.verifyParkArea() === true) {
			this.validations.parkArea = status.valid;
			return true;
		} else {
			this.validations.parkArea = status.invalid;
			// this.validations.parkAreaShake = "label label-ios animated shake";
			// setTimeout(() => {
			// 	this.validations.parkAreaShake = "label label-ios";
			// }, 1000);
			return false;
		}
	}

	validateParkLocation(pLocation: string) {
		// debugger;
		if (this.verifyParkLocationName(pLocation) === true) {
			this.validations.parkLocationName = status.valid;
			return true;
		} else {
			this.validations.parkLocationName = status.invalid;
			// this.validations.parkLocationNameShake =
			// 	"label label-ios animated shake";
			// setTimeout(() => {
			// 	this.validations.parkLocationNameShake = "label label-ios";
			// }, 1000);
			return false;
		}
	}

	chooseParkArea(ev: any) {
		// let $parkAreas;

		if (this.parkAreas) {
			const parkAreas = map(this.parkAreas, x => ({
				value: x.parkAreaID,
				text: x.parkAreaName
			}));

			this.vvsApp.presentListPicker(
				parkAreas,
				(
					item: { columnValue: { value: any; text: string } } = {} as any
				) => {
					logger.info("ParkArea", item);

					this.parkLocationName = "";
					this.parkLocationID = this.mode == "edit" ? this.parkLocationID : null;

					if (item) {
						//TODO do something with the coming Data
						this.chosenParkArea.parkAreaName = item.columnValue.text;
						this.chosenParkArea.parkAreaID = item.columnValue.value;
						// this.parkLocationName = "";
						this.validateParkArea();
					} else {
						this.chosenParkArea = {} as IParkArea;
						// this.parkLocationName = "";
					}
				}
			);
		} else {
			//TODO idk, this might not be neccesary, but in any case, we should get them.
		}
	}

	selfDismiss() {
		// super.dismiss(true);
		if (this.mode == "edit") {
			this._dismiss(true);
			return;
		} else {
			super.dismiss(true);
		}
	}
}
