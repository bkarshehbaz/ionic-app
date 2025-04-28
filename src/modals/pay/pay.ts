import { Component } from '@angular/core';

import { NavParams, ViewController, IonicPage } from 'ionic-angular';

import * as cf from  "../../constants/constant-fields";
import { Logger } from '../../providers/vvs-controller/util/logger';
import { IFullTicket } from '../../util';

const logger = Logger.get("PayComponent");

@IonicPage({
	name: "pay"
})
@Component({
    selector: "pay-component",
    templateUrl: "./pay.html"
})
export class PayComponent {

    ticket: IFullTicket;
    constructor(private navParams: NavParams, public viewCtrl: ViewController) {
        this.ticket = this.navParams.get(cf.ticket);
	}

	close() {
		this.viewCtrl.dismiss().catch(logger.error);
	}

}
