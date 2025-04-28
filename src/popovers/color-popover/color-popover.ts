import { Component } from '@angular/core';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';

import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

import * as cf from '../../constants/constant-fields';
import { IColor } from '../../lib/vvs-bridge';

import { Logger } from '../../providers/vvs-controller/util/logger';
import { Taptic } from '../../providers/haptic-service';
const logger = Logger.get("color-popover");

@IonicPage({
	name: "color-popover"
})
@Component({
  selector: "color-popover",
  templateUrl: "./color-popover.html"
})
export class ColorPopover {

    colors: IColor[] = [];
    callback: any;
    constructor(public viewCtrl: ViewController,
                private navParams: NavParams,
                private vvsApp: VVSApp) {

        this.colors = this.navParams.get(cf.colors);
        this.callback = this.navParams.get(cf.callback);
    }

    pickColor($event: IColor) {
		Taptic.selection();
        this.callback($event);
        this.close();
    }

    close() {
        this.viewCtrl.dismiss().then().catch(logger.e);
    }

}
