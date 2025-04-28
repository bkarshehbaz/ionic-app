import { Component } from "@angular/core";
import {
	NavController,
	NavParams,
	ViewController,
	IonicPage
} from "ionic-angular";
import * as cf from "../../constants/constant-fields";
import { IPull } from "../../lib/vvs-bridge";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

import { Logger } from "../../providers/vvs-controller/util/logger";
import { OperationBase } from "../operation.base";
import { getPushPay } from "../../util/get-push-pay";
// import { IFullTicket } from '../../util';
// import { pages } from '../../pages';
const logger = Logger.get("pull-component");

@IonicPage({
	name: "pull"
})
@Component({
	selector: "pull-modal",
	templateUrl: "./pull.html"
})
export class PullModal extends OperationBase {
	constructor(
		public vvsApp: VVSApp,
		protected navParams: NavParams,
		private navCtrl: NavController,
		protected viewCtrl: ViewController
	) {
		super(vvsApp, viewCtrl, "pull");

		logger.l("navParams", navParams);
		this.ticket = this.navParams.get(cf.ticket);
		// this.config = this.navParams.get(cf.config);
		this.config =
			this.navParams.get(cf.config) ||
			this.navParams.get(cf.cardViewConfig) ||
			this.vvsApp.getCardConfig(this.ticket);
	}

	submit() {
		const dAta: IPull = {
			// operation: "PULL",
			currentTicketID: this.ticket.currentTicketID,
			userID: this.vvsApp.userID
		};

		dAta.pushPay = getPushPay(this.vvsApp, this.ticket);

		this.vvsApp.httpService.pull(dAta).subscribe(data => {
			this.submitSuccess(data, "Pull");
		}, logger.e);
	}

	ionViewCanLeave() {
		return this.itCanLeave;
	}
}
