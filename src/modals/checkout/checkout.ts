import { Component, ChangeDetectorRef } from "@angular/core";
import { ICheckOutNew } from "../../lib/vvs-bridge/api-return";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import {
	// NavController,
	NavParams,
	ViewController,
	IonicPage
} from "ionic-angular";
import { ICheckOut } from "../../lib/vvs-bridge/http-operations";
import * as cf from "../../constants/constant-fields";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { OperationBase } from "../operation.base";
import { map, filter, find, get, isEmpty } from "lodash";
import { IPaymentType } from "../../lib/vvs-bridge";
import { CameraService } from "../../providers/camera-service/camera-service";

// import { v4 as uuidv4 } from "uuid";

import * as moment from "moment";
import { FormControl, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { IPresentConfirm } from "../../providers/vvs-controller/view/alert";
import * as t from '../../constants/constant-titles';
import { getTimeStamp } from "../../util";
import { getPushPay } from "../../util/get-push-pay";
import { ICardNotesPhotosView } from "../../components/card-notes-photos-map-view/card-notes-photos-map-view.options";

// import { IFullTicket } from "../../util";
// import { merge } from "lodash";
// import { pages } from "../../pages";
const logger = Logger.get("CheckOutComponent");

@IonicPage({
	name: "checkout"
})
@Component({
	selector: "checkout-modal",
	templateUrl: "./checkout.html"
})
export class CheckOutModal extends OperationBase {

	config: ICardNotesPhotosView;

	_isDeparting: "yes" | "no" = "no";

	paymentType = {} as IPaymentType;

	// compCode: string;
	compCodeNote: string;

	validationImage: string;

	// compCodeControl = new FormControl(
	// 	'',
	// 	[ Validators.required, Validators.min(4), Validators.maxLength(45), this.compCodeValidator() ],
	// );

	roomNumberControl = new FormControl(
		'',
		[
			Validators.pattern("^[0-9]*$"),
			(control: AbstractControl) => {
				// if (isEmpty(control.value)) {
				// 	return null;
				// }

				// if (this.isDeparting == "no") {
				// 	return null;
				// }

				const isHotel = get(this.ticket, "TicketType.isHotel");

				if (isHotel == '1') {

					if (control.value.length == 0) {
						return {
							roomNumberValid: "Room number is required before departing."
						};
					}
					// if ( !(this._roomNumber.value.length === 3 || this._roomNumber.value.length === 4) ) {
					if (!(control.value.length === 3 || control.value.length === 4)) {
						return { roomNumberValid: "Room number is not valid. It must be 3 or 4 digits." };
					}
				}
				return null;
			}
		]
	);

	showErrors = false;

	constructor(
		public vvsApp: VVSApp,
		protected navParams: NavParams,
		// private navCtrl: NavController,
		protected viewCtrl: ViewController,
		private cdr: ChangeDetectorRef
	) {
		super(vvsApp, viewCtrl, "checkout", navParams);

		this.ticket = this.navParams.get(cf.ticket);

		logger.i("this.ticket", this.ticket);

		this.roomNumberControl.setValue(this.ticket.roomNumber || "");

		this.config = this.vvsApp.getCardConfig(this.ticket);
	}

	get valid() {
		const cond1 = this.roomNumberControl.valid;
		if (cond1) {
			return true;
		}

		const cond2 = this.isDeparting == "no" && isEmpty(this.roomNumberControl.value);

		if (cond2) {
			return cond2;
		}

		return false;
		// // return this.roomNumberControl.valid;
		// return ( this.isDeparting == "no" && isEmpty(this.roomNumberControl.value) ) ||
		// 	   this.roomNumberControl.valid;
		// 	//    ( this.isDeparting == "yes" && this.roomNumberControl.valid );
	}

	get isDeparting() {
		return this._isDeparting;
	}

	setDeparting(state): void {
		this._isDeparting = state;
		this.roomNumberControl.setValue(this.roomNumberControl.value + "");
		this.roomNumberControl.markAsTouched();
		this.cdr.detectChanges();
	}

	getButtonColor(state: string): string {
		return this._isDeparting === state ? '#578CA9' : '#FFFFFF';
	}

	getTextColor(state: string): string {
		return this._isDeparting === state ? '#FFFFFF' : '#578CA9';
	}

	compCodeValidator(): ValidatorFn {
		return (control: AbstractControl): any => {
			return this.vvsApp.property.compCode == control.value
				? null
				: { wrongCompCode: "Wrong Comp Code" };
		};
		// return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
		// 	return
		// 	// return lss.getCurrentTicketByTicketNumber(control.value).then(
		// 	// 	ticket => {
		// 	// 		logger.info("validateTicketNumber", ticket);
		// 	// 		return ticket ? { ticketExists: "Ticket already exists" } : null;
		// 	// 	}
		// 	// );
		// };
	}

	ngOnInit() {
		super.ngOnInit();
		// this.vvsApp.lss.getPaymentTypeData()
		// .then( (paymentTypes) => {
		// 	this.paymentType = find(paymentTypes, x => x.paymentTypeShortName == "VALIDATION");
		// });
	}

	// public takeValidationPhoto(ev: any) {
	// 	logger.info("takeValidationPhoto");
	// 	CameraService.takePicture()
	// 	.then( (uri: string) => {
	// 		this.validationImage = uri;
	// 	})
	// 	.catch(logger.error);
	// }

	// choosePaymentMethod(ev: any) {
	// 	// debugger;
	// 	this.vvsApp.lss.getPaymentTypeData()
	// 	.then( (paymentTypes) => {
	// 		if (paymentTypes) {

	// 			const $paymentTypes = map(
	// 				filter(paymentTypes, x => x.overnight == 0),
	// 				x => ({
	// 					value: x.paymentTypeID,
	// 					text: x.paymentTypeName
	// 				})
	// 			);

	// 			this.vvsApp.presentListPicker(
	// 				$paymentTypes,
	// 				(item: { columnValue: { value: any; text: string } } = {} as any) => {
	// 					logger.info("PaymentType", item);

	// 					// tslint:disable-next-line: prefer-conditional-expression
	// 					if (item && item.columnValue) {
	// 						this.paymentType = find(paymentTypes, x => x.paymentTypeID == item.columnValue.value);

	// 						if (this.paymentType.paymentTypeShortName == "CARD") {
	// 							// this.vvsApp.actions.pay();
	// 						}
	// 						// this.paymentType.paymentTypeID = item.columnValue.value;
	// 						// this.paymentType.paymentTypeName = item.columnValue.text;
	// 					} else {
	// 						this.paymentType = this.paymentType || {} as any;
	// 					}

	// 					// if (item) {
	// 					// 	//TODO do something with the coming Data
	// 					// 	this.chosenParkArea.parkAreaName = item.parkArea.text;
	// 					// 	this.chosenParkArea.parkAreaID = item.parkArea.value;
	// 					// 	this.parkLocationName = "";
	// 					// 	this.validateParkArea();
	// 					// } else {
	// 					// 	this.chosenParkArea = {} as IParkArea;
	// 					// 	this.parkLocationName = "";
	// 					// }
	// 				}
	// 			);
	// 		} else {
	// 			//TODO idk, this might not be neccesary, but in any case, we should get them.
	// 		}
	// 	})
	// 	.catch(logger.error);


	// }

	presubmit(ev: any) {
		// logger.info("submitt", this.paymentType, this.compCodeControl);
		// if (this.paymentType.paymentTypeShortName == "COMP" && !this.compCodeControl.valid) {
		// 	this.showErrors = true;
		// 	return;
		// }

		if (this.roomNumberControl.invalid) {
			this.vvsApp.presentSingleAlert("The room number is invalid");
			return;
		}

		const options: IPresentConfirm = {
			title: t.ARE_YOU_SURE_WANT_TO_SUBMIT,
			message: "",
			submitText: t.AGREE,
			submitCB: (data) => {
				// this.submit.emit(modalFooterOptions.submit);
				this.submit(ev);
			}
		};

		this.vvsApp.presentConfirm(options);
	}

	submit(ev: any) {

		const isHotel = this.ticket.TicketType.isHotel;

		this.ticket.isDeparting = isHotel == 0 ? 1 : this.isDeparting == "yes" ? 1 : 0;

		const dAta: ICheckOut = {
			currentTicketID: this.ticket.currentTicketID,
			userID: this.vvsApp.user.userID,
			roomNumber: this.roomNumberControl.value,

			paymentTypeShortName: this.paymentType.paymentTypeShortName,
			paymentTypeID: this.paymentType.paymentTypeID,

			// compCode: this.compCodeControl.value,
			notes: [{
				data: "",
				userID: this.vvsApp.userID,
				date: getTimeStamp() + ""
			}],

			isDeparting: this.ticket.isDeparting,

			isHotel,

			// images: this.validationImage ? [{
			// 			uri: this.validationImage,
			// 			uid: uuidv4(),
			// 			added: true,
			// 			index: 0,
			// 			date: getTimeStamp()
			// 			// title: "Extra"
			// 		}] : undefined
		};

		if (!dAta.roomNumber) {
			delete dAta.roomNumber;
		}

		dAta.pushPay = getPushPay(this.vvsApp, this.ticket);

		this.vvsApp.httpService.checkOut(dAta).subscribe(
			(data: ICheckOutNew) => {
				this.submitSuccess(data, "CheckOut");
			},
			error => {
				this.vvsApp.presentSingleAlert(
					"Something went wrong",
					JSON.stringify(error)
				);
			}
		);
	}

}
