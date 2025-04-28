import { Component, Renderer2, ViewChild, ChangeDetectorRef, ViewRef } from '@angular/core';
import { Content, NavController, TextInput, IonicPage, PopoverOptions } from "ionic-angular";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import * as t from "../../constants/constant-titles";
import * as CodeMessages from "../../constants/code-messages";
import { checkValue } from "../../util/index";
import * as c from "../../constants/css-values";
import {
	ILoginCredentials,
	ILoginSuccess,
	IUser
} from "../../lib/vvs-bridge";

import { isArray, forEach } from "lodash";
import { logo } from "../../constants/logo";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { tap } from "rxjs/operators";
import { pages } from "..";
import { KeyboardService } from "../../providers/keyboard/keyboard-service";
import { IPresentConfirm } from "../../providers/vvs-controller/view/alert";
import { ENV } from "../../environments";
import { to } from "../../util/to";
import { IChannel } from "../../providers/local-storage-service/local-storage-service";
// import { EnvService } from "../../providers/env-service";
// import { Pro } from "@ionic/pro";


const logger = Logger.get("login-page");

let me: LoginPage;

@IonicPage({
	name: "login-page"
})
@Component({
	selector: "login-page",
	templateUrl: "./login-page.html"
})
export class LoginPage {

	@ViewChild(Content) content: Content;
	onKeyboardHideTimeout: any; //NodeJS.Timer;

	@ViewChild('passwordInput') passwordInput: TextInput;


	devMode: "true" | "false";

	get logo() {
		return logo;
	}

	username: string;
	password: string;
	passwordShown: boolean = false;

	onPasswordChange() {
		this.passwordShown = false;
		this.detectChanges();
	}

	detectChanges() {
		this._detectChanges();
		setTimeout( () => {
			this._detectChanges();
		});
	}

	private _detectChanges() {
		if (this.cdr && !(this.cdr as ViewRef).destroyed) {
			this.cdr.detectChanges();
		}
	}

	env = ENV;

	// isTestChannel = ENV.CURRENT_CHANNEL;

	isShown = false;

	private scrollContentElement: HTMLElement;

	// _isTestChannel: boolean = false; // "Master" | "Production" = "Production";
	// set isTestChannel(val: any) {
	// 	this._isTestChannel = val;
	// 	// this.toggleChannel();
	// }
	// get isTestChannel() {
	// 	return this._isTestChannel;
	// }

	constructor(
		public vvsApp: VVSApp,
		private navCtrl: NavController,
		private renderer: Renderer2,
		private cdr: ChangeDetectorRef,
	) {

		// this.envKey = ENV.environment;
	
		this.clearForm();

		this.initDevMode();

		me = this;
	}

	// async toggleChannel() {
	// 	// if (!this.vvsApp.isNative()) {
	// 	// 	this.vvsApp.presentSingleAlert("toggleChannel is not supported on no native devices");
	// 	// 	return;
	// 	// }
	// 	const channel = this.isTestChannel ? 'Master' : 'Production';
	// 	await to(this.vvsApp.lss._setString("CHANNEL", channel));
		
	// 	this.vvsApp.presentSingleAlert("Reload")
	// 	.then( () =>  {
	// 		window.location.reload();
	// 	});
	// }

	async initDevMode() {
		const [devMode] = await to<string>(this.vvsApp.lss._getString("DevMode", false));
		// const [channel] = await to<"Master" | "Production">(this.vvsApp.lss._getString("CHANNEL"));

		// this._isTestChannel = channel == "Master";

		this.devMode = devMode as "true"|"false";
	}

	changeEnv() {
		const alert = this.vvsApp.alertCtrl.create();
		alert.setTitle('Change Env');

		// let currentEnv = EnvService.get();

		// forEach([...ENV.ENVS, "Disable Development Mode"], (env) => {
		forEach([...ENV.CHANNELS, "Disable Development Mode"], (env) => {
			// envName, envUrl, checked: false }))
			alert.addInput({
				type: 'radio',
				label: env, // capitalize(env),
				value: env,
				checked: ENV.CURRENT_CHANNEL == env// == "prod" && env == "Master" // false
			});
		});

		// alert.addInput({
		//   type: 'radio',
		//   label: 'Blue',
		//   value: 'blue',
		//   checked: true
		// });

		alert.addButton('Cancel');
		alert.addButton({
			text: 'OK',
			handler: (_env: IChannel) => {

				if (_env == "Disable Development Mode" as any) {
					this.devMode = "false";
					this.vvsApp.lss._setString("DevMode", "false", false);
					return;
				}

				if (!_env) {
					return;
				}

				this.vvsApp.lss._setString("CHANNEL", _env, false)
				.catch(logger.error)
				.then( () => this.vvsApp.presentSingleAlert("Reload", null, null, null, () => {
					window.location.reload();
				}));
				// .catch( () => );

				// (async () => {
				// 	this.vvsApp.presentLoading("Changing environment")
				// 	await EnvService.set(this.vvsApp, _env);
				// 	KeyboardService.unsubscribe();
				// 	await new Promise( resolve => setTimeout(resolve, 1500) );
				// 	window.location.reload()
				// })();

				// logger.info("env selected", _env);
			}
		});

		alert.present().catch(logger.error);
	}

		// 		Pro.deploy.configure({
		// 			appId: ENV.IONIC_APP_ID,
		// 			channel: _env,
		// 			updateMethod: "none"
		// 		})
		// 		.then( () => {
		// 			return this.vvsApp.presentSingleAlert("channel: " + _env);
		// 		})
		// 		.then( () => {
		// 			let _options = {} as PopoverOptions;
		// 			_options.enableBackdropDismiss = false;
		// 			_options.showBackdrop = true;
		// 			this.vvsApp.presentPopover(pages.UpdatePopover, { skipCheck: true }, undefined, _options);
		// 			// return Pro.deploy.getCurrentVersion();
		// 		})
		// 		.then( (version) => {
		// 			logger.info("version", version);

		// 			if (!version) {
		// 				return "no-found" as any;
		// 			}
					
		// 			return Pro.deploy.deleteVersionById(version.versionId);
		// 		})
		// 		// .then( () => {

		// 		// })
		// 		// .then( () => Pro.deploy.checkForUpdate() )
		// 		.then( (deleted) => { // (update: CheckForUpdateResponse) => {

		// 			logger.info("deleted", deleted);
		// 			// return Pro.deploy.sync({ updateMethod: "background"});
		// 			// if (update && update.available) {

		// 			// 	logger.info("update", update)

		// 			// 	// Pro.deploy.getAvailableVersions()
		// 			// 	// .then( versions => {
		// 			// 	// 	logger.info(versions);
		// 			// 	// 	logger.info(JSON.stringify({versions}, null, 4));
		// 			// 	// });

		// 			// 	// Pro.deploy.getConfiguration()
		// 			// 	// .then( (config) => {
		// 			// 	// 	logger.info(config);
		// 			// 	// 	logger.info(JSON.stringify({config}, null, 4));
		// 			// 	// });

		// 				let _options = {} as PopoverOptions;
		// 				_options.enableBackdropDismiss = false;
		// 				_options.showBackdrop = true;
		// 				this.vvsApp.presentPopover(pages.UpdatePopover, { skipCheck: true }, undefined, _options);
		// 			// }
		// 		})
		// 		.catch( (error) => {
		// 			this.vvsApp.presentSingleAlert("Something went wrong");
		// 			logger.error(error);
		// 		});

		// 	}
		// });

		// alert.present().catch(logger.error);
	// }

	getPassText() {
		return this.passwordShown
		? (this.password || "")
		: (this.password || "").split("").map(x => "&#8226;").join(""); //"*" // "•"
	}

	togglePassType($event: KeyboardEvent) {
		this.passwordShown = !this.passwordShown;
		this.passwordInput.setFocus();
		this.detectChanges();
	}

	goToProperties() {
		this.vvsApp.lss.getLoginUser()
		.then( (user) => {
			// logger.assert(isEmpty(user), "LoginUser must have been initialized", this.vvsApp.lss.getRawValue("LoginUser"));
			return this.navCtrl.setRoot(pages.selectsearch);
		});
	}

	goToHomePage() {
		this.navCtrl.setRoot(pages.tabs);
	}

	// TODO show loading alert when the user click logins
	login(credentials?: ILoginCredentials) {

		credentials = credentials || {
			username: this.username,
			password: this.password
		};

		if (this.username == "test" && this.password == "test") {

			this.devMode = "true";
			this.clearForm();
			this.vvsApp.lss._setString("DevMode", "true", false)
			.then( () => {
				this.vvsApp.presentSingleAlert("Development Mode has been activated");
			})
			.catch(logger.error);

			return;
		}

		this.vvsApp.presentLoadingInfinite("Logging in...");

		credentials = credentials || {
			username: this.username,
			password: this.password
		};

		// if (this.username === ENV.) {

		// }

		// logger.debug();

		// https://github.com/ionic-team/ionic2-starter-aws/blob/master/src/app/app.component.ts
		// good idea
		// https://github.com/joshuamorony/ionic-jwt-authentication/blob/master/client/ionic-jwt/src/providers/auth/auth.ts
		this.vvsApp.httpService
			.authenticate(credentials)
			.subscribe((data: ILoginSuccess) => {
				// tslint:disable-next-line:no-debugger

				if (data) {

					switch (data.code) {
						case CodeMessages.Success.code:

							this.goToProperties();

							break;

						case CodeMessages.UserAlreadySignedIn.code:

							credentials.force = 1;
							this.login(credentials);

							// const options: IPresentConfirm = {
							// 	title: data.message,
							// 	message: t.logoutFromAllDev,
							// 	cancelText: t.NO,
							// 	cancelCB: () => this.clearForm(),
							// 	submitText: t.YES,
							// 	submitCB: () => {
							// 		credentials.force = 1;
							// 		this.login(credentials);
							// 	}
							// };
							// this.vvsApp.presentConfirm(options);

							break;

						default:
							this.vvsApp.presentSingleAlert(data.message, "");
					}

				}
			},
			(error) => {
				this.vvsApp.dismissLoading('login-page-error');
			});
	}

	clearForm() {
		this.username = "";
		this.password = "";
	}

	ionViewDidLoad() {
		this.vvsApp.ready()
		.then( () => this.vvsApp.lss.getLoginUser() )
		.then((user: IUser) => {
			if (
				user &&
				user.Authorization &&
				user.CurrentProperty &&
				user.CurrentProperty.propertyID
			) {
				this.goToHomePage();
			} else if (user && user.Authorization && isArray(user.properties) ) {
				this.goToProperties();
			}
		})
		.catch(logger.e);

		this.scrollContentElement = this.content.getScrollElement();
	}

	ionViewDidEnter() {
		this.addKeyboardListeners();
	}
	ionViewDidLeave() {
		this.removeKeyboardListeners();
	}

	// TODO add footer photos bar height
	addKeyboardListeners() {
		//  logger.debug("addKeyboardListeners");

		const show = KeyboardService.onShow(this.renderer)
		.pipe( tap( x => this.isShown = true) )
		.subscribe(
			(e) => this.onKeyboardShow(e),
			(e) => logger.error(e)
		);

		const hide = KeyboardService.onHide(this.renderer)
		.pipe( tap( x => this.isShown = false) )
		.subscribe(
			() => this.onKeyboardHide(),
			(e) => logger.error(e)
		);

		KeyboardService.setSubscriptions(show, hide);

	}

	removeKeyboardListeners() {
		KeyboardService.unsubscribe();
		// this.keyboardHideSub.unsubscribe();
		// this.keybaordShowSub.unsubscribe();
	}

	onKeyboardHide() {
		this.onKeyboardHideTimeout && clearTimeout(this.onKeyboardHideTimeout);
		this.onKeyboardHideTimeout = setTimeout(() => {
			this.renderer.setStyle(
				this.scrollContentElement,
				c.paddingBottom,
				c.zpx
			);
			logger.l(this.renderer);
		}, 750);
	}

	/**
	 * [onKeyboardShow description]
	 * @method onKeyboardShow
	 * @param        event event from the keyboard plugin which includes the keyboard height
	 * @return       undefined
	 */
	onKeyboardShow(event: { keyboardHeight: number }) {

		this.onKeyboardHideTimeout && clearTimeout(this.onKeyboardHideTimeout);

		if (this.isShown === true || KeyboardService.isVisible() === true) {
			return;
		}

		this.renderer.setStyle(
			this.scrollContentElement,
			c.paddingBottom,
			event.keyboardHeight + c.px
		);
		this.updateScroll("", 250);
	}
	updateScroll(from: string, timeout: number) {
		setTimeout(() => {
			this.content.scrollToBottom();
		}, timeout);
	}
}
