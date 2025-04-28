import { Component } from '@angular/core';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import * as cf from  "../../constants/constant-fields";
// import { IImageViewer } from '../../lib/vvs-bridge';
import { ILogger, Logger } from '../../providers/vvs-controller/util/logger';
import { IFullTicket, getTimeStamp } from '../../util';
import { CameraService } from '../../providers/camera-service/camera-service';
import { getPushPay } from '../../util/get-push-pay';
import { v4 as uuidv4 } from "uuid";
import { get } from 'lodash';

let logger: ILogger;

@IonicPage({
	name: "payvoucher"
})
@Component({
    selector: "pay-voucher",
    templateUrl: "./pay-voucher.html"
})
export class VoucherComponent {

    ticket: IFullTicket;
    validationImage: string;
    
    itCanLeave: boolean = false;

    constructor(public vvsApp: VVSApp,
                private viewCtrl: ViewController,
                private navParams: NavParams) {

		logger = Logger.get(VoucherComponent.name);
		this.ticket = this.navParams.get(cf.ticket);
    }

    public submit(event: any) {
        this.vvsApp.httpService
        .payWithVoucher({
            images: [{
                uri: this.validationImage,
                uid: uuidv4(),
                added: true,
                index: 0,
                date: getTimeStamp()
            }],
            currentTicketID: this.ticket.currentTicketID,
            pushPay: getPushPay(this.vvsApp, this.ticket)
        })
        .subscribe(
            (data) => {
                this.vvsApp.handlePaymentSuccessful(data, {
                    emit: () => {
                        this.itCanLeave = true;
                        this.vvsApp.dismissModal(this.viewCtrl, true, this.ticket);
                    }
                });
            },
            (error) => {
                if (get(error, "error.error.sqlMessage") == "Payment is already complete") {
                    this.itCanLeave = true;
                    this.vvsApp.dismissModal(this.viewCtrl, true, this.ticket);
                }
                // this.vvsApp.somethingWentWrong();
                logger.error(error);
            }
        );
        // debugger;

    }

    public takeValidationPhoto(ev: any) {
        logger.info("takeValidationPhoto", ev);
        // this.vvsApp.toast("Taking validation photo.");
        this.itCanLeave = true;
		CameraService.takePicture()
		.then( (uri: string) => {
            this.validationImage = uri;
            this.itCanLeave = false; 
		})
		.catch(logger.error);
    }
    
    ionViewCanLeave() {
        return this.itCanLeave;
    }

    cancel() {
        this.itCanLeave = true;
        this.viewCtrl.dismiss().then(logger.l).catch(logger.e);
	}

}
