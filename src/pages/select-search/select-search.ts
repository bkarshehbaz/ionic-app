import { Component } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import * as t from '../../constants/constant-titles';
import { NavController, IonicPage } from 'ionic-angular';
import { IProperty, IUser } from '../../lib/vvs-bridge';
import { Logger } from "../../providers/vvs-controller/util/logger";
import { pages } from '../index';
import { ENV } from '../../environments';
import { IPresentConfirm } from '../../providers/vvs-controller/view/alert';

// tslint:disable-next-line: no-duplicate-imports
import { CHOOSE_A_PROPERTY } from '../../constants/constant-titles';

// import { to } from '../../util/to';
import { filter } from 'lodash';
const logger = Logger.get("SelectSearchComponent");

@IonicPage({
	name: "select-search"
})
@Component({
	selector: "select-search",
	templateUrl: "./select-search.html"
})
export class SelectSearchComponent {
	title: string = CHOOSE_A_PROPERTY;
	// itemsBackup: ISelectPopoperItem[];
	type: string;
	user: IUser;
	// properties: IProperty[];

	// isLoadingForTheFirstTime: boolean = true;

	env = ENV;

	downloadProgress = 0;

	filter = "";

	constructor(private navCtrl: NavController, public vvsApp: VVSApp) {

	}

	ionViewDidLoad() {
		this.loadProperties();
		this.vvsApp.dismissLoading('select-search');
	}

	loadProperties() {
		this.vvsApp.lss.getLoginUser()
			.then((user) => {
				if (user && user.properties) {
					this.user = user;
					this.user.properties = filter(this.user.properties, x => x.isActive == 1);
					logger.info("user", this.user);
				} else {
					this.vvsApp.presentSingleAlert("No Propeties, You are being signed out!");
					this.vvsApp.logout(this.navCtrl, false);
				}
			});
	}

	// channel: any;
	// async loadChannel() {
	// 	const [channel] = await to<"Master" | "Production">(this.vvsApp.lss._getString("CHANNEL"));
	// 	this.channel = channel || "Production";	
	// }

	onPropertySelected(selectedProperty: IProperty) {

		const title = t.ARE_YOU_SURE_YOU_WANT_TO_CHOOSE_BLANK + selectedProperty.propertyName + '?';

		const options: IPresentConfirm = {
			title,
			message: "",
			cancelText: t.NO,
			submitText: t.YES,
			submitCB: () => {
				localStorage.setItem("selectedProperty", JSON.stringify(selectedProperty));
				this.vvsApp.goToHomeForTheFirstTime(this.navCtrl, selectedProperty);
			}
		};

		this.vvsApp.presentConfirm(options);
	}

	logout() {
		this.vvsApp
			.logout(this.navCtrl)
			.then(() => this.setRootLogin())
			.catch(logger.error);
	}

	private setRootLogin = () =>
		this.navCtrl.setRoot(pages.login)

	// private setRootTabsAndPropertySelected = () =>
	// 	this.navCtrl
	// 		.setRoot(pages.tabs)
	// 		.then( () => this.vvsApp.reactive.onPropertySelected() )

	// private popToRootAndLogin = () =>
	// 	this.navCtrl.popToRoot().then( () => this.setRootLogin() )

}
