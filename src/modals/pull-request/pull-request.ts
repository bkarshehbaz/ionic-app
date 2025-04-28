import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import * as cf from "../../constants/constant-fields";
import { IPull } from '../../lib/vvs-bridge';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

import { Logger } from '../../providers/vvs-controller/util/logger';
import { OperationBase } from '../operation.base';
import { get } from 'lodash';

const logger = Logger.get("pull-component");

@IonicPage({
	name: "pullRequest"
})
@Component({
    selector: "pull-request-modal",
    templateUrl: "./pull-request.html"
})
export class PullRequestModal extends OperationBase {

    constructor(public vvsApp: VVSApp,
				protected navParams: NavParams,
				private navCtrl: NavController,
                protected viewCtrl: ViewController) {

		super(vvsApp, viewCtrl, "pull-request");

        logger.l("navParams", navParams);
        this.ticket = this.navParams.get(cf.ticket);
		// this.config = this.navParams.get(cf.config);
        this.config = this.navParams.get(cf.config) || this.navParams.get(cf.cardViewConfig) || this.vvsApp.getCardConfig(this.ticket);
    }

    submit() {
        const dAta: IPull = {
            // operation: "PULL_REQUEST",
			currentTicketID: this.ticket.currentTicketID,
            userID: this.vvsApp.userID
        };
        
		dAta.pushPay = {
			manual: get(this.ticket.Car, "manual"),
			ticketType: this.ticket.TicketType.ticketTypeName,
			vehicle: this.vvsApp.lss.getVehicle(get(this.ticket.Car, "makeID"), get(this.ticket.Car, "modelID") )
		};

        this.vvsApp
            .httpService
            .pullRequest(dAta)
            .subscribe(
                (data) => {
					this.submitSuccess(data, "Pull_Request");
                },
                logger.e
            );
    }

    ionViewCanLeave() {
        return this.itCanLeave;
    }
}
