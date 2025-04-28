// tslint:disable:no-redundant-jsdoc
import { ComponentFactory, ErrorHandler, Injectable, EventEmitter } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { CardIO } from '@ionic-native/card-io/ngx';
import { Device } from '@ionic-native/device/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { Storage } from "@ionic/storage";
import * as IA from 'ionic-angular';
import { memoize, delay as _delay, map as _map, isEmpty, toString, isArray, cloneDeep, isBoolean, filter, forEach } from "lodash";
import { Subject, of, interval } from 'rxjs';
import * as t from '../../constants/constant-titles';
import * as cf from "../../constants/constant-fields";

import { ENV } from "../../environments/index";
import { TicketItemOptions } from "../../pages/home/ticket-item-options/ticket-item-options";
import { IRecentActivityItemClick } from '../../pages/logs-page/recent-activity-item/recent-activity-item.options';
import { IFullTicket } from '../../util/process-full-ticket';
// import { _parkInit } from './util/park-init';
// import { _presentParkModal } from './util/present-park-modal';

// import { CardIOService } from "../card-io-service/card-io-service";
import { HttpService } from "../http-service/http-service";
import { LocalStorageService } from "../local-storage-service/local-storage-service";
// import { ManateeService } from "../manatee-scanner/manatee-scanner";
import { SearchService } from '../search-service/search-service';

import { HttpClient } from '@angular/common/http';

import * as vvsBridge from '../../lib/vvs-bridge';
// tslint:disable:no-duplicate-imports
import { IUser, IColor, IImage, ICoordinates, StringMap, ILicenseID, IMake, IModel } from '../../lib/vvs-bridge';
// import * as ClientInterfaces from '../../lib/vvs-bridge/ionic';
import { _getCardConfig } from './util/get-card-config';
import { _getLocation } from './util/get-location';
import { Logger } from './util/logger';
import { _logout } from './util/logout';
import { _presentEditOptions } from './util/present-edit-options';
import { _presentSelectPopover } from './util/present-select-popover';
// tslint:enable:no-duplicate-imports

// import { debounceTime } from 'rxjs/operators/debounceTime';
// import { mergeMap } from 'rxjs/operators/mergeMap';

import { AblyService, IAblyUpdate } from '../ably-service';
import { AlertInputOptions } from 'ionic-angular/umd/components/alert/alert-options';
import { parseJSON } from '../../util/parse-json';
import { ActionSheet } from '@ionic-native/action-sheet/ngx';
import { Pro } from '@ionic/pro';
import { pages } from '../../pages/index';
import { _toast } from './view/toast';
import { _presentLoading, _presentLoadingInfinite, _dismissLoading } from './view/loading';
import { _presentPopover } from './view/popover';
import { _presentAlertWithInput, _presentConfirm, IPresentConfirm } from './view/alert';
import { _presentModal } from './view/modal';
import { _presentActionSheet } from './view/action-sheet';
import { CameraService } from '../camera-service/camera-service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Throttle, Debounce, Memoize, } from 'lodash-decorators';
// import { of } from 'rxjs';
import { KeyboardService } from '../keyboard/keyboard-service';
// import { ImageLoaderConfig } from 'ionic-image-loader';

// tslint:disable-next-line:no-duplicate-imports
import { PickerController, PickerOptions, PickerColumn } from 'ionic-angular';
import { ReactiveService } from '../rxjs-service';
import { BadgeService } from '../badge-service';
import { ModalService } from '../../modals/modal.service';
import { PushNotificationService } from '../../services/push-notification/push-notification.provider';
import { Taptic } from '../haptic-service';
// import { StorageKey } from '../local-storage-service/local-storage-service.base';
import { RollbarService } from '../../services/rollbar';
// import { EnvService } from '../env-service';
import { SomethingWentWrong } from '../../constants/code-messages';
import { TierService } from '../tier-service/tier-service';
import { mergeMap, debounceTime } from 'rxjs/operators';
import { CheckForUpdateResponse } from 'cordova-plugin-ionic/dist/IonicCordova';
import { OneSignal } from '@ionic-native/onesignal/ngx';

const logger = Logger.get("vvs-controller");

export interface IMakeModelResult {
	make: IMake;
	model: IModel;
}

export type IActions =
	"rcheckin" |
	"pay" |
	"checkout" |
	"pull" |
	"park" |
	"parkCancel" |
	"details" |
	"recover" |
	"pullRequest" |
	"edit" |
	"add_car" |
	"resendEclaim";

let me: VVSApp;

/*
  Generated class for the VVSApp provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VVSApp {

	static instance: VVSApp;

	me = this;

	_isAndroid: boolean;
	hasResumed = true;

	ticketItemOptions: ComponentFactory<TicketItemOptions>;

	platforms: string[];

	popovers: StringMap<IA.Popover> = {};

	public errors: any[] = [];

	public newTicketNumberFromScan: {
		ticketNumber?: string,
		license: ILicenseID
	} = {} as any;

	public reactive: ReactiveService;
	public lss: LocalStorageService;
	public httpService: HttpService;
	// public manatee: ManateeService;
	// public cardIOService: CardIOService;
	public searchService: SearchService;
	public tierService: TierService;

	appNav: IA.Nav;

	logOFF = false;

	actions = {
		rcheckin: (ticket: IFullTicket) => ModalService.presentRCheckin(this, ticket),
		pay: (ticket: IFullTicket) => this.presentPayPopover(ticket), // this.payInit(ticket),
		checkout: (ticket: IFullTicket) => ModalService.presentCheckout(this, ticket), // this.checkOutInit(ticket),
		pull: (ticket: IFullTicket) => ModalService.presentPull(this, ticket), // this.pullInit(ticket),
		pullRequest: (ticket: IFullTicket) => ModalService.presentPullRequest(this, ticket),
		park: (ticket: IFullTicket) => ModalService.presentPark(this, ticket), // this.parkInit(ticket),
		parkCancel: (ticket: IFullTicket) => this.httpService.parkCancel(ticket),
		details: (ticket: IFullTicket) => this.openTicket(ticket),
		recover: (ticket: IFullTicket) => this.recover(ticket),
		edit: (ticket: IFullTicket, from: "modal") => _presentEditOptions(this, ticket, from),
		add_car: (ticket: IFullTicket, from?: "modal") => this.addCar(ticket, from),
		resendEclaim: (ticket: IFullTicket) => this.resendEclaim(ticket),
	};

	currentAlerts: StringMap<IA.Alert> = {};

	comingFromReviewTicket: boolean;
	lastNotifyForm: number;
	ticketOptionSubject: Subject<IFullTicket> = new Subject<IFullTicket>();
	recentActivityBadge: BadgeService;
	chatBadge: BadgeService;
	loadingObserver: Subject<{ show: boolean, content?: string }> = new Subject();
	// tabs: { observer?: Observer<any>, observable?: Observable<any> } = {};
	tabsRef: IA.Tabs;
	homeInOut: Subject<number> = new Subject<number>();
	// apiHost: string;

	public ably: AblyService; // PubNubService;


	__user: IUser;
	get user() {
		if (this.__user && this.__user.userID) {
			return this.__user;
		}

		return this.__user = this.lss.getRawValue("LoginUser"); // this.lss.getAsyncLoginUser() || {} as IUser;
	}
	get stage() {
		return this.user.stage || "";
	}

	get property(): vvsBridge.IProperty {
		const user = this.user;
		if (user && user.CurrentProperty) {
			return user.CurrentProperty;
		} else {
			return {} as vvsBridge.IProperty;
		}
	}
	get propertyID() {
		const id = this.property.propertyID;
		this.tierService.observer.next(id);
		return id;
	}

	get authToken(): string {
		const user = this.user;
		if (user && user.Authorization) {
			return user.Authorization;
		} else {
			return "";
		}
	}
	get userID(): number {
		const user = this.user;
		if (user && user.userID) {
			return user.userID;
		}
		// return this.user.userID;
	}

	get propertyS3Path() {
		return `${ENV.VVSPHOTOS_API}/${this.stage}/${this.propertyID}`;
	}

	// tslint:disable-next-line: member-ordering
	_isNative: boolean;

	busyModeSubject = new Subject<boolean>();
	// tslint:disable-next-line: member-ordering

	// private static instance: VVSApp;
	// public static getInstance() {
	// 	return VVSApp.instance;
	// }

	// tslint:disable-next-line: member-ordering
	constructor(
		public barcodeScanner: BarcodeScanner,

		public app: IA.App,
		public storage: Storage,
		public cardIO: CardIO,
		public device: Device,
		public errorHandler: ErrorHandler,
		public http: HttpClient,
		public toastCtrl: IA.ToastController,
		public actionSheetCtrl: IA.ActionSheetController,
		public actionSheet: ActionSheet,
		public popoverCtrl: IA.PopoverController,
		// private loadingCtrl: IA.LoadingController,
		public alertCtrl: IA.AlertController,
		public menuCtrl: IA.MenuController,
		public modalCtrl: IA.ModalController,
		public platform: IA.Platform,
		private keyboard: Keyboard,
		public camera: Camera,
		public geolocation: Geolocation,
		public taptic: TapticEngine,
		// public imgLC: ImageLoaderConfig,
		// private imgLoader: ImageLoader,
		private statusbar: StatusBar,
		private splashScreen: SplashScreen,
		public oneSignal: OneSignal,
		private pickerCtrl: PickerController,
	) {

		// VVSApp.instance = this;
		me = this;
		RollbarService.app = this;
		VVSApp.instance = this;

		logger.i(this.errors);

		// this.tabs.observable = new Observable( (obs: Observer<any>) => {
		//     this.tabs.observer = obs;
		// });

		this.loadingObserver.pipe(
			debounceTime(250)
		);

		// this.configImageLoader();

		this.configApp();

		this.initProviders();

		this.setAutoRefresh();

	}

	handlePaymentSuccessful(data: any, cancel: EventEmitter<boolean> | { emit: () => void }) {
		// debugger;
		if (data && data.updates && data.updates.CurrentTicket && data.RecentActivity) {
			this.ably
				.update("PAY_CARD", data as IAblyUpdate)
				.then(() => {
					this.presentSingleAlert("Success", undefined, undefined, 3000, () => {
						cancel.emit();
					}, false);
				})
				.catch((reason: any) => {
					logger.error(reason);
					this.somethingWentWrong();
				});
		} else {
			logger.error("handlePaymentSuccessful.data is undefined", { data });
			this.somethingWentWrong();
			// debugger;
		}
	}

	setAutoRefresh() {
		this.platform.pause
			.subscribe(() => {
				this.hasResumed = false;
			});

		interval(300000) // minutes
			.subscribe(() => {
				if (this.hasResumed) {
					if (this.userID) {
						this.httpService.doSync();
					}
				}
			});
	}

	doSync(from: string, data: vvsBridge.IInitialize) {

		if (isEmpty(data)) {
			logger.info("doSync empty", data);
			return;
		}

		logger.assert(isEmpty(data.lastSync), "lastSync must never be empty");

		if (isEmpty(data.lastSync)) {
			logger.error("lastSync must never be empty", from);
			return;
		}

		const promises: Promise<any>[] = [];

		promises.push(
			this.lss.setLastSync(data.lastSync)
		);

		if (!isEmpty(data.Chat)) {
			promises.push(
				this.lss.updateChatData(...data.Chat)
			);
		}

		if (!isEmpty(data.CurrentTicket)) {
			promises.push(
				this.lss.updateCurrentTicketData("doSync", ...data.CurrentTicket)
			);
		}

		if (!isEmpty(data.RecentActivity)) {
			promises.push(
				this.lss.updateRecentActivityData(...data.RecentActivity)
			);
		}

		// debugger;

		if (!isEmpty(data.ParkLocation)) {
			// debugger;
			if (isArray(data.ParkLocation)) {
				data.ParkLocation.map(x => {
					promises.push(
						this.lss
							.updateCurrentTicketData(
								"doSync: " + from,
								{
									currentTicketID: x.currentTicketID,
									TicketSequence: {
										ParkLocation: x
									} // ITicketSequence
								} as any
							)
					);
				});
			} else {
				promises.push(
					this.lss
						.updateCurrentTicketData(
							"doSync: " + from,
							{
								currentTicketID: data.ParkLocation.currentTicketID,
								TicketSequence: {
									ParkLocation: data.ParkLocation
								} // ITicketSequence
							} as any
						)
				);
			}
		}

		return Promise.all(promises)
			.then(() => {
				logger.info("all promises resolved", cloneDeep(data));
				if (data.CurrentTicket) {
					setTimeout(() =>
						this.reactive.sendUpdatedTickets(
							..._map(data.CurrentTicket, x => x.currentTicketID)
						),
						250);
				}
				if (data.RecentActivity) {
					this.reactive.addRecentBadge(...data.RecentActivity);
				}
				if (data.Chat) {
					this.reactive.addChatBadge(...data.Chat);
				}
			});

	}

	getCurrentTab(): number {
		return this.tabsRef && this.tabsRef.getSelected() ? this.tabsRef.getSelected().index : -1;
	}

	preloadImages(...urls: string[]) {
		if (!ENV.isNative) {
			return Promise.resolve();
		}
		// logger.info("preloadImages", urls, this.imgLoader);
		// return Promise.all( urls.map( url => this.imgLoader.preload(url) ) ).catch( error => error);
	}

	configApp() {
		this.ready()
			// .then( () => Pro.deploy.getCurrentVersion() ) // Get live update info
			// .then((res: ISnapshotInfo) => this.presentSingleAlert(JSON.stringify(res, null, 3), "deploy info") )
			.then((source) => {

				// this.imgLoader.clearCache();
				// this.imgLC.

				// this.presentSingleAlert("File.installed(): " + File.installed());
				this.isNative();
				CameraService.setCamera(this.camera);
				KeyboardService.set(this.keyboard);

				this.platforms = this.platform.platforms();

				return this.lss._getString("Environment", false);
			})
			// .then( (env: IEnv = {} as IEnv) => {
			// 	this.apiHost = !isEmpty(env.envUrl) ? env.envUrl : ENV.apiHost;
			// })
			// .then( (env: IEnv) => EnvService.set(this, env) )
			.catch(logger.error)
			.then(() => {
				// this.dealWithTheEditingForm();
				// this.dealWithRootPage();


				this.hideSplashScreen();

				// this.statusbar.styleDefault();
				this.statusbar.overlaysWebView(true);
				// this.statusbar.backgroundColorByHexString('#ffffff');

				this.statusbar.show();

				// this.statusbar.styleLightContent();
				// this.manatee.init();
			})
			.catch(logger.error)
			// .then( () => this.keyboard.hideKeyboardAccessoryBar(false) )
			.then(() => {
				if (!this.isNative()) {
					return;
				}
				this.keyboard.hideFormAccessoryBar(false);
				// this.keyboard.setResizeMode();

				// isFunction((this.keyboard as any).disableScroll) && (this.keyboard as any).disableScroll(true);
			})
			// .then( () => this.keyboard.setResizeMode(null) )
			.then(() => this.getCurrentLocation())
			.catch(logger.e)
			.then(() => {
				this.platform.resume
					.subscribe(
						() => {
							this.hasResumed = true;
							this.httpService.doSync();
							const page = this.getActivePage();
							page
								&& page.instance
								&& page.instance.ionViewDidEnter
								&& page.instance.ionViewDidEnter();
						},
						(error: any) => {
							logger.error(error);
						}
					);
			});
	}

	private hideSplashScreen() {
		setTimeout(() => {
			try {
				this.splashScreen.hide();
			} catch (e) {
				alert("e error: " + e && e.message ? e.message : e);
				try {
					(navigator as any).splashscreen.hide();
				} catch (e2) {
					alert("e2 error: " + e2 && e2.message ? e2.message : e2);
				}
			}
		}, 500);
	}

	triggerUpdate() {

		if (this.isNative()) {
			// if (this.isNative() && !this.device.isVirtual ) {

			Pro.init(ENV.IONIC_APP_ID, {
				appVersion: ENV.iosBuildVersion,
			});

			return this.lss._getString("CHANNEL", false)
				.then((channel: "Master" | "Production") => {
					return Pro.deploy.configure({
						appId: ENV.IONIC_APP_ID,
						channel: channel || ENV.CURRENT_CHANNEL, // : <IChannel>(ENV.CURRENT_ENV == "prod" ? "Master" : ENV.CURRENT_ENV),
						updateMethod: "none"
					});
				})
				.then(() => Pro.deploy.checkForUpdate())
				.then((update: CheckForUpdateResponse) => {
					// if (update) {
					// 	alert("update.build: " + JSON.stringify(update));
					// }
					if (update && update.available) {

						const options: IPresentConfirm = {
							title: "We found an update",
							message: "Would you like to update?",
							submitCB: () => {
								const _options = {} as IA.PopoverOptions;
								_options.enableBackdropDismiss = false;
								_options.showBackdrop = true;
								this.presentPopover(pages.UpdatePopover, { skipCheck: true }, undefined, _options);
							},
							submitText: t.AGREE,
							cancelText: t.DISAGREE
						};
						this.presentConfirm(options);
					} else {
						if (this.isNative()) {

							const { name, id } = this.getActivePageName();

							if (name === "login-page" || id === "login-page" || name === "select-search" || id === "select-search") {
								return;
							}

							setTimeout(() => {
								this.httpService.doSync();
							}, 2500);
						}
					}
				})
				.catch(logger.error);

		} else {
			logger.info("triggerUpdate called on browser");
		}

		// else {
		// let options = {} as IA.PopoverOptions;
		// options.enableBackdropDismiss = false;
		// options.showBackdrop = true;
		// options.cssClass = "update-popover-class"
		// this.presentPopover(pages.UpdatePopover, { skipCheck: true }, undefined, options);
		// }

	}

	async refreshData() {
		try {
			const tickets = await me.lss.getCurrentTicketData();
			me.reactive.sendHomeTickets(tickets);
			me.reactive.sendRecentActivities();
			me.reactive.sendMessagesToChat();
		} catch (e) {
			RollbarService.error(e);
		}
	}

	public $presentSingleAlert({
		title, subTitle, buttons, autoDismissDelay, onDidDismiss
	}: {
		title: string, subTitle?: string, buttons?: string[], autoDismissDelay?: number, onDidDismiss?: any
	}) {
		this.presentSingleAlert(title, subTitle, buttons, autoDismissDelay, onDidDismiss);
	}

	public syncRoomNumber() {
		console.log("enter loginInStay")
		const payload = {
			"ticketNumber": "104339",
			"ticketTypeID": 1000000020,
			"customerPhone": "7096078943",
			"manual": "0",
			"makeID": 1000000001,
			"modelID": 1000000018,
			"colorID": 1000000008,
			"carYear": "2022",
			"licensePlate": "GJ05SC0506",
			"notes": [
				{
					"data": "Added one",
					"userID": 1000000046,
					"date": "Wed Dec 11 2024 06:57:34 GMT+0000"
				}
			],
			"userID": 1000000046,
			"username": "Cbharat",
			"customerFirstName": "Vaghasiya",
			"customerLastName": "Ravi",
			"uuid": "e1f3fc23-43bc-43c9-8a93-9dae4bdd356d"
		}
		let roomNumber;
		this.httpService.callingLoginInStayNTouch(payload).subscribe((res: any) => {
			console.log("response is login res.result.results", res.result.results)
			if (res && res.result && res.result.results && res.result.results.length && res.result.results[0]) {
				console.log("condition true")
				if (res.result.results[0].room && res.result.results[0].room.id) {
					roomNumber = res.result.results[0].room.id;
				}
			}
			console.log("roomNumber", roomNumber);
		});
	}

	// used around 25 times
	// tslint:disable-next-line:member-ordering
	@Throttle(300)
	public presentSingleAlert(
		title: string, subTitle: string = "", buttons: string[] = ["OK"], autoDismissDelay = 0, onDidDismiss?: any, enableBackdropDismiss = true
	): void { // Promise<any> {

		if (this.currentAlerts[title]) {
			// return Promise.reject("currently presenting");
			// return Promise.resolve("currently presenting");
			logger.info("currently presenting");
			return;
		}
		this.currentAlerts[title] = true as any;

		// if (this.platform.is("cordova")) {
		// 	return this.dialogs.alert("", title).then( () => delete this.currentAlerts[title] );
		// }

		// tslint:disable-next-line: no-unused-expression
		new Promise((resolve: any) => {

			const dismiss = () => {
				if (!this.currentAlerts[title]) {
					return;
				}
				this.currentAlerts[title].dismiss()
					.catch(logger.e)
					.then(() => {
						delete this.currentAlerts[title]; // = undefined;
						setTimeout(() => this.dismissLoading('simple-alert'), 1000);
						onDidDismiss && onDidDismiss();
						resolve();
					})
					.catch(logger.e);
			};

			let timeout: any;

			this.currentAlerts[title] = this.alertCtrl.create({
				title,
				subTitle,
				enableBackdropDismiss,
				buttons: [{
					text: 'Ok',
					handler: () => {
						// user has clicked the alert button
						// begin the alert's dismiss transition

						if (timeout) {
							clearTimeout(timeout);
						}
						dismiss();

						return false;
					}
				}]
			});

			this.currentAlerts[title]
				.present()
				.then(() => {
					if (autoDismissDelay > 0) {
						timeout = setTimeout(() => dismiss(), autoDismissDelay);
					}
				}).catch(logger.e);
		});

	}

	presentSearchModal(data?: object, id?: string) {
		Taptic.light();
		return this.presentModal(pages.globalsearch, data, undefined, undefined, id);
	}

	// canTakePayments() {
	// 	return this.user.payPrivilege === 0 || isNil(this.user.payPrivilege)
	// }

	ready() {
		return this.platform.ready();
	}

	isNative() {
		return isBoolean(this._isNative) ? this._isNative : (this._isNative = this.platform.is("cordova"));
	}

	isAndroid() {
		return isBoolean(this._isAndroid) ? this._isAndroid : (this._isAndroid = this.platform.is("android"));
	}

	getColor(id: number): IColor {
		return this.lss.getColorDataAsync()[id];
	}

	// getTType(id: number): ITicketType {
	// 	return this.lss.getAsyncTicketType()[id];
	// }

	// UTILS
	public getImage = (ticketID: number, uid: string) => {
		// _getImage(ENV.S3_BUCKET, propertyID, uid)
		return `${this.propertyS3Path}/${ticketID}/${uid}`;
	}

	// tslint:disable-next-line: member-ordering
	public getChatImage = memoize(
		(chatID: number, uid: string) =>
			`${this.propertyS3Path}/chat/${chatID}/${uid}`,
		(chatID: number, uid: string) => chatID + uid
	);

	@Memoize()
	public getProfilePhoto(ticketID: number, images: IImage[]) {
		// return _getImage(ENV.S3_BUCKET, this.propertyID, t images[0].uid);

		if (typeof images === "string") {
			logger.info(JSON.stringify(images));
			images = parseJSON(images);
		}
		if (!isArray(images) || !images[0] || !images[0].uid) {
			return null;
		}

		const photo = `${this.propertyS3Path}/${ticketID}/${images[0].uid}`;

		// logger.info("profile_photo", photo);

		return photo;
	}

	getPlatform = () => this.platform;

	initProviders() {
		Taptic.setTaptic(this.taptic);

		this.ably = AblyService.get(this);
		this.lss = LocalStorageService.get(this);
		this.reactive = new ReactiveService(this);
		this.recentActivityBadge = new BadgeService(me.lss, "RecentActivityBadge");
		this.chatBadge = new BadgeService(me.lss, "ChatBadge");
		this.searchService = SearchService.get(this);
		this.tierService = TierService.get(this);
		this.httpService = HttpService.get(this);
		// this.manatee = ManateeService.get();
		// this.cardIOService = new CardIOService(this.cardIO);
	}

	setAppNav(nav: IA.Nav) {
		this.appNav = nav;
	}

	public getActiveNav(): IA.NavController {
		return this.getRootNav(); //this.app.getActiveNavs()[0];
	}

	public getRootNav(): IA.NavController/*Nav*/ {
		return this.app.getRootNavs()[0];
	}

	/**
	 * presentToast: wrapper to create toast
	 * @method presetToast
	 * @param  {string}    message  message to show in the toast
	 * @param  {number}    duration the time the toast will last
	 * @param  {string}    position [description]
	 * @return {[type]}             [description]
	 */
	public toast(
		message: string,
		duration: number = 1000,
		position: ("top" | "middle" | "bottom") = "top"
	) {
		return _toast(me, message, duration, position);
	}

	public closeMenu = () => this.menuCtrl.close().then().catch(logger.e);

	// @Debounce(250)
	presentLoading(
		content: string = "",
		duration: number = 1000,
		dismissOnPageChange: boolean = true,
		cb?: any
	): void {
		// return 
		_presentLoading(this, this.loadingObserver, content, duration, dismissOnPageChange, cb);
	}

	@Debounce(250)
	presentLoadingInfinite(content: string = ""): void {
		_presentLoadingInfinite(me.loadingObserver, content);
	}

	@Debounce(250)
	dismissLoading(from: string): void {
		logger.info("dismissLoading from ", from);
		_dismissLoading(me.loadingObserver);
	}

	somethingWentWrong() {
		this.presentSingleAlert("Something Went Wrong!");
	}

	// tslint:disable-next-line:member-ordering
	modals: StringMap<IA.Modal> = {};
	presentModal(component?: string, data?: object, onDidDismiss?: (d: boolean) => void, options = {} as IA.ModalOptions, id = "") {
		return _presentModal(me, component, data, onDidDismiss, options, id);
	}

	/**
	 * [dismissModal description]
	 * @param  {ViewController} $viewCtrl [description]
	 * @param  {boolean}        val       [description]
	 * @param  {any}            ticket    [description]
	 * @return {[type]}                   [description]
	 */
	public dismissModal($viewCtrl: IA.ViewController, $val: boolean, $ticket = {} as IFullTicket, from?: "modal") {

		// delay( () => this.dismissLoading('dismiss-modal'), 2000);

		$viewCtrl.onDidDismiss(() => {

			setTimeout(() => {
				const page = this.getActivePage();

				page
					&& page.instance
					&& page.instance.vvsViewWillReenter
					&& page.instance.vvsViewWillReenter();

				// if (page) {
				// 	debugger;
				// 	if (page.id == pages.ticketdetails) {

				// 		if (page.instance && page.instance.ionViewWillEnter) {
				// 			page.instance.ionViewWillEnter();
				// 		}

				// 	}
				// }

			}, 100);

		});

		$viewCtrl.dismiss($val)
			.then(() => {
				if ($val === true) {
					if (from === "modal") {
						return;
					}
					if (!isEmpty($ticket)) {
						this.openTicket($ticket);
					}
				}
			})
			// .then( () => this.dismissLoading('dismiss-modal-done') )
			.catch(logger.e);
	}

	public presentActionSheet(title: string, buttons: IA.ActionSheetButton[]) {
		return _presentActionSheet(me, title, buttons);
	}

	// used 2 times
	public presentAlertWithInput(title: string, inputs: AlertInputOptions[], buttons: IA.AlertButton[], defaultText = "", onDidDismiss?: any) {
		return _presentAlertWithInput(me, title, inputs, buttons, defaultText, onDidDismiss);
	}

	// used 10 times
	public presentConfirm(options: IPresentConfirm) {
		return _presentConfirm(me, options);
	}

	public presentPopover(
		component: string, data: object,
		event: Event,
		options?: IA.PopoverOptions,
		callback?: {
			onDidDismiss?: (data, role) => void,
			onWillDismiss?: (data, role) => void,
		}
	) {
		// logger.info(JSON.stringify({component, options: options || {} }, null, 4));
		return _presentPopover(me, component, data, event, options, callback);
	}

	public performOperation(val: { action: IActions, ticket: IFullTicket }) {
		this.presentLoading("", 4000);
		val = cloneDeep(val);

		logger.i("performOperation", val);

		if (val.action !== "edit" && val.action !== "pay") {
			// this.presentLoading("", 2000, true);
		}
		console.log("val.ticket", val.ticket);
		console.log("val.ticket me", me);

		this.actions[val.action].call(me, val.ticket); // (val.ticket);

	}

	getCardConfig = (fT: IFullTicket) => {
		fT.recentActivityItems = of(1).pipe(
			mergeMap(() => {
				// debugger;
				return this.lss.getRecentActivityRequiredData()
					.then(([activities, recentActivityTypes, propertyUsers, tickets]) => {
						// debugger;

						// logger.info("loading recentActivityItems", recentActivities);
						// let i = 0;

						const recents = filter(activities, activity => activity.currentTicketID == fT.currentTicketID).slice(0, 10);

						// forEach(recents, recent => {
						// 	recent.message = this.lss.getRaMessage(recent,recentActivityTypes,propertyUsers, tickets);
						// })
						this.lss.transformRecentActivities(recents, recentActivityTypes, propertyUsers, tickets);


						return recents;

						// forEach(recentActivities, (recentActivity: IRecentActivity) => {
						// 	if (recentActivity.currentTicketID === fT.currentTicketID) {

						// 		recentActivityItems.push(recentActivity);

						// 		logger.info("recentActivityItems", recentActivityItems);
						// 		i++;

						// 		if (i > 9) {
						// 			return false; // break
						// 		}

						// 		// const recentActivityType: IRecentActivityType = recentActivityTypes[recentActivity.recentActivityTypeID];

						// 		// if ( checkValue(recentActivity, recentActivity.currentTicketID, recentActivityType) ) {
						// 		// 	const currentUser = propertyUsers[recentActivity.userID];

						// 		// 	if (checkValue(currentUser)) {

						// 		// 		// const rAI = getRecentActivityItem(
						// 		// 		// 	recentActivityType,
						// 		// 		// 	recentActivity,
						// 		// 		// 	fT,
						// 		// 		// 	i
						// 		// 		// );

						// 		// 		if (rAI) {
						// 		// 			recentActivityItems.push(rAI);
						// 		// 			i++;
						// 		// 		}

						// 		// 	}
						// 		// }

						// 	}
						// });

						// return recentActivityItems;

					});
			}),
			// publishReplay(1),
			// refCount(),
			// catchError( (error) => {
			// 	logger.error(error)
			// 	return throwError(error);
			// })
		);


		return _getCardConfig(fT, me);
	}

	// parkInit = (ticket: IFullTicket) => {
	//     logger.i("opening park init", ticket);
	//     _parkInit(me, ticket);
	// }

	// parkCancel = (ticket: IFullTicket) => {
	//     me.httpService.parkCancel(ticket, (d) => {
	//         logger.l("parkCancel", d);
	//     });
	// }

	// presentParkModal = (ticket: IFullTicket) => _presentParkModal(me, ticket);

	/**** Checkout ****/

	recover(ticket: IFullTicket) {
		this.presentLoading("Recover to be implemented", 2000);
	}

	getActivePage() {
		const activeNav = this.app.getActiveNav();
		if (activeNav && activeNav.getActive) {
			return activeNav.getActive();
		}
	}

	getActivePageName(): { name: "ticket-details" | "select-search" | "login-page" | "ModalCmp", id: "ticket-details" | "select-search" | "login-page" } {
		const activePage = this.getActivePage();

		if (activePage && activePage.name) {
			logger.info("activePage.name", activePage.name);
			logger.info("activePage.id", activePage.id);

			const { name, id } = activePage;
			return { name, id } as any;
		}

		return {} as any;
	}

	/**
	 * @param ticket: IFullTicket
	 * hs
	 */
	resendEclaim(ticket: IFullTicket) {
		console.log('sakihere pushed resend', { ...ticket, resend: true })
		this.dismissLoading('resend eclaim')

		this
			.httpService
			.checkIn({ ...ticket, resend: true })
			.subscribe(
				(data) => { },
				(error) => {
					logger.error(error);
					// debugger;
				}
			);
	}
	openTicket(ticket: IFullTicket) {
		// const getActiveNav = this.app.getActiveNav();
		// if (getActiveNav && getActiveNav.getActive) {
		// 	const activePage = getActiveNav.getActive();
		// 	if (activePage && activePage.name) {
		// 		const expectedPage = pages.ticketdetails;
		// 		logger.info("openTicket", {activePage: activePage.name, expectedPage});
		// 		if (activePage.name === expectedPage) {
		// 			return;
		// 		}
		// 	}
		// }
		const { name, id } = this.getActivePageName();
		const expectedPage = pages.ticketdetails;
		logger.info("openTicket", { name, id, expectedPage });
		if (name === expectedPage || id === expectedPage) {
			return;
		}
		this.app.getActiveNav().push(pages.ticketdetails, { ticket }, { animate: true });
	}


	// presentEditOptions = (ticket: IFullTicket, from: "modal") => _presentEditOptions(this, ticket, from);

	multiFormEdit(option: string, title: string, ticket: IFullTicket, from: "modal") {
		return this.presentModal(pages.edit, { option, title, ticket, from });
	}

	goToHomeForTheFirstTime(navCtrl: IA.NavController, selectedProperty: vvsBridge.IProperty) {

		// if (!isEmpty(user)) { this.currentUser = user; }
		const user = this.user; // this.lss.getAsyncLoginUser();

		this.presentLoading(t.LOADING);

		// const { propertyID } = selectedProperty;

		this.httpService
			.insertUserToProperty(selectedProperty, user)
			// .debug()
			.subscribe(
				(data) => {
					this.dismissLoading('home-first-time');
					this.lss.setCurrentProperty(selectedProperty)
						.then(() => this.lss.setAuthorization(data.Authorization, data.AblyToken, data.ONE_SIGNAL_APP_ID))
						.then(() => {
							// debugger;
							this.ably.connect(data.AblyToken);
							PushNotificationService.get(this).init(user.stage, selectedProperty.propertyID, data.ONE_SIGNAL_APP_ID);
						})
						.then(() => this.goToHome(navCtrl, { firstTimeLogin: { value: true, loginUser: user } }))
						.then(() => this.httpService.initializeTickets("insert property at vvs-controller goToHomeFirstTime"))
						.catch((error) => {
							RollbarService.error(error);
							this.presentSingleAlert("Please try again", SomethingWentWrong.message);
							// this.presentSingleAlert(toString(error));
						})
						.then(() => this.httpService.loadImportantData())
						.then(() => this.dismissLoading('home-first-time2'));
				},
				(error) => {
					RollbarService.error(error);
					this.presentSingleAlert("Please try again", SomethingWentWrong.message);
				}
			);
	}

	goToHome(navCtrl: IA.NavController, obj: object) {
		return navCtrl.setRoot(pages.tabs, obj || {});
	}

	logout = (navCtrl: IA.NavController, confirm = true) => _logout(this, navCtrl, confirm);

	// presentSelectPopover($ev: IRecentActivityItemClick) {
	presentSelectPopover(
		navCtrl: IA.NavController,
		raIC: IRecentActivityItemClick,
		cb = (v: number) => { },
		title = "",
		allOptions = false,
		from: "search"
	) {
		_presentSelectPopover(navCtrl, me, raIC, cb, title, allOptions, from);
	}

	getCurrentLocation() {
		return this.geolocation.getCurrentPosition({} as any)
			.then((resp = {} as Geoposition) => {
				const { latitude, longitude } = resp.coords || {} as ICoordinates;
				return this.lastCurrentLocation = latitude
					? {
						latitude: toString(latitude),
						longitude: toString(longitude)
					}
					: this.lastCurrentLocation;
			})
			.catch((error) => {
				logger.error(error);
				return this.lastCurrentLocation || {};
			});
	}


	presentListPicker(list: { value: number | string, text: string }[], callback: any) {
		const options: PickerOptions = {} as PickerOptions;
		const testColumn = {} as PickerColumn;
		testColumn.name = "columnValue";
		testColumn.options = list;

		// Add a cancel and done button by default to the picker
		const defaultButtons = [
			{
				text: "Cancel",
				role: 'cancel',
				handler: () => callback && callback(false)
			},
			{
				text: "Done",
				handler: (data: any) => callback && callback(data)
			}
		];

		options.columns = [testColumn];
		options.buttons = defaultButtons;
		const picker = this.pickerCtrl.create(options);

		picker.present();
	}

	/**** Pay ****/

	private lastCurrentLocation: ICoordinates;

	private presentPayPopover(ticket: IFullTicket) {
		logger.info("presentPayPopover", ticket);

		const options: IA.PopoverOptions = { cssClass: "pay-choose-popover", showBackdrop: true };

		this.presentPopover(
			pages.pay,
			{ ticket }, {} as Event,
			options,
			{
				onDidDismiss: (data, role) => {
					this.refreshData();
				}
			}
		);

	}
	/**** Pay ****/


	private addCar(ticket: IFullTicket, from?: "modal") {
		// alert("Add Car");
		this.multiFormEdit(
			cf.car,
			t.ADD + " " + t.CAR,
			ticket,
			from
		);
	}


}
