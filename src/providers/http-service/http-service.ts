/*
 * Copyright (c) 2018 VVS LLC
 *
 * Author: Lucas Estrella
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cloneDeep, isEmpty, isNil, last, merge, isFunction, toString, get } from 'lodash';
import { map, timeout, finalize, tap, throttleTime } from 'rxjs/operators';
import * as CodeMessages from '../../constants/code-messages';
import * as endpoints from '../../constants/end-points';
import { ENV } from "../../environments";
import * as vvsBridge from '../../lib/vvs-bridge';
import {
	IParkNew,
	IPullNew,
	ICheckOutNew,
	IEditNew,
	ICheckInNew,
	IPropertySignIn,
	IPull,
} from '../../lib/vvs-bridge/api-return';
import { TicketCombined } from '../../pages/checkin-form/checkin-form';
import { LocalStorageService } from "../local-storage-service/local-storage-service";
import { Logger } from '../vvs-controller/util/logger';
import { VVSApp } from '../vvs-controller/vvs-controller';

import * as cf from '../../constants/constant-fields';
import * as t from '../../constants/constant-titles';

import { Observable, of, throwError } from 'rxjs';
// import { Observable } from 'rxjs';
import { TokenInterceptor, InterceptorSkipTokenHeader, } from './token.interceptor';
import { InitCancelEvents, IOperation } from './init_cancel_events';
import { pages } from '../../pages';
// import { RollbarService } from '../../services/rollbar';
// import { IChat, IUser } from '../../lib/vvs-bridge';
import { Debounce } from 'lodash-decorators/debounce';
import { IEditNotesPhotosData } from '../../modals/edit/edit';
import { httpRetry } from '../../operators/http-retry/http-retry.operator';
import { PushNotificationService } from '../../services/push-notification/push-notification.provider';
import { Taptic } from '../haptic-service';
import { RollbarService } from '../../services/rollbar';
import { Throttle } from 'lodash-decorators';
import { Refresher } from 'ionic-angular';
import { EnvService } from '../env-service';
import { IPushPay } from '../../pages/review-ticket/review-ticket';
// import { StripeCardTokenRes } from '@ionic-native/stripe/ngx';
import { IAblyUpdate } from '../ably-service';
// tslint:disable-next-line: no-duplicate-imports
import { ICarPhoto } from '../../lib/vvs-bridge';

export const apiHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
// apiHeaders.headers.set(InterceptorAuthHeader, '');

const loginOption = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
loginOption.headers.set(InterceptorSkipTokenHeader, '');

// const headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded"});
const vinOptions = { headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" }) };
// vinOptions.headers.set(InterceptorSkipTokenHeader, '');

const logger = Logger.get("HttpService");

type AblyPublishCallback = <T>(data: T) => void; // (status: PubNub.PublishStatus, response: PubNub.PublishResponse) => void;

let me: HttpService;

// @Injectable()
export class HttpService extends InitCancelEvents {

	public static instance: HttpService;
	public static get(vvsApp: VVSApp): HttpService {
		return HttpService.instance || (HttpService.instance = new HttpService(vvsApp));
	}

	lss: LocalStorageService;
	http: HttpClient;

	// presentPasswordAlert: Observer<any>;

	_passwordShowing = false;
	set passwordShowing(val: boolean) {
		this._passwordShowing = val;
	}
	get passwordShowing() {
		return this._passwordShowing;
	}

	constructor(protected vvsApp: VVSApp) {
		super();

		me = this;
		// HttpService.instance = me;
		this.lss = LocalStorageService.get(this.vvsApp);
		this.http = this.vvsApp.http;
		this.vvsApp.ready()
			.then(() => this.loadImportantData());
	}

	loadImportantData() {
		this.lss.getLoginUser()
			.then((user: vvsBridge.IUser) => {
				if (user && user.Authorization) {
					// this.setAuthTokenHeader(user.Authorization);
					TokenInterceptor.setToken(user.Authorization);
					// this.vvsApp.imgLC.httpHeaders.set("Authorization", TokenInterceptor.getToken());

					// RollbarService.configure({
					// 	propertyID: user.CurrentProperty ? user.CurrentProperty.propertyID : "",
					// 	userID: user.userID,
					// 	username: user.username,
					// 	stage: user.stage
					// });
					user.CurrentProperty = user.CurrentProperty || {} as any;
					RollbarService.configure({
						payload: {
							propertyID: user.CurrentProperty.propertyID,
							propertyName: user.CurrentProperty.propertyName,
							stage: user.stage,
							person: {
								// companyID: me.vvsApp.companyID,
								id: user.userID,
								username: user.username,
							},
						}
					});
					if (user.CurrentProperty && user.CurrentProperty.propertyID) {
						this.vvsApp.ably.connect(user.AblyToken);
						PushNotificationService.get(this.vvsApp).init(user.stage, user.CurrentProperty.propertyID, user.ONE_SIGNAL_APP_ID);
					}
				}
			})
			.catch(logger.e);
	}

	emit<T, K>(operation: IOperation, payload: T, cb?: AblyPublishCallback) {
		// super.emit(operation, payload, cb);

		(payload as any).lastSync = LocalStorageService.getLastSync();

		return this
			.put("operation/" + operation, { operation, payload })
			.pipe(
				finalize(() => this.vvsApp.dismissLoading('finalize-emit')),
				httpRetry({
					takeCount: 3,
					interval: 1000,
					intervalRate: 1.3
				}),
				timeout(ENV.timeout)
			)
			.subscribe(
				(data) => {
					logger.l({ operation, data });
					this.vvsApp.ably
						.update(operation, data as IAblyUpdate);
					isFunction(cb) && cb(data);
				},
				(error) => {
					this.vvsApp.toast("Try again", undefined);
					// logger.error(error);
				}
			);
	}



	public getCarInfoRestful(barcode: string) {
		return this.http
			.post(ENV.VIN_API, "DATA=" + barcode + "&format=JSON", vinOptions)
			.pipe(
				httpRetry({
					takeCount: 3,
					interval: 1000,
					intervalRate: 1.3
				}),
			);
		// .catch(this.hE);
		// .pipe(catchError(this.hE));
	}

	// public getCurrentTickets() {
	//     return this.post(endpoints.GetCurrentTickets);
	// }

	public initializeTickets(from: string) {
		logger.info("initializeTickets from", from);
		return this._initializeTickets().toPromise().catch(logger.error);
	}

	// public getChatData(latestmessage: string|any): Observable<any> {
	//     return this.post(endpoints.GetChat, { latestmessage });
	// }

	/**
	 * call this.lss.getIH() in case is not already set in memory
	 */
	public insertUserToProperty(property: vvsBridge.IProperty, user: vvsBridge.IUser): Observable<IPropertySignIn> {

		const { propertyID } = property;

		return this.post(endpoints.PickProperty, { propertyID });
	}

	public signOut() {
		if (!this.vvsApp.userID) {
			return of(false);
		}
		return this.post(endpoints.SignOut);
	}

	ChatInsert(chat: vvsBridge.IChat): Observable<vvsBridge.IChat> {
		return this.post(endpoints.ChatInsert, { message: chat })
			.pipe(
				map((data: { message: vvsBridge.IChat, updates: any }) => {
					delete data.message.sending;
					this.lss.insertChat(data.message);

					return data.message;
				})
			);
	}

	/**
	 * @param data
	 * @returns [ICheckInReturning, IEdit]
	 */
	rCheckin(data: any) {
		return this.post(endpoints.RCheckIn, data);
	}

	public editParkLocation(data: vvsBridge.IEditParkLocation) {
		return this.post<IEditNew>(endpoints.EditParkLocation, data);
	}

	public editCar(data: vvsBridge.IEditCar): Observable<IEditNew> {
		logger.assert(!data.Car.carID, "data.Car.carID must be defined");
		logger.assert(data.Car.carID <= 0, "data.Car.carID must an id greater than 0");
		// tslint:disable-next-line:no-debugger
		// logger.debug();
		return this.post<IEditNew>(endpoints.EditCar, data);
	}

	public addCar(data: any): Observable<any> {
		return this.post<any>(endpoints.CompleteCheckIn, data);
	}

	public editCustomer(data: vvsBridge.IEditCustomer): Observable<IEditNew> {
		if (data.Customer) {
			logger.assert(!data.Customer.customerID, "data.Customer.customerID must be defined");
			logger.assert(data.Customer.customerID <= 0, "data.Customer.customerID must an id greater than 0");
		}
		// tslint:disable-next-line:no-debugger
		// logger.debug();
		// debugger;
		return this.post<IEditNew>(endpoints.EditCustomer, data);
	}
	public editPhotoNotes(data: IEditNotesPhotosData) {
		logger.i("editPhotoNotes", { data });
		logger.assert(data.TicketSequence.ticketSequenceID <= 0, "data.Customer.customerID must an id greater than 0");
		return this.post<IEditNew>(endpoints.EditCarPhotos, data);
	}

	public payWithCard(body: { token: string, amount: number, currentTicketID: number }) {
		// alert(JSON.stringify({ body }, null, 4));
		return this.post(endpoints.PayWithCard, body, 7500, [409]);
	}

	public billingTransaction(payload: any) {
		const currentEnv = ENV.CURRENT_ENV == "prod" ? 'prod' : 'dev';
		const URL = `${ENV.BASE_ENDPOINT}/${currentEnv}/${endpoints.BillingTransaction}`;
		return this.http.post(URL, payload);
	}

	public payWithCash(body: { amount: number, currentTicketID: number, pushPay: IPushPay }): Observable<any> {
		return this.post(endpoints.PayWithCash, body);
	}

	public payWithComp(body: { compCode: number, currentTicketID: number, pushPay: IPushPay }): Observable<any> {
		return this.post(endpoints.PayWithComp, body);
	}

	public payWithVoucher(body: { images: ICarPhoto[], currentTicketID: number, pushPay: IPushPay }): Observable<any> {
		return this.post(endpoints.PayWithVoucher, body);
	}

	public getEClaimLink(ticketID: number) {
		return this.get(this.getAPI(`eclaim/get-link/${ticketID}`));
	}

	// /*
	// * Edit Methods Closes
	// */
	// public GetCompanies(): Observable<vvsBridge.ICompany[]> {
	//     // tslint:disable-next-line:no-debugger
	//     // logger.debug();
	// 	return this.get(this.getAPI(endpoints.GetCompanies))
	// 	// .post( (this.vvsApp.apiHost || ENV.apiHost) + awsAuthBaseUrl + endpoints.GetCompanies, apiHeaders)
	// 	.pipe(
	// 		timeout(ENV.timeout),
	// 		map( (companies: vvsBridge.ICompany[]) => {
	// 			logger.assert(!isNil((last(companies || []) || {} as any).affectedRows), "Companies result array is invalid");

	// 			return companies;
	// 		}),
	// 		// catchError(this.hE)
	// 	);
	// }

	/**
	 * @param data
	 */
	public callingLoginInStayNTouch(payload: any) {
		const URL = `${ENV.BASE_ENDPOINT}/dev/${endpoints.SyncRoomNumber}`;
		return this.http.post(URL, payload);
	}
	public callingCheckRoomNumberValidation(payload: any) {
		const URL = `${ENV.BASE_ENDPOINT}/dev/${endpoints.roomNumberValidation}`;
		return this.http.post(URL, payload);
	}
	public getReservationNumberUsingRoomNumber(payload: any) {
		const URL = `${ENV.BASE_ENDPOINT}/dev/${endpoints.getReservationNumberUsingRoomNumber}`;
		return this.http.post(URL, payload);
	}
	public getSummaryDetails(payload: any) {
		const URL = `${ENV.BASE_ENDPOINT}/dev/${endpoints.getSummaryDetails}`;
		return this.http.post(URL, payload);
	}

	public checkIn(ticketData: any): Observable<ICheckInNew> {
		// { ticket: TicketCombined, photos: any, pushPay: IPushPay, busyMode: boolean }
		// logger.assert(ticket.customerPhone.length !== 10, "Customer phone length must be 10");

		// const _data: any = merge(
		//     {},
		// 	// this.lss.getIH(),
		// 	{ busyMode },
		//     { ticket },
		//     { photos },
		//     { pushPay }
		// );
		if (ticketData.resend) {
			logger.info("INFO - Eclaim ticket resent");
			this.vvsApp.presentSingleAlert('Eclaim ticket successfully resent via text');
			return this.post(endpoints.CheckIn, {
				ticket: {
					colorID: ticketData.Car.colorID,
					customerFirstName: ticketData.Customer.customerFirstName,
					customerLastName: ticketData.Customer.customerLastName,
					customerPhone: ticketData.Customer.customerPhone,
					licensePlate: ticketData.Car.licensePlate,
					makeID: ticketData.Car.makeID,
					manual: ticketData.Car.manual,
					modelID: ticketData.Car.modelID,
					ticketNumber: ticketData.ticketNumber,
					ticketTypeID: ticketData.ticketTypeID,
					userID: ticketData.Payment.userID,
					username: null,
					uuid: ticketData.uuid,
				}, photos: [], pushPay: {
					manual: ticketData.Car.manual,
					ticketType: ticketData.TicketType.ticketTypeName,
					vehicle: ticketData.Car.colorHex,
					//TODO: replace with vehicle name 
				}, busyMode: false, resend: true, currentTicketID: ticketData.currentTicketID,
			}, 10000);
		}

		const { ticket, photos, pushPay, busyMode } = ticketData;
		const _data = {
			ticket, photos, pushPay, busyMode
		};

		// _data.lastSync = LocalStorageService.getLastSync();

		return this.post(endpoints.CheckIn, _data, 10000);

		// .pipe(
		// 	map( (data: any) => {
		// 		if (data && data.result && (data.result as any).updates) {
		// 			setTimeout( () => {
		// 				this.vvsApp.doSync("checkIn", (data.result as any).updates);
		// 			}, 1000)
		// 		}

		// 		Taptic.success();

		// 		return data && data.result ? data.result : data;
		// 	})
		// );
		// return this.post(endpoints.CheckIn, _data);
	}

	@Throttle(7500)
	public doSync(resolve?: any, reject?: any): void {

		if (LocalStorageService.getLastSyncSecondsAgo() <= 60) {
			return;
		}

		this.post(endpoints.DoSync, {})
			.subscribe(
				(data: any) => {
					this.vvsApp.refreshData();

					// refresher
					// && refresher.complete
					// && refresher.complete();

					resolve && resolve();

				},
				(error) => {
					logger.error(error);

					// refresher
					// && refresher.complete
					// && refresher.complete();

					resolve && resolve();
				}
			);
	}

	public park(data: object): Observable<IParkNew> {
		return this.post(endpoints.Park, data);
	}

	public pull(data: vvsBridge.IPull): Observable<IPullNew> {
		return this.post(endpoints.Pull, data);
	}

	public pullRequest(data: any): Observable<IPull> {
		return this.post(endpoints.PullRequest, data);
	}

	public checkOut(data: vvsBridge.ICheckOut): Observable<ICheckOutNew> {
		const $data = cloneDeep(data);

		// if ($data.compCode) {
		// 	delete $data.images;
		// }

		return this.post(endpoints.CheckOut, $data);
	}

	/**
	 * @param userToAuthenticate
	 *  TODO normalize these methods. Make it as the http-service.
	 *  TODO change to creds to json data, not url encoded.
	 *  var creds = "name=" + user.name + "&password=" + user.password;
	 *  var headers = new Headers();
	 *  headers.append('Content-Type', 'application/x-www-form-urlencoded');
	 *  headers.append('Content-Type', 'application/json');
	 */
	authenticate(userToAuthenticate: vvsBridge.ILoginCredentials, renew = false): Observable<vvsBridge.ICodeMessage | vvsBridge.ILoginSuccess> {
		return this
			.http
			.post(
				this.getAPI(endpoints.Authenticate),
				JSON.stringify(userToAuthenticate),
				loginOption
			)
			.pipe(
				map((data: any) => data && data.result ? data.result : data),
				map((_data: vvsBridge.ILoginSuccess) => {
					if (_data && _data.code) {

						switch (_data.code) {

							case CodeMessages.Success.code:
								// tslint:disable-next-line:no-console
								// console.log(JSON.stringify(_data, null, 3));
								Taptic.success();
								this.onLoginSuccess("authenticate 335", _data, renew);
								return _data;

							case CodeMessages.AuthenticationFailed.code:
								Taptic.error();
								return CodeMessages.AuthenticationFailed;

							case CodeMessages.UserAlreadySignedIn.code:
								Taptic.warning();
								return CodeMessages.UserAlreadySignedIn;

							case CodeMessages.AuthenticationFailedUserNotFound.code:
								Taptic.error();
								return CodeMessages.AuthenticationFailedUserNotFound;

							default:
								Taptic.error();
								return _data;
						}

					} else {
						// tslint:disable-next-line:no-console
						// console.log("226", JSON.stringify(_data));
						return CodeMessages.SomethingWentWrong;
					}
				})
			);
	}

	onLoginSuccess(from: string, _data: vvsBridge.ILoginSuccess, renew: boolean = false) {

		let current_user: vvsBridge.IUser;

		return this.lss
			.getLoginUser()
			.then(_x => current_user = cloneDeep(_x))
			.then(() => this.lss.setLoginUser(_data.user))
			// .then( (_x) => { this.lss.setLoginUser(_data.user); return _x; })
			.then(() => {

				// logger.i("onLoginSuccess", JSON.stringify({ from, renew, _data, current_user }, null, 3));

				if (renew) {
					logger.assert(isEmpty(current_user), "When renew is true, then _loginUser must have been initialized");
					logger.assert(isEmpty(current_user.CurrentProperty), "When renew is true, then _loginUser.CurrentProperty must have been initialized");
					logger.i({ current_user });
					// current_user = current_user;

					logger.assert(!(_data.user.Authorization && _data.user.AblyToken && _data.user.ONE_SIGNAL_APP_ID), "must be here");
					return this.lss.setCurrentProperty(current_user.CurrentProperty);
				} else {
					logger.assert(!(_data.user.Authorization && !_data.user.AblyToken && !_data.user.ONE_SIGNAL_APP_ID), "must assert");
					current_user = cloneDeep(_data.user);
				}

			})
			// .then( () => this.lss.setPropertyData(_data.properties) )
			.then(() => {
				this.lss.setAuthorization(_data.user.Authorization, _data.user.AblyToken, _data.user.ONE_SIGNAL_APP_ID);
			})
			// must be in property
			.then(() => {
				const propertyID = get(current_user, "CurrentProperty.propertyID");
				if (propertyID) {
					this.vvsApp.ably.connect();
					return true;
				}
			})
			.then((doInit) => doInit && this.vvsApp.httpService.initializeTickets("login success"))
			.catch(logger.e);
	}

	public get(path: string) {
		return this.http.get(path, apiHeaders)
			.pipe(
				httpRetry({
					takeCount: 3,
					interval: 1000,
					intervalRate: 1.3,
				}),
				map((data: any) => data && data.result ? data.result : data),
				timeout(ENV.timeout)
			);
	}

	public put(where, what: object, ih?: vvsBridge.IImportantHeaders) {
		if (typeof what === "string") {
			return throwError("Unsupported type at HttpService.put@345,63");
		}

		return this.http
			.put(this.getAPI(where), what, apiHeaders)
			.pipe(
				map((data: any) => {
					if (data && data.result && (data.result as any).updates) {
						setTimeout(() => {
							this.vvsApp.doSync("http-service.put", (data.result as any).updates);
						}, 1000);
					}
					return data && data.result ? data.result : data;
				}),
				// timeout(ENV.timeout)
			);
	}


	// @Debounce(250)
	public presentPasswordAlert(where?: endpoints.END_POINT, what?: object): Promise<void | boolean> {

		const { name, id } = this.vvsApp.getActivePageName();

		if (name == "select-search" || id == "select-search") {
			this.vvsApp.getActiveNav().setRoot(pages.login);
			return;
		}

		// logger.info("*****************", this.vvsApp.appNav.get)
		logger.info("*****************", this.vvsApp.getActiveNav());
		this.vvsApp.dismissLoading('');
		// debugger;
		if (this.passwordShowing === true) {
			return;
		}
		this.passwordShowing = true;
		logger.i("presentPasswordAlert", this.passwordShowing + "");
		if (isEmpty(this.vvsApp.user)) {
			this.vvsApp.getActiveNav().setRoot(pages.login);
			return;
		}
		const title: string = `Hi ${this.vvsApp.user.userFirstName}, please re-enter your password.`;
		const inputs = [
			{
				name: "password",
				placeholder: "Enter you password",
				type: 'password',
				min: 6
			}
		];
		return new Promise((resolve, reject) => {

			const buttons = [
				{
					text: t.SIGN_OUT,
					// role: cf.cancel,
					handler: (data) => {
						setTimeout(() => this.passwordShowing = false, 1000);
						logger.l("CANCEL_CLICKED", data);
						this.vvsApp.logout(this.vvsApp.getActiveNav(), false);
						resolve(false);
					}
				},
				{
					text: t.SUBMIT,
					handler: (data) => {
						setTimeout(() => this.passwordShowing = false, 1000);

						if (toString(data.password).length < 6) {
							this.vvsApp.presentSingleAlert(
								"Password is not valid, please try again!",
								undefined, undefined, undefined,
								() => this.presentPasswordAlert(where, what)
							);

							resolve(true);
						} else {
							resolve(me.unauthorizedHandler(data.password));
						}
					}
				}
			];

			logger.i("pre me.vvsApp.presentAlertWithInput(title, inputs, buttons)");
			me.vvsApp.presentAlertWithInput(
				title,
				inputs,
				buttons,
				undefined,
				() => {
					this.passwordShowing = false;
					setTimeout(() => this.passwordShowing = false, 1000);
				}
			);
			logger.i("post me.vvsApp.presentAlertWithInput(title, inputs, buttons)");
		});
		// .catch(logger.error)
		// .then( () => {
		// 	debugger;
		// 	this.passwordShowing = false;
		// 	setTimeout( () => this.passwordShowing = false , 1000);
		// });

	}


	/**
	 * @method post
	 * @param  {END_POINT}          what  the data to post
	 * @param  {string}             where the endpoint to post
	 * @return {Observable<any>}       [description]
	 */
	private post<T>(where: endpoints.END_POINT, what?: object, _timeout?: number, customIgnoreCodes?: number[]): Observable<T> {
		if (typeof what === "string") {
			return throwError("Unsupported type at HttpService.post@345,63");
		}

		if (what) {
			(what as any).lastSync = LocalStorageService.getLastSync();
		}

		if (isEmpty(what) || (isEmpty((what as any).lastSync) && where == endpoints.DoSync)) {
			return throwError("DoSync can't be called with no lastSync");
		}
		console.log("ahiya check karva gayu")
		if ([
			endpoints.CheckIn,
			endpoints.SyncRoomNumber,
			endpoints.getSummaryDetails,
			endpoints.RCheckIn,
			endpoints.CheckOut,
			endpoints.Park,
			endpoints.Pull,
			endpoints.PullRequest,
			endpoints.PayWithCard,
			endpoints.PayWithCash,
			endpoints.PayWithComp,
			endpoints.PayWithVoucher,
		].includes(where)) {
			console.log("if sachi pdi")
			if (!(what as any).resend && !(what as any).pushPay /* || isNil( (what as any).pushPay.manual) */ || !(what as any).pushPay.ticketType) {
				// debugger;
				logger.info("manual", { what, pushPay: (what as any).pushPay, });
				this.vvsApp.presentSingleAlert("Opps. pushPay is required you bitch!");
				return throwError("Opps. pushPay is required you bitch!");
			}
		}

		return this.http
			.post(this.getAPI(where), what, apiHeaders)
			.pipe(
				httpRetry({
					takeCount: 3,
					interval: 1000,
					intervalRate: 1.3,
					customIgnoreCodes
				}),
				map((data: any) => {
					if (data && data.result && (data.result as any).updates) {
						setTimeout(() => {
							if (where != endpoints.SignOut) {
								this.vvsApp.doSync("http-service.post", (data.result as any).updates);
							}
						}, 1000);
					}

					if (where != endpoints.ChatInsert) {
						Taptic.success();
					}

					return data && data.result ? data.result : data;
				}),
				timeout(_timeout || ENV.timeout),
				// catchError( (error: HttpErrorResponse) => {
				//     if (error) {
				//         if (error.status === 401) {
				//             me.presentPasswordAlert(where, what);
				//         } else if (error.status === 0) {
				//             me.vvsApp.presentSingleAlert("Something went wrong when communicating with server!");
				//         }
				//     }

				//     return me.hE(error, { where, what });
				// })
			);
	}

	private unauthorizedHandler(password: string, where?: any, what?: any): Promise<any> {

		const cred: vvsBridge.ILoginCredentials = {} as any;

		return this.lss.getLoginUser()
			.then((loginUser) => {

				if (!loginUser || !loginUser.CurrentProperty || !loginUser.CurrentProperty.propertyID) {
					throw new Error("LoginUser must never be undefined. It must have a CurrentProperty with an id");
				}

				cred.force = 0;
				cred.username = loginUser.username;
				cred.password = password;

				cred.refresh = 1;
				cred.propertyID = loginUser.CurrentProperty.propertyID;
			})
			.then(() => {
				return new Promise((resolve: any, reject) => {
					me.authenticate(cred, true)
						.subscribe((_data: vvsBridge.ILoginSuccess) => {
							// logger.debug();
							if (_data && _data.code) {

								switch (_data.code) {

									case CodeMessages.Success.code:
										this.vvsApp.presentSingleAlert(t.SIGNED_IN_SUCCESSFULLY, undefined, undefined, 2000);
										resolve(this.onLoginSuccess("unauthorizedHandler", _data, true));
										// cb && cb(_data.user.Authorization);
										return CodeMessages.Success;
									// return this.post(where, what);

									case CodeMessages.AuthenticationFailed.code:
										this.vvsApp.presentSingleAlert(CodeMessages.AuthenticationFailed.message + "\nTry again!");
										resolve();
										return CodeMessages.AuthenticationFailed;

									// case CodeMessages.UserAlreadySignedIn.code:
									//     return CodeMessages.UserAlreadySignedIn;

								}

							} else {
								this.vvsApp.presentSingleAlert(CodeMessages.SomethingWentWrong.message);
								return CodeMessages.SomethingWentWrong;
							}
						},
							logger.e
						);
				});
			})
			.catch(logger.error);

	}

	// @Throttle(1000)
	private _initializeTickets(): Observable<void> {
		this.vvsApp.presentLoading("", 5000);
		// let i = 1000;
		return this
			.get(this.getAPI(endpoints.Initializer))
			.pipe(
				httpRetry({
					takeCount: 3,
					interval: 1000,
					intervalRate: 1.3
				}),
				map(
					(data) => {
						this.lss.handleAllTicketData(data as any);
						this.vvsApp.dismissLoading('init');
					},
					(error) => {
						this.vvsApp.dismissLoading('init-error');
						this.vvsApp.toast("Could not refresh");
						// this.hE(error);
					}
				)
			);
	}

	private getAPI(where: string) {
		// const url = (this.vvsApp.apiHost || ENV.apiHost) + "/" + where;

		// return (this.vvsApp.apiHost || ENV.apiHost) + "/" + where;

		return `${ENV.BASE_ENDPOINT}/${EnvService.get()}/${where}`;
		// return `${ENV.BASE_ENDPOINT}${ENV.CURRENT_ENV == "local" ? "" : ("/"+ENV.CURRENT_ENV)}/${where}`;
	}
}
