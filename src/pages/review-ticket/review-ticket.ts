import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { cloneDeep, isEmpty, merge, omit, omitBy, map, get } from 'lodash';
import { ICarPhoto, ICarStepModel, ICustomerStepModel, INote, IUser } from '../../lib/vvs-bridge';
import { ICheckInNew } from "../../lib/vvs-bridge/api-return";
import { checkValue } from '../../util';
import { isEmptyNonNumeric } from "../../util/is-empty-non-numeric";
import { unmaskPhoneNumber } from "../../util/unmask-phone-number";
import { TicketCombined } from "../../pages/checkin-form/checkin-form";
import * as cf from '../../constants/constant-fields';
import * as t from '../../constants/constant-titles';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { pages } from "../index";
import { IFormMap } from "../checkin-form/checkin-form.provider";
import { getTimeStamp } from "../../util/get-timestamp";

const logger = Logger.get("ReviewTicketComponent");

interface ISubmitData {
	customerStep: ICustomerStepModel;
	carStep: ICarStepModel;
	carPhotos: ICarPhoto[];
	notes: INote[];
	loginUser: IUser;
	uuid: string;
}

export interface IPushPay {
	manual: number;
	ticketType: string;
	vehicle: string;
}

@IonicPage({
	name: "review-ticket"
})
@Component({
	selector: "review-ticket",
	templateUrl: "review-ticket.html"
})
export class ReviewTicketComponent {

	data: any;
	msg: string = "";
	// title: string = "";
	toSubmit: { ticket: TicketCombined, photos: any[], pushPay: IPushPay, busyMode: boolean };
	carPhotos: ICarPhoto[];

	ticket: IFormMap;
	busyMode: boolean;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private vvsApp: VVSApp
	) {

		this.ticket = undefined;

		this.vvsApp
			.lss.getLoginUser()
			.then((loginUser: IUser) => {
				this.ticket = this.navParams.get("ticket");
				this.busyMode = this.navParams.get("busyMode");

				// tslint:disable:no-multi-spaces
				const {
					CustomerStep: customerStep,
					CarStep: carStep,
					Notes: notes,
					CarPhotos: carPhotos,
					uuid
				} = this.ticket;

				customerStep.licenseID.customerFirstName = customerStep.licenseID.customerFirstName || "";
				customerStep.licenseID.customerFirstName = customerStep.licenseID.customerFirstName.split(" ")[0];

				this.data =
					[
						[t.TICKET_NUMBER, customerStep.ticketNumber],
						[t.FIRST_NAME, customerStep.licenseID ? customerStep.licenseID.customerFirstName : ""],
						[t.MIDDLE_NAME, customerStep.licenseID.customerMiddleName],
						[t.LAST_NAME, customerStep.licenseID.customerLastName],
						[t.REGISTRATION_NUMBER, customerStep.licenseID.confirmation_number],
						[t.TICKET_TYPE, customerStep.ticketTypeName],
						[t.ROOM_NUMBER, customerStep.roomNumber],
						[t.EVENT, customerStep.eventName],
						// [ t.EVENT       	   , (
						// 							checkValue(customerStep.companyEventName) &&
						// 							customerStep.companyEventName.length > 2) ?
						// 							customerStep.companyEventName : customerStep.eventPartyName ],
						[t.PHONE_NUMBER, customerStep.customerPhone],

					];

				// tslint:enable:no-multi-spaces


				if (!this.busyMode) {
					this.data.push(...[
						[t.CAR_MAKE, carStep.makeName],
						[t.CAR_MODEL, carStep.modelName],
						[t.CAR_YEAR, carStep.carYear],
						[t.LICENSE_PLATE, carStep.licensePlate],
						[t.TRANSMISSION_STYLE, (carStep.manual == 0) ? t.AUTO : t.MANUAL],
						[t.CAR_COLOR, carStep.colorName],
					]);
				}

				this.data.push(
					[t.NOTES + ":", notes && notes[0] ? notes[0].data : "", "notes-item"]
				);

				// );

				// this.title = t.REVIEW_EDIT;

				this.prepareSubmitData({ uuid, customerStep, carStep, carPhotos, notes, loginUser });
			});

	}

	prepareSubmitData({ uuid, customerStep, carStep, carPhotos, notes, loginUser }: ISubmitData) {

		const licenseID = customerStep.licenseID;
		customerStep = (omit as any)(customerStep,
			[cf.licenseID,
			cf.isHotel,
			// cf.companyEventID,
			cf.maskCustomerPhone,
				// cf.companyEventName
			]) as ICustomerStepModel;

		if (isEmpty(notes)) {
			notes = undefined;
		} else {
			notes = omitBy(notes, (note: INote) => isEmpty(note.data)) as INote[];

			notes = map(notes, (note: INote, key) => {
				note.userID = loginUser.userID;
				note.date = getTimeStamp() + "";

				return note;
			});

		}

		let $tC: TicketCombined = merge(
			{},
			customerStep,
			carStep,
			// { images: photosToDB },
			{ notes },
			{ userID: loginUser.userID },
			{ username: loginUser.username },
			licenseID,
			{ uuid }
		);

		if (!this.busyMode) {
			$tC.makeName = checkValue($tC.makeID) ? undefined : $tC.makeName;
			$tC.modelName = checkValue($tC.modelID) ? undefined : $tC.modelName;
			$tC.colorName = checkValue($tC.colorID) ? undefined : $tC.colorName;
		}

		$tC.ticketTypeName = checkValue($tC.ticketTypeID) ? undefined : $tC.ticketTypeName;
		$tC.eventName = checkValue($tC.eventID) ? undefined : $tC.eventName;

		// $tC.companyArrivalName = checkValue($tC.companyArrivalID) ? undefined : $tC.companyArrivalName;
		// $tC.eventPartyName     = checkValue($tC.companyArrivalID) ? undefined : $tC.eventPartyName    ;
		$tC.lastMakeFilterKeyword = undefined;
		$tC.lastModelFilterKeyword = undefined;

		$tC = (omitBy as any)($tC, isEmptyNonNumeric) as any;

		$tC.customerPhone = unmaskPhoneNumber($tC.customerPhone);

		this.toSubmit = omitBy({ ticket: $tC, photos: carPhotos }, isEmptyNonNumeric) as any;
		this.carPhotos = carPhotos;

		// debugger;

		this.toSubmit.pushPay = {
			manual: this.busyMode ? null : carStep.manual,
			ticketType: customerStep.ticketTypeName,
			vehicle: this.busyMode ? "" : this.vvsApp.lss.getVehicle(carStep.makeID, carStep.modelID)
		};

		this.toSubmit.busyMode = this.busyMode;

		// this.toSubmit.pushPay = getPushPay(this.vvsApp, this.ticket);


		logger.info(JSON.stringify(this.toSubmit, null, 4));

		// debugger;
	}

	dismiss() {
		this.vvsApp.comingFromReviewTicket = true;
		this.navCtrl.pop().catch(logger.error);
	}

	async submit() {
		if (this.toSubmit.ticket && this.toSubmit.ticket.confirmation_number) {
			const params = {
				charge_code_id: '126494',
				amount: this.toSubmit.ticket.ticketPrice,
				reservationID: this.toSubmit.ticket.confirmation_number
			}
			this.vvsApp.httpService.billingTransaction(params).subscribe((data: any) => {
				this.checkingProcess();
			}, error => {
				this.vvsApp.presentSingleAlert("Reservation number is invalid");
				console.log("error sending transaction");
			});
		} else {
			this.checkingProcess();
		}
	}

	checkingProcess() {
		this.vvsApp
			.httpService
			.checkIn(this.toSubmit)
			.subscribe(
				(data: ICheckInNew) => {

					logger.l(data);

					if (data.CurrentTicket && data.CurrentTicket.ticketNumber === this.toSubmit.ticket.ticketNumber) {
						this.checkInSuccess(data, this.carPhotos);
					} else {
						this.vvsApp.presentSingleAlert(t.SOMETHING_WENT_WRONG);
						logger.error(new Error("checking error"));
					}
				},
				(error) => {
					logger.error(error);

					if (error && error.code == "TICKET_EXISTS_BUT_ITS_YOURS") {
						this.checkInSuccess(error.data, this.carPhotos);
					} else {
						this.vvsApp.presentSingleAlert(get(error, "error.error.message"));
					}
					// debugger;
				}
			);
	}

	checkInSuccess(_data: ICheckInNew, carPhotos: any) {
		this.resetForm();

		const data = cloneDeep(_data);

		// debugger;

		this.vvsApp
			// .slss.mstCheckIn($data)
			.ably.update("CheckIn", data as any) //  as IAblyUpdate)
			.then(() => this.resetForm())
			.then(() => this.vvsApp.lss.getCurrentTicketByID(data.CurrentTicket.currentTicketID, ReviewTicketComponent.name))
			// .catch( (error) => {
			// 	logger.info(error);
			// 	return data.CurrentTicket;
			// })
			.then((ticket) => this.navCtrl.push(pages.ticketdetails, { ticket }))
			.catch(logger.e);
	}

	resetForm() {
		if (this.ticket && this.ticket.instance) {
			if (this.ticket.instance.resetForm) {
				this.ticket.instance.resetForm(ReviewTicketComponent.name);
			}
		}
	}

}
