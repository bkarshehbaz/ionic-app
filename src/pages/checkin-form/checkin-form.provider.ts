import { Injectable } from '@angular/core';
import * as cat from '../../constants/event-categories';
import * as msf from '../../constants/msf';
import {
	IStepName,
	IStep,
	ICustomerStepModel,
	ICarStepModel,
	ICarPhoto,
	INote,
	IEditing,
	IEditWithChanges,
	IImage,
	ICurrentStep,
	ILicenseID,
	NumericMap
} from '../../lib/vvs-bridge';

// tslint:disable-next-line: no-duplicate-imports
import * as vvsBridge from '../../lib/vvs-bridge';

import { isEmpty, map, cloneDeep, random, delay, set } from 'lodash';
import { IFullTicket } from '../../util/process-full-ticket';
import * as cf from '../../constants/constant-fields';
import { parseJSON } from '../../util/parse-json';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { getCustomerStepModel } from '../../providers/local-storage-service/util/get-customer-step-model';
import { getCarStepModel } from '../../providers/local-storage-service/util/get-car-step-model';
import { pages } from '../index';

import { v4 as uuidv4 } from "uuid";

import { Subject, BehaviorSubject } from 'rxjs';

const logger = Logger.get("CheckInFormProvider");

export type IFormKey =
	"CurrentStep" |
	"CustomerStep" |
	"CarStep" |
	"CarPhotos" |
	"Notes" |
	"EditingTicket" |
	"OriginalTicket";

const CurrentStep: IFormKey = "CurrentStep";
const CustomerStep: IFormKey = "CustomerStep";
const CarStep: IFormKey = "CarStep";
const CarPhotos: IFormKey = "CarPhotos";
const Notes: IFormKey = "Notes";
const EditingTicket: IFormKey = "EditingTicket";
const OriginalTicket: IFormKey = "OriginalTicket";

export interface IFormMap {
	CurrentStep: ICurrentStep;
	CustomerStep: ICustomerStepModel;
	CarStep: ICarStepModel;
	CarPhotos: ICarPhoto[];
	Notes: INote[];
	EditingTicket: IEditing;
	OriginalTicket: IEditWithChanges;
	instance: CheckInFormProvider;
	uuid: string;

	// car-step
	lastMakeFilterKeyword?: string;
	lastModelFilterKeyword?: string;

	// busyMode?: boolean;
}

@Injectable()
export class CheckInFormProvider {

	static instance: CheckInFormProvider;

	canGoNext: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	FormStepObserver: Subject<any> = new Subject<any>();
	ticket = {} as IFormMap;

	private _busyMode?: boolean = false;

	set busyMode(val: boolean) {
		this._busyMode = val;
		this.vvsApp.lss._setString("BUSY_MODE", val + "");
	}
	get busyMode() {
		return this._busyMode;
	}

	lastMakeFilterKeyword;
	lastModelFilterKeyword;

	public currentProperty: number | null = null;


	constructor(private vvsApp: VVSApp) {
		logger.info("instance_id", random(9999, 99999));
		CheckInFormProvider.instance = this;
		this.vvsApp.lss._getString("BUSY_MODE")
			.then((val) => {
				this._busyMode = val == "true" ? true : false;
			});

		this.vvsApp.lss.getLoginUser()
			.then((user: any) => {
				this.currentProperty = user.CurrentProperty.propertyID;
				logger.info("Current Property ID", this.currentProperty);
			})
			.catch(logger.e);

	}




	updateNextStatus(nextStatus: boolean) {
		set(this.ticket, "CurrentStep.formstep.nextStatus", nextStatus);

		this.canGoNext.next(nextStatus);
	}

	isEmpty(): boolean {
		return isEmpty(this.ticket);
	}

	getTicket() {
		const ticket = cloneDeep(this.ticket);
		ticket.instance = this;
		return ticket;
	}

	// setBusyMode(val: boolean) {
	// 	this.ticket.busyMode = val;
	// }

	/*
	 * Form Step Observable
	 */
	resetForm(from?: string): Promise<void | any[]> {
		this.clearLastTicket();
		logger.warn("*************", "resetForm called from", from);
		this.FormStepObserver.next({ category: cat.RESET_FORM });

		return this.clearLastTicket();
	}

	// resetFormToDefault(): void {
	// 	this.clearLastTicket()
	// 	.then(
	// 		() => this.FormStepObserver.next({ category: cat.DEFAULT_ACTION})
	// 	);
	// }

	validateAt(category: IStepName): void {
		const at = category === msf.customer.name ? cat.VALIDATE_CUSTOMER
			: category === msf.car.name ? cat.VALIDATE_CAR
				: category === msf.carnotes.name ? cat.VALIDATE_CAR_NOTES
					: category;

		this.FormStepObserver.next({ category: at });
	}

	triggerOnBlur(where?: string): void {
		where = where || "";
		const at = where === msf.customer.name ? cat.BLUR_ON_CUSTOMER
			: where === msf.car.name ? cat.BLUR_ON_CAR
				: where === msf.carnotes.name ? cat.BLUR_ON_CAR_NOTES
					: cat.BLUR;

		this.FormStepObserver.next({ category: at });
	}

	newCheckIn(ticketNumber: string, license: ILicenseID): void {
		this.resetForm()
			.then(() => {
				delay(() => {
					this.FormStepObserver
						.next({
							category: cat.NEW_CHECKIN,
							data: {
								ticketNumber,
								license
							}
						});
				}, 500);
			});
	}

	clearLastTicket() {
		this.ticket = {
			uuid: uuidv4()
		} as any;

		return Promise.resolve();
	}

	// clearKeys(..._keys: StorageKey[]) {
	// 	return Promise.all(
	// 		map(_keys, key => this._remove(key) )
	// 	)
	// 	.catch(logger.e);
	// }

	setCurrentStep(formstep: IStep): void {
		const timestamp = new Date().getTime();
		const currentStep = { formstep: cloneDeep(formstep), timestamp } as ICurrentStep;
		this._set(CurrentStep, currentStep);
	}
	getCurrentStep = (): Promise<vvsBridge.ICurrentStep> => this._get(CurrentStep);




	setCustomerStep = (customerStep: vvsBridge.ICustomerStepModel) => {
		// logger.info("setCustomerStep", JSON.stringify(customerStep, null, 3));
		return this._set(CustomerStep, customerStep);
	}
	getCustomerStep = (): Promise<vvsBridge.ICustomerStepModel> => this._get(CustomerStep);
	getCustomerStepData() {
		return Promise.all([
			this.vvsApp.lss.getTicketTypeData(),
			this.vvsApp.lss.getCalendarEventData(),
			// this.vvsApp.lss.getCompanyArrivalData(),
			// this.vvsApp.lss.getEventPartyData(),
			this.getCustomerStep(),
		]);
		// .then( ([
		// 	places = {} as NumericMap<vvsBridge.ITicketType>,
		// 	calendarEvents = {} as NumericMap<vvsBridge.ICalendarEvent>,
		// 	// companies={} as vvsBridge.ICompanyArrival,
		// 	// eventParties={} as any,
		// 	ticket = {} as ICustomerStepModel
		// ]) => [places, calendarEvents, /* companies, eventParties,*/ ticket])
		// .catch(logger.e);
	}


	setCarStep = (carStep: vvsBridge.ICarStepModel) => this._set(CarStep, carStep);
	getCarStep = (): Promise<vvsBridge.ICarStepModel> => this._get(CarStep);


	setCarPhotos = (carphotos: vvsBridge.ICarPhoto[]) => this._set(CarPhotos, carphotos);
	getCarPhotos = (): Promise<vvsBridge.ICarPhoto[]> => this._get(CarPhotos) as any;


	setNotes = (notes: vvsBridge.INote[]) => {
		// logger.assert(isArray(notes), "notes must be an array");
		logger.i("notes", { notes });
		return this._set(Notes, notes || []);
	}
	getNotes = (): Promise<vvsBridge.INote[]> => this._get(Notes) as any; // ._get(Notes);

	setCustomerEditTicket(v = {} as IFullTicket): Promise<any> {
		// const cS: vvsBridge.ICustomerStepModel = getCustomerStepModel(v, this.vvsApp);

		// logger.info("getCustomerStepModel", cS);

		return getCustomerStepModel(v, this.vvsApp)
			.then(cS =>
				Promise.all([
					this.setCustomerStep(cS),
					this.setEditWithNoChanges(cS)
				])
			);
	}

	setCarEditTicket(v: IFullTicket): Promise<any> {
		// const cS: vvsBridge.ICarStepModel = getCarStepModel(v, this.vvsApp);

		return getCarStepModel(v, this.vvsApp)
			.then(cS =>
				Promise.all([
					this.setCarStep(cS),
					this.setEditWithNoChanges(cS)
				])
			);
	}







	/******************************************************************
	 * isEditing
	 *******************************************************************/
	setIsEditing(val: vvsBridge.IEditing) {
		return this._set(EditingTicket, val);
	}
	removeIsEditing(): void {
		this._remove(EditingTicket);
	}
	getIsEditing = (): Promise<vvsBridge.IEditing> => this._get(EditingTicket);

	setEditTicket(ticket: IFullTicket, option: string): Promise<any> {

		// (ticket as any).fromEdit = true;
		this.clearLastTicket();
		//TODO try to improve this if possible.
		switch (option) {
			// case 'all':
			case cf.customer:
				return this.setCustomerEditTicket(ticket);
			case cf.car:
				return this.setCarEditTicket(ticket);
			case cf.carnotes:
			case cf.rcheckin:

				const $photos: ICarPhoto[] = map(ticket.TicketSequence.images as IImage[], (image: IImage) => {
					return {
						data: this.vvsApp.getImage(ticket.currentTicketID, image.uid),
						index: image.index,
						added: false,
						uid: image.uid,
						date: image.date
					};
				});

				return Promise.all([
					this.setNotes(parseJSON(ticket.TicketSequence.notes, []) as INote[]),
					this.setCarPhotos($photos),
					this.setEditWithNoChanges(ticket.TicketSequence as any)
				]);
		}
	}

	//this will probably not be used, or maybe as a backup. NV.
	setEditWithNoChanges = (v: IEditWithChanges) => this._set(OriginalTicket, v);

	// getEditWithNoChanges(): Promise<CarStepModel|CustomerStepModel|{notes: string, carPhotos:CarPhoto[]}> {
	getEditWithNoChanges = (): Promise<IEditWithChanges> => this._get(OriginalTicket);



	debugMe() {
		// if (this.vvsApp.isNative()) {
		// 	return;
		// }

		this.vvsApp.presentModal(
			pages.vvsdebugger,
			{
				data: cloneDeep(this.ticket)
			}
		);
	}


	public setLicense(license: ILicenseID) {
		this.ticket.CustomerStep = this.ticket.CustomerStep || {} as ICustomerStepModel;
		this.ticket.CustomerStep.licenseID = cloneDeep(license);
	}

	private _set(key: IFormKey, value) {
		this.ticket[key] = cloneDeep(value);
	}

	private _get(key: IFormKey) {
		return Promise.resolve(cloneDeep(this.ticket[key])) as any;
	}

	private _remove(key: IFormKey) {
		delete this.ticket[key];
		return Promise.resolve();
	}

}
