import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from "@angular/core";
import { VVSApp } from "../../../../providers/vvs-controller/vvs-controller";
import { forEach, map, toString, isEmpty, set, find, filter, cloneDeep } from 'lodash';
import * as cf from "../../../../constants/constant-fields";
import * as t from "../../../../constants/constant-titles";
import { licenseCodes } from "../../../../constants/constants";
import * as cat from "../../../../constants/event-categories";

import { Logger } from "../../../../providers/vvs-controller/util/logger";

import {
	// ICompanyArrival,
	ICustomerStepModel,
	ICustomerStepControl,
	ICustomerStepOutput,
	// IEventParty,
	ILicenseFieldItem,
	ILicenseID,
	ISelectPopoperItem,
	ITicketType,
	NumericMap,
	ICalendarEvent,
} from "../../../../lib/vvs-bridge";
// tslint:disable-next-line:no-duplicate-imports
// import { CustomerValidationInterface } from "./customer-step.options";
import { debounceTime, tap, throttleTime } from "rxjs/operators";
import { pages } from "../../../../pages/index";
// import { PhoneValidator, validatePhone } from "./validate";
import { CheckInFormProvider } from "../../checkin-form.provider";
import { parseJSON } from "../../../../util/parse-json";
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import * as masker from 'vanilla-masker';
import { Taptic } from "../../../../providers/haptic-service";
// import { ManateeCode } from "../../../../providers/manatee-scanner/manatee-scanner";
import { Observable, BehaviorSubject } from "rxjs";
import { LocalStorageService } from "../../../../providers/local-storage-service/local-storage-service";
import { unmaskPhoneNumber } from "../../../../util/unmask-phone-number";
import { PopoverOptions } from "ionic-angular";
import { validatePhone } from "./validate/phone";
import { parseLicense } from "../../../../util/parse-license";
import { switchMap, distinctUntilChanged, catchError } from 'rxjs/operators';  // Import operators
import { of } from 'rxjs';
import { ModalService } from "../../../../modals/modal.service";
// import { companyEvent } from "../../../../util/vvs-validation/index";

const logger = Logger.get("CustomerStep");

// TODO determined the input types. I like floating, but there is too much padding...
// I il

// tslint:disable-next-line:prefer-const
// let $valid: string;


@Component({
	selector: "customer-step",
	templateUrl: "./customer-step.html",
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerStep {

	public roomNumberSubject = new BehaviorSubject('');

	allValid = false;
	isCallingRoomNumberAPI: boolean = false;
	isCallingRoomNumberValidatedAPI: boolean = false;


	// NOTE do not ever use debugger
	// logger.debug();

	// numberOnly(event:Event) {
	//     return String.fromCharCode(event.charCode).match(/[a-zA-Z0-9 ]/g) != null
	// }
	@Output() notify: EventEmitter<ICustomerStepOutput> = new EventEmitter();

	@Input() busyMode = false;

	_currentStep: boolean;
	@Input()
	set currentStep(val: boolean) {
		if (val == true) {
			this.formProvider.updateNextStatus(this.myForm.valid);
			// set(this.formProvider, "ticket.CurrentStep.formstep.nextStatus", this.myForm.valid);
			// delay( () => set(this.formProvider, "ticket.CurrentStep.formstep.nextStatus", this.myForm.valid), 1000);
		}
		this._currentStep = val;
	}
	get currentStep() {
		return this._currentStep;
	}

	masks: any;


	stillTyping: boolean = false;
	places: NumericMap<ITicketType> = {} as any;
	// companies    : ICompanyArrival[]       = [];
	// eventParties : IEventParty[]           = [];
	calendarEvents: NumericMap<ICalendarEvent> = {} as any;

	// validations  : CustomerValidationInterface =  {} as CustomerValidationInterface;

	// private ticket       : ICustomerStepModel      = { licenseID: {} } as ICustomerStepModel; // this.newTicket();
	// blurTimeout: any;
	// license: any;
	isScanning: boolean = false;
	// licenseID: ILicenseID;

	// _roomNumber = {} as { value: string, disabled: boolean };

	// get roomNumber() {
	// 	return this._roomNumber.value;
	// }
	// set roomNumber(val: string) {
	// 	this._roomNumber.value = val;
	// 	this.setRxRoomNumber(val);
	// }

	myForm: FormGroup;

	constructor(private vvsApp: VVSApp,
		public formBuilder: FormBuilder,
		private cdref: ChangeDetectorRef,
		private formProvider: CheckInFormProvider) {


		// let data = {
		// 	"id": 10341315,
		// 	"hotel_id": 300,
		// 	"confirmation_number": "104350",
		// 	"currency_code": "USD",
		// 	"status": "RESERVED",
		// 	"arrival_date": "2025-02-25",
		// 	"arrival_time": "15:00:00",
		// 	"departure_date": "2025-02-26",
		// 	"departure_time": "11:00:00",
		// 	"bills": [
		// 		{
		// 			"bill_number": 1,
		// 			"id": 321809,
		// 			"invoice_number": "5782",
		// 			"reservation_id": 10341315
		// 		}
		// 	],
		// 	"created_time": "2024-12-10T19:51:24",
		// 	"deposit_amount": 0,
		// 	"promotion_code": "",
		// 	"segment_code": "",
		// 	"tax_exempt": false,
		// 	"stay_dates": [
		// 		{
		// 			"date": "2025-02-25",
		// 			"id": 24706829,
		// 			"amount": "100.00",
		// 			"net_amount": "83.33",
		// 			"tax_amount": "23.67",
		// 			"exclusive_tax_amount": "7.00",
		// 			"inclusive_tax_amount": "16.67",
		// 			"rate_id": 42985,
		// 			"rate_suppressed": false,
		// 			"room_type_id": 1449,
		// 			"adults": 2,
		// 			"children": 0,
		// 			"infants": 0,
		// 			"original_room_type_id": 1449
		// 		},
		// 		{
		// 			"date": "2025-02-26",
		// 			"id": 24706830,
		// 			"amount": "219.00",
		// 			"net_amount": "182.50",
		// 			"tax_amount": "43.50",
		// 			"exclusive_tax_amount": "7.00",
		// 			"inclusive_tax_amount": "36.50",
		// 			"rate_id": 42985,
		// 			"rate_suppressed": false,
		// 			"room_type_id": 1449,
		// 			"adults": 2,
		// 			"children": 0,
		// 			"infants": 0,
		// 			"original_room_type_id": 1449
		// 		}
		// 	],
		// 	"guests": [
		// 		{
		// 			"address": {
		// 				"id": 669607,
		// 				"postal_code": "10011"
		// 			},
		// 			"id": 7063732,
		// 			"is_primary": true,
		// 			"first_name": "Test",
		// 			"last_name": "Bratz",
		// 			"email": "test@test.com",
		// 			"is_vip": false,
		// 			"mobile_phone": "+12131231232",
		// 			"opted_promotional_emails": false,
		// 			"is_flagged": false
		// 		}
		// 	],
		// 	"upsell_applied": false,
		// 	"early_check_in_applied": false,
		// 	"late_check_out_applied": false,
		// 	"updated_time": "2024-12-10T19:51:25",
		// 	"creator": {
		// 		"id": 6047,
		// 		"login": "connect-api@stayntouch.com"
		// 	},
		// 	"restrict_post": false,
		// 	"do_not_move": false
		// };

		// let guestEmail = data.guests.map(guest => guest.email);
		// console.log(guestEmail);
		// console.log("data ::::>>>>>>>>", data);

		this.createForm();
	}

	// @Debounce(200)
	// setRxRoomNumber(val: string) {
	// 	this.f.roomNumber.setValue(val);
	// }

	ngOnInit() {

		this.roomNumberSubject.pipe(
			debounceTime(500), // Delay for 500ms after the last keystroke before making the API call
			distinctUntilChanged(), // Only make the API call if the room number has changed
			switchMap(roomNumber => {
				if (roomNumber.length >= 3 && roomNumber.length <= 6) {
					this.isCallingRoomNumberValidatedAPI = true;
					const localData = JSON.parse(localStorage.getItem("selectedProperty"));
					if (localData && localData.hotelID) {
						const payload = {
							hotelID: localData.hotelID,
							room_number: roomNumber
						};
						return this.vvsApp.httpService.callingCheckRoomNumberValidation(payload).pipe(
							tap((res: any) => {
								this.isCallingRoomNumberValidatedAPI = false;
								if (res.result.results && res.result.results.length > 0) {
									this.getReservationNumberUsingRoomNumber(payload);
								} else {
									this.myForm.patchValue({ confirmation_number: null });
									this.vvsApp.presentSingleAlert("Room Number Not Found.");
								}
							}),
							catchError(err => {
								this.isCallingRoomNumberValidatedAPI = false;
								return of(null); // return observable to handle error
							})
						);
					} else {
						this.isCallingRoomNumberValidatedAPI = false;
						this.vvsApp.presentSingleAlert("Hotel ID not found.");
						return of(null);
					}
				} else {
					return of(null); // Don't call the API if the room number is invalid
				}
			})
		).subscribe();

		this.f.ticketNumber.valueChanges
			.subscribe(
				(next) => {
					if (next && next.length === 1) {
						this.attemptToPopulatePlace(next);
						logger.info("valueChanges", next);
					}
				},
				logger.error
			);

		// .pipe(
		// 	debounceTime(200)
		// )
		this.f.isHotel.valueChanges
			.subscribe(
				(next) => {

					// // this.cdref.detectChanges();
					// logger.info("this.f.isHotel.valueChanges", next);
					if (next == "1") {
						// this.myForm.get("roomNumber").markAsUntouched();
						// this.myForm.get("roomNumber").setValue("");
						this.myForm.get("roomNumber").enable({ emitEvent: false });

						// this._roomNumber.disabled = false;
					} else if (next == "0" || !next) {
						if (!isEmpty(this.f.roomNumber.value)) {
							this.myForm.get("roomNumber").setValue("", { emitEvent: false });
						}
						// this.myForm.get("roomNumber").disable({ emitEvent: false });

						// this._roomNumber.value = "";
						// this._roomNumber.disabled = true;
					}
					// // this.cdref.detectChanges();
					// // // this.f.roomNumber.
				},
				logger.error
			);

		this.myForm.valueChanges
			.pipe(
				debounceTime(250),
				tap(() => {
					// debugger;
					// set(this.formProvider, "ticket.CurrentStep.formstep.nextStatus", this.myForm.valid);
					this.formProvider.updateNextStatus(this.myForm.valid);
				}),
				// throttleTime(250)
			)
			.subscribe(
				(next) => {

					const form: ICustomerStepControl<any> = this.myForm.getRawValue();

					const {
						ticketNumber,
						ticketTypeName,
						ticketTypeID,
						ticketPrice,

						// eventPartyID,
						// eventPartyName,
						// companyEventID,
						// companyEventName,
						eventID,
						eventName,

						roomNumber,
						customerPhone,
						isHotel,
					} = form;

					const ticket = {
						ticketNumber,
						ticketTypeName,
						ticketTypeID,
						ticketPrice,
						// eventPartyID,
						// eventPartyName,
						// companyEventID,
						// companyEventName,
						eventID,
						eventName,

						roomNumber, //: this._roomNumber.value,
						customerPhone,
						isHotel,

						licenseID: {
							customerFirstName: form.customerFirstName,
							customerLastName: form.customerLastName,
							Email: form.Email,
							confirmation_number: form.confirmation_number
						}
					} as ICustomerStepModel;

					this.formProvider.setCustomerStep(ticket);
					this.formProvider.updateNextStatus(this.myForm.valid);
				},
				logger.error
			);

		this.myForm.statusChanges
			.subscribe(
				() => {
					// logger.info("statusChanges", this.myForm);
					// logger.info(
					// 	"statusChanges",
					// 	map(this.myForm.controls, (ctrl, key) => {
					// 		let obj = {};
					// 		obj[key] = ctrl.valid;
					// 		return obj;
					// 	})
					// );
					this.notify.emit({ nextStatus: this.myForm.valid });
					this.formProvider.updateNextStatus(this.myForm.valid);
				},
				logger.error
			);

		// wrap with debounce
		// forEach(this.validate, (val, key) => {
		// 	this.validate[key] = debounce(this.validate[key], 300);
		// });

		// }
		//
		// ionViewDidEnter() {

		// ionViewDidEnter() {
		// logger.debug("ionViewDidEnter customer.ts 'constructor'");
		// setTimeout( () => {
		//     this.notify.emit({currentStep: cf.customer});
		// }, 2000);
		// }
		// this.initValidators();
		// this.initValidations();

		this.formProvider
			// .lss
			.getCustomerStepData()
			.then(([places, calendarEvents,/*companies, eventParties,*/ ticket]) => {



				// this.places = places;
				this.places = filter(places, x => x.isActive == 1);

				this.calendarEvents = calendarEvents;

				// this.companies = companies;
				// this.eventParties = eventParties;
				if (!isEmpty(ticket)) {
					// this.ticket = ticket || {};

					// if empty
					// this.licenseID = ticket.licenseID ? ticket.licenseID : {} as ILicenseID;
					/* HACK */
					// logger.debug(this.ticket.customerPhone[16]);

					// const maskCustomerPhone = ! ticket.maskCustomerPhone
					// 			  			  ? toString(ticket.customerPhone).slice(0, 14)
					// 						  : toString(ticket.maskCustomerPhone).slice(0, 14);

					// this.f.customerFirstName.setValue(ticket.licenseID.customerFirstName);
					// this.f.customerLastName.setValue(ticket.licenseID.customerLastName);
					// this.f.customerPhone.setValue(maskCustomerPhone);

					this.myForm.reset();

					const {
						ticketNumber,
						ticketTypeName,
						ticketTypeID,
						ticketPrice,

						// eventPartyID,
						// eventPartyName,
						// companyEventID,
						// companyEventName,

						eventID,
						eventName,

						roomNumber,
						customerPhone,
						isHotel,
						licenseID,

						currentTicketID
					} = ticket;
					console.log("ticket is by rb", ticket)
					// debugger;

					const values = {
						customerFirstName: licenseID.customerFirstName,
						customerLastName: licenseID.customerLastName,

						ticketNumber,
						ticketTypeName,
						ticketTypeID,
						ticketPrice,

						eventID,
						eventName,
						// eventPartyID: eventPartyID,
						// eventPartyName: eventPartyName,
						// companyEventID,
						// companyEventName,

						roomNumber,
						customerPhone,
						isHotel,

						currentTicketID
					};

					// this._roomNumber.value = roomNumber;

					// debugger;

					forEach(values, (val, key) => {
						values[key] = toString(val);
					});

					console.log("values ::>>", values)
					console.log("ModalService.ticketAllData ::>>", this.places)
					console.log("ModalService.ticketAllData ::>>", ModalService.ticketAllData)
					logger.info("setValue", values);
					this.myForm.patchValue(values);
					this.myForm.patchValue({
						roomNumber: ModalService.ticketAllData && ModalService.ticketAllData.roomNumber ? ModalService.ticketAllData.roomNumber : '',
						confirmation_number: ModalService.ticketAllData && ModalService.ticketAllData.confirmation_number ? ModalService.ticketAllData.confirmation_number : ''
					});
					console.log("_data")
					// if (ModalService.ticketAllData && ModalService.ticketAllData.TicketType) {
					// 	const _data = cloneDeep(ModalService.ticketAllData.TicketType);
					// 	console.log("_data", _data)
					// 	this.f.isHotel.setValue(_data.isHotel + "");
					// 	this.f.ticketTypeID.setValue(_data.ticketTypeID);
					// 	this.f.ticketPrice.setValue(_data.ticketPrice);
					// 	this.f.ticketTypeName.setValue(_data.ticketTypeName);
					// 	this.f.ticketTypeName.markAsTouched();
					// 	this.updatePhoneValidity();
					// }

					if (ticket.status == "editing") {
						const currentTicketType = find(this.places, place => 
							place.ticketTypeID === ticket.ticketTypeID || 
							place.ticketTypeName === ticket.ticketTypeName
						);
						if (currentTicketType) {
							this.f.isHotel.setValue(currentTicketType.isHotel + "");
							this.f.ticketTypeID.setValue(currentTicketType.ticketTypeID);
							this.f.ticketPrice.setValue(currentTicketType.ticketPrice);
							this.f.ticketTypeName.setValue(currentTicketType.ticketTypeName);
						}
					}
					// this.myForm.markAsTouched();

					// this.validations.ticketType = "";
					// this.validate.ticketType();

					//   this._validateAll();
				} else {
					this.notify.emit({ nextStatus: false });
				}

			})
			.catch(logger.e);

		let i = 0;

		//    this.vvsApp.lss.initFormStepService();
		this.formProvider.FormStepObserver
			.subscribe(
				(event) => {
					// logger.debug(this,event);
					logger.l("FormStepService", event);
					this.notify.emit({ nextStatus: this.myForm.valid });

					switch (event.category) {
						case cat.RESET_FORM:
							logger.l("case cat.RESET_FORM:");
							i = 0;

							// this.ticket = this.resetTicket();
							this.myForm.reset();
							// this.initValidations();
							break;

						case cat.VALIDATE_CUSTOMER:
							logger.l("case cat.VALIDATE_CUSTOMER:", this.f);
							// this.validateAll();
							if (this.myForm && i > 0) {
								// this.validateAllFormFields(this.myForm);
								// const $valid = this.validatePhone({ value: this.f.customerPhone.value } as any);

								// if ($valid) {
								// this.f.customerPhone.setValue(this.f.customerPhone.value);
								// }
								// set(this.formProvider, "ticket.CurrentStep.formstep.nextStatus", this.myForm.valid);
								this.formProvider.updateNextStatus(this.myForm.valid);
							}
							i = 1;

							// this.shakeIt();
							break;

						case cat.NEW_CHECKIN:
							// logger.debug();
							i = 0;
							logger.l("case cat.NEW_CHECKIN:");
							// this.ticket = this.newTicket();
							// this.ticket = {licenseID: {}} as ICustomerStepModel;
							this.myForm.reset();

							if (event.data.ticketNumber) {
								this.f.ticketNumber.setValue(toString(event.data.ticketNumber));
								// this.validate.ticketNumber();
								this.attemptToPopulatePlace(event.data.ticketNumber, true);
							}
							if (event.data.license) {
								this._handleLicenseID(event.data.license, false);
							}
							// this.onBlurClick();
							break;

						case cat.DEFAULT_ACTION:
							logger.i("DEFAULT_ACTION", { event });
							break;

						case cat.BLUR_ON_CUSTOMER:
						case cat.BLUR:
							logger.l("case cat.BLUR_ON_CUSTOMER:");
							// this.onBlurClick();
							// this.attemptToPopulatePlace();
							break;

						// case cat.CHECKIN_INIT_ONE_TO_ONE:
						//     logger.l("case cat.CHECKIN_INIT_ONE_TO_ONE:");
						//     logger.l(event);
						//     if (!this.ticket.currentTicketID) {
						//         const iCheckinInit: ICheckInInit = event.data;
						//         this.ticket.currentTicketID = iCheckinInit.TicketSequence[0].currentTicketID;
						//     }

						//     break;
					}
				},
				logger.e
			);

		//    this.masks = {
		//        phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
		//    };


		logger.l("customer-step 111");

	}

	// ngAfterViewInit(): void {
	//     this.cdref.detectChanges();
	// }

	createForm() {
		this.myForm = this.formBuilder.group({
			ticketNumber: [
				'',
				{
					validators: [
						Validators.required,
						Validators.minLength(5),
						Validators.maxLength(5),
					],
					asyncValidators: [
						this.ticketNumberValidator(this.vvsApp.lss)
					]
				}
			],
			ticketTypeName: ['', [Validators.required]],
			ticketTypeID: ['', [Validators.required]],
			ticketPrice: ['', [Validators.required]],
			confirmation_number: [''],
			// Email: ['', [Validators.required]],

			// eventPartyID: [''], //['', [ Validators.required ] ],
			// eventPartyName: [''], //[{ value: '', disabled: true }, [ Validators.required ] ],
			// companyEventID: [''], //['', [ Validators.required ] ],
			// companyEventName: [''], //[{ value: '', disabled: true }, [ Validators.required ] ],
			eventID: [''],
			eventName: [''],

			roomNumber: [''],

			customerFirstName: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
				]
				// this.getFirstNameValidators()
			],
			customerLastName: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
					// Validators.pattern(
					// 	"^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
					// )
					// Validators.pattern('^[a-zA-Z ]*$') // TODO: accent mark angular validation last name
				]
			],
			customerPhone: [
				'',
				// // {
				// // 	validators:
				// 	[
				// 		// Validators.required,
				// 		PhoneValidator.validPhoneNumber
				// 	],
				// 	// asyncValidators: [
				// 	// 	this.phoneNumberValidator(this.vvsApp.lss)
				// 	// ]
				// // }
			],
			isHotel: [''],

			// optional
			currentTicketID: ['']
		} as ICustomerStepControl<any>);

		this.f.customerFirstName.setValidators(
			this.formProvider.busyMode ?
				[
					(control: AbstractControl) => {

						if (this.busyMode) {
							return;
						}

						if (this.f.isHotel.value == '1') {
							return Validators.required(control);
						}
					},
					Validators.minLength(2),
					Validators.maxLength(50),
				] :
				[
					Validators.required,
					(control: AbstractControl) => {

						if (this.busyMode) {
							return;
						}

						if (this.f.isHotel.value == '1') {
							return Validators.required(control);
						}
						// if (!this.busyMode || this.f.isHotel.value == '1') {
						// }

						// if (isEmpty(control.value)) {
						// 	if (this.f.isHotel.value == '1') {
						// 		return {
						// 			isRequired: "customer first name is required when hotel"
						// 		};
						// 	}
						// 	return null;
						// }

						// return Validators.required(control);
						// return  /null;
					},
					Validators.minLength(2),
					Validators.maxLength(50),
				]

		);

		this.f.customerPhone.setValidators([
			Validators.required,
			(control: AbstractControl) => {
				const phoneNumber = unmaskPhoneNumber(control.value);

				// const isHotel = this.myForm.controls["isHotel"].value;

				// if (isHotel == '0') { // (this.f.isHotel.value == '0') {
				if (this.f.isHotel.value == '0') {
					if (isEmpty(phoneNumber)) {
						return null;
					}
				}

				if (!validatePhone(phoneNumber)) {
					return { invalidPhoneNumber: "phone number is invalid" };
				}

				return null;
			}
		]);

		this.f.roomNumber.setValidators([
			(control: AbstractControl) => {
				// if (isEmpty(control.value)) {
				if (this.f.isHotel.value == '1') {

					if (isEmpty(control.value)) {
						return null;
					}

					// if ( !(this._roomNumber.value.length === 3 || this._roomNumber.value.length === 4) ) {
					if (!(control.value.length === 3 || control.value.length === 4)) {
						return { roomNumberValid: "room number is not valid" };
					}

				}
				return null;
				// }

				// return null;
			}
		]);
	}

	ticketNumberValidator(lss: LocalStorageService): AsyncValidatorFn {
		return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
			return lss.getCurrentTicketByTicketNumber(control.value).then(
				ticket => {
					logger.info("validateTicketNumber", ticket);

					// debugger;

					if (
						ticket &&
						ticket.ticketNumber == this.f.ticketNumber.value &&
						ticket.currentTicketID == this.f.currentTicketID.value
					) {
						return null;
					}

					return ticket ? { ticketExists: "Ticket already exists" } : null;
				}
			);
		};
	}

	// phoneNumberValidator(lss: LocalStorageService): AsyncValidatorFn {
	// 	return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
	// 		return lss.getCurrentTicketData().then(
	// 			tickets => {
	// 				const phone = unmaskPhoneNumber(control.value);
	// 				const customer = find(tickets, ticket => ticket.Customer.customerPhone == phone);
	// 				logger.info("phoneNumberValidator", customer, customer ? customer.Customer.customerPhone : "", phone);

	// 				return customer ? { phoneExists: "Phone already exists" } : null;
	// 				// logger.info("validatePhoneNumber", ticket);
	// 				// return ticket ? { ticketExists: "Ticket already exists" } : null;
	// 			}
	// 		);
	// 	};
	// }

	onChange(value: string) {
		if (!value) {
			return;
		}

		// logger.info("onChange", value);
		const ctrl = this.myForm.get('customerPhone') as FormControl;

		const pattern = "(999) 999-9999";
		// tslint:disable-next-line: prefer-conditional-expression
		if (value.length > pattern.length) {
			value = value.substring(0, pattern.length);
		} else {
			value = masker.toPattern(value, pattern);
		}
		ctrl.setValue(value, { emitEvent: false, emitViewToModelChange: false });
	}

	isEmpty() {
		return isEmpty(this.formProvider.ticket.CustomerStep);
	}


	changeReservationNo(event) {
		if (event.target.value.toString().length >= 6 && event.target.value.toString().length <= 10 && !this.isCallingRoomNumberAPI) {
			this.isCallingRoomNumberAPI = true;
			const localData = JSON.parse(localStorage.getItem("selectedProperty"));
			const payload: any = {};
			const value = event.target.value.toString();
			payload.confirmation_number = value;
			if (localData && localData.hotelID) {
				payload.hotelID = localData.hotelID;
			}
			this.vvsApp.httpService.callingLoginInStayNTouch(payload).subscribe((res: any) => {
				this.isCallingRoomNumberAPI = false;
				if (res && res.result && res.result.results && res.result.results.length && res.result.results[0]) {
					const roomNumber = res.result.results[0].room && res.result.results[0].room.number;
					if (roomNumber) {
						this.myForm.patchValue({ roomNumber });
					} else {
						this.myForm.patchValue({ roomNumber: null });
						this.vvsApp.presentSingleAlert("Room number is not found.");
					}
				} else {
					this.myForm.patchValue({ roomNumber: null });
					this.vvsApp.presentSingleAlert("Room number is not found.");
				}
			}, err => {
				this.isCallingRoomNumberAPI = false;
				logger.error(err);
			});
		}
	}


	changeRoomNo(event) {

		const roomNumber = event.target.value.toString();

		// Emit the current room number input to the subject
		this.roomNumberSubject.next(roomNumber);

		// const roomNumber = event.target.value.toString();

		// // Emit the current room number input to the subject
		// this.roomNumberSubject.next(roomNumber);

		// // Listen to changes in roomNumberSubject and manage API calls with debounce
		// this.roomNumberSubject.pipe(
		// 	debounceTime(500), // Delay for 500ms after the last keystroke before making the API call
		// 	distinctUntilChanged(), // Only make the API call if the room number has changed
		// 	switchMap(roomNumber => {
		// 		if (roomNumber.length >= 3 && roomNumber.length <= 6) {
		// 			this.isCallingRoomNumberValidatedAPI = true;
		// 			const localData = JSON.parse(localStorage.getItem("selectedProperty"));
		// 			if (localData && localData.hotelID) {
		// 				const payload = {
		// 					hotelID: localData.hotelID,
		// 					room_number: roomNumber
		// 				};
		// 				return this.vvsApp.httpService.callingCheckRoomNumberValidation(payload).pipe(
		// 					tap((res: any) => {
		// 						this.isCallingRoomNumberValidatedAPI = false;
		// 						if (res.result.results && res.result.results.length > 0) {
		// 							this.getReservationNumberUsingRoomNumber(payload);
		// 						} else {
		// 							this.myForm.patchValue({ confirmation_number: null });
		// 							this.vvsApp.presentSingleAlert("Room Number Not Found.");
		// 						}
		// 					}),
		// 					catchError(err => {
		// 						this.isCallingRoomNumberValidatedAPI = false;
		// 						logger.error(err);
		// 						return of(null); // return observable to handle error
		// 					})
		// 				);
		// 			} else {
		// 				this.isCallingRoomNumberValidatedAPI = false;
		// 				this.vvsApp.presentSingleAlert("Hotel ID not found.");
		// 				return of(null);
		// 			}
		// 		} else {
		// 			return of(null); // Don't call the API if the room number is invalid
		// 		}
		// 	})
		// ).subscribe();
	}

	getReservationNumberUsingRoomNumber(payload) {
		this.vvsApp.httpService.getReservationNumberUsingRoomNumber(payload).subscribe((res: any) => {
			this.isCallingRoomNumberValidatedAPI = false;
			console.log("getting response", res)
			console.log("results length", res.result.results.length);
			if (res.result.results && res.result.results.length > 0 && res.result.results[0].status && (res.result.results[0].status == 'RESERVED' || res.result.results[0].status == 'CHECKEDIN')) {
				this.myForm.patchValue({ confirmation_number: res.result.results[0].confirmation_number });
			} else {
				this.myForm.patchValue({ confirmation_number: null });
				this.vvsApp.presentSingleAlert("Reservation is not found.");
			}
		}, err => {
			this.isCallingRoomNumberValidatedAPI = false;
			logger.error(err);
		});
	}


	// shakeIt() {
	//     for (const k in this.validations) {
	//         if (this.validations[k] === invalid ) {
	//             // this.validations[k] = invalid;
	//             this.validations[k] = invalid + " shake animated";
	//         }
	//     }
	//     // logger.debug(this.validations);
	//     setTimeout( () => {
	//         forEach(this.validations, (v, k) => {
	//             // logger.debug(this.validations[k]);
	//             this.validations[k] = this.validations[k].replace("shake animated", "");
	//             // logger.debug(this.validations[k]);
	//         });
	//     }, 1000);
	// }

	startScanner(event: 'ticket' | 'id') {

		this.notify.emit({ nextStatus: null });
		Taptic.light();

		this.vvsApp.barcodeScanner.scan()
			.then(data => {
				// alert(JSON.stringify(data, null, 4));
				switch (event) {

					case cf.ticket: // qr code

						data.format == 'QR_CODE'
							? this.handleQR(data.text)
							: this.vvsApp.presentSingleAlert(
								"Please scan a valid QR code."
							);

						break;

					case cf.id: // license id

						data.format == 'PDF_417'
							? this.handleLicenseID(data.text)
							: this.vvsApp.presentSingleAlert(
								"Please scan a valid driver's license or ID."
							);
						break;
				}
			})
			.catch(error => {
				logger.e(error);
			})

		// this.vvsApp.manatee.startScanning()
		// .then((response) => {
		// 	switch (event) {
		// 		case cf.ticket: // qr code

		// 			response.type === ManateeCode.qr
		// 			? this.handleQR(response)
		// 			: this.vvsApp.presentSingleAlert(
		// 				"Please scan a valid QR code."
		// 			);

		// 			break;

		// 		case cf.id: // license id

		// 			response.type === ManateeCode.license
		// 			? this.handleLicenseID(response.code)
		// 			: this.vvsApp.presentSingleAlert(
		// 				"Please scan a valid driver's license or ID."
		// 			);
		// 			break;
		// 	}

		// })
		// .catch(logger.e);


	}

	handleQR(response: string = '') {
		if (response.length === 5) {
			// this.ticket.ticketNumber = toString(response.code);
			this.f.ticketNumber.markAsTouched();
			this.f.ticketNumber.setValue(toString(response));
			this.attemptToPopulatePlace(response);
		} else {
			this.vvsApp.presentSingleAlert(`'${response}' is not a valid QR code. Code must be 5 digits`);
		}
	}

	// handleQR(response: {type: ManateeCode, code: any}) {
	//     if (isNaN(response.code) === false && toString(response.code).length === 5 ) {
	//         // this.ticket.ticketNumber = toString(response.code);
	// 		this.f.ticketNumber.markAsTouched();
	// 		this.f.ticketNumber.setValue(toString(response.code));
	// 		this.attemptToPopulatePlace(response.code);
	//     } else {
	// 		this.vvsApp.presentSingleAlert(`'${response.code}' is not a valid QR code. Code must be 5 digits`);
	// 	}
	// }

	handleLicenseID(code: string) {

		const license = parseLicense(code);

		// alert(JSON.stringify(license, null, 4));

		// const licenseJSON = parseJSON(code) as any;

		// const license = { } as ILicenseID;


		// license.state = (licenseJSON && licenseJSON.hasOwnProperty(cf.State)) ? licenseJSON.State : "";

		// const fields = (licenseJSON && licenseJSON.hasOwnProperty(cf.Fields)) ? licenseJSON.Fields : [];

		// forEach(fields, (field: ILicenseFieldItem) => {
		//      if (licenseCodes.hasOwnProperty(field.ID)) {
		//          license[licenseCodes[field.ID]] = (field.Value !== cf.NONE || !field.Value) ? field.Value : "";
		//      }
		// });

		this._handleLicenseID(license, true);
	}

	// handleLicenseID(code: string) {

	// 	const licenseJSON = parseJSON(code) as any;

	// 	const license = { } as ILicenseID;


	//     license.state = (licenseJSON && licenseJSON.hasOwnProperty(cf.State)) ? licenseJSON.State : "";

	//     const fields = (licenseJSON && licenseJSON.hasOwnProperty(cf.Fields)) ? licenseJSON.Fields : [];

	//     forEach(fields, (field: ILicenseFieldItem) => {
	//          if (licenseCodes.hasOwnProperty(field.ID)) {
	//              license[licenseCodes[field.ID]] = (field.Value !== cf.NONE || !field.Value) ? field.Value : "";
	//          }
	//     });

	// 	this._handleLicenseID(license, true);
	// }

	presentSelectPopover(event: Event) {

		const items: ISelectPopoperItem[] = map(this.places, (place: ITicketType) => {
			return { name: place.ticketTypeName, id: place.ticketTypeID, data: place };
		});

		// logger.debug(items);
		// TODO possibly, we can try to scrollTo top first, so it looks better if keyboard is open.
		const data = {
			items,
			title: t.CHOOSE_TICKET_TYPE,
			callback: (_data: ISelectPopoperItem) => {
				console.log("_data ::>>", _data)
				if (_data) {
					this.f.isHotel.setValue(_data.data.isHotel + "");

					this.f.ticketTypeID.setValue(_data.id);
					this.f.ticketPrice.setValue(_data.data.ticketPrice);
					this.f.ticketTypeName.setValue(_data.name);
					this.f.ticketTypeName.markAsTouched();

					this.updatePhoneValidity();

					// this.toggleRoomNumber(_data.data.isHotel);
				}
			}
		};

		this.vvsApp.presentPopover(pages.SelectPopover, data, event);

	}

	presentCompanySelectPopover(event: Event) {

		// // TODO possibly, we can try to scrollTo top first, so it looks better if keyboard is open.
		// let $events: ISelectPopoperItem[];
		// if (this.eventParties) {
		//     $events = map(this.eventParties, ({eventPartyName: name, eventPartyID: id}: IEventParty) =>
		//         ({  name, id, data: cf.EventParty  })
		//     );
		// }


		// let $companies: ISelectPopoperItem[];
		// if (this.companies) {
		//     $companies = map(this.companies, ({companyArrivalName: name, companyArrivalID: id}: ICompanyArrival) =>
		//         ({ name, id, data: cf.CompanyArrival})
		//     );
		// }

		// const items = $events.concat($companies);

		const items = map(this.calendarEvents, ev => {
			return {
				name: ev.eventName,
				id: ev.eventID
			};
		});

		const data = {

			items,
			title: t.CHOOSE_EVENT,
			callback: (_data: ISelectPopoperItem) => {

				if (_data) {
					this.f.eventID.markAsTouched();
					this.f.eventName.markAsTouched();
					this.f.eventID.setValue(_data.id);
					this.f.eventName.setValue(_data.name);

					this.updatePhoneValidity();

					// if (_data.data === cf.EventParty) {
					// 	this.f.eventPartyID.markAsTouched();
					// 	this.f.eventPartyID.setValue(_data.id);
					// 	this.f.eventPartyName.setValue(_data.name);
					// } else if (_data.data === cf.CompanyArrival) {
					// 	this.f.companyEventID.markAsTouched();
					// 	this.f.companyEventID.setValue(_data.id);
					// 	this.f.companyEventName.setValue(_data.name);
					// }
					// // this.ticket.companyEventID = _data.id;
					// // this.ticket.companyEventName = _data.name;
				}

			}
		};

		const options: PopoverOptions = { cssClass: "event-popover" };
		logger.info({ options });

		this.vvsApp.presentPopover(pages.SelectPopover, data, event, options);

	}

	async attemptToPopulatePlace(ticketNumber: string, force?: boolean) {

		if (isEmpty(this.places)) {
			this.places = await this.vvsApp.lss.getTicketTypeData();
			this.places = filter(this.places, x => x.isActive == 1);
		}

		logger.l("attemptToPopulatePlace", ticketNumber, force, this.places);
		forEach(this.places, (place: ITicketType) => {
			if (toString(place.qrKey) === toString(ticketNumber)[0]) {

				this.f.isHotel.setValue(place.isHotel + "");
				this.f.ticketTypeID.setValue(place.ticketTypeID);
				this.f.ticketPrice.setValue(place.ticketPrice);
				this.f.ticketTypeName.setValue(place.ticketTypeName);
				this.f.ticketTypeName.markAsTouched();


				this.updatePhoneValidity();

				// this.toggleRoomNumber(place.isHotel);

				// debugger;

				return false;
			}
		});

		this.formProvider.updateNextStatus(this.myForm.valid);
	}

	restartTicketType() {
		this.f.ticketTypeID.setValue("");
		this.f.ticketPrice.setValue("");
		this.f.ticketTypeName.setValue("");
		this.f.isHotel.setValue("");
		// this.toggleRoomNumber("");
	}

	get f(): ICustomerStepControl<FormControl> {
		return this.myForm.controls as any;
	}
	get _f(): any {
		return this.myForm.controls as any;
	}

	getValidClass(key: string) {
		const control = this.f[key];

		if (control) {
			if (control.valid && control.touched) {
				return "vvs-valid";
			} else if (!control.valid && control.touched) {
				return "vvs-invalid";
			} else {
				return "vvs-noop";
			}

		}

		return "vvs-invalid";
	}

	// toggleRoomNumber(isHotel) {
	// 	logger.info("toggleRoomNumber", isHotel);
	// }

	private _handleLicenseID(license: ILicenseID, touch: boolean) {
		this.formProvider.setLicense(license);

		if (touch) {
			this.f.customerFirstName.markAsTouched();
			this.f.customerLastName.markAsTouched();
		}

		this.f.customerFirstName.setValue(license.customerFirstName);
		this.f.customerLastName.setValue(license.customerLastName);
		// if (isEmpty(license.customerLastName)) {
		// 	this.f.customerLastName.setValue(license.customerFamilyName);
		// }

	}

	private updatePhoneValidity() {
		this.f.customerPhone.setValue(this.f.customerPhone.value);
	}

	// // tslint:disable-next-line: member-ordering
	// validateAllFormFields(formGroup: FormGroup) {         //{1}
	// 	// debugger;
	// 	Object.keys(formGroup.controls).forEach(field => {  //{2}
	// 		const control = formGroup.get(field);             //{3}
	// 		if (control instanceof FormControl) {             //{4}
	// 			control.markAsTouched({ onlySelf: true });
	// 		} else if (control instanceof FormGroup) {        //{5}
	// 			this.validateAllFormFields(control);            //{6}
	// 		}
	// 	});
	// }

	// private getFirstNameValidators() {
	// 	const tmp = [
	// 		Validators.required,
	// 		Validators.minLength(2),
	// 		Validators.maxLength(50),
	// 		// Validators.pattern(
	// 		// 	"^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
	// 		// )
	// 		// Validators.pattern('^[a-zA-Z ]*$') // TODO: accent mark angular validation last name
	// 	];

	// 	if (this.busyMode) {
	// 		tmp.shift();
	// 	}

	// 	return tmp;
	// }
}
