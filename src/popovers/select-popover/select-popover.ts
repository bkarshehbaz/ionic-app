import { Component } from '@angular/core';

import { NavParams, ViewController, IonicPage } from 'ionic-angular';

import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

import * as cf from "../../constants/constant-fields";
import { ISelectPopoperItem } from '../../lib/vvs-bridge';

import { Logger } from '../../providers/vvs-controller/util/logger';
import { Taptic } from '../../providers/haptic-service';
const logger = Logger.get("select-popover");

@IonicPage({
	name: "select-popover"
})
@Component({
    selector: "select-popover",
    templateUrl: "./select-popover.html"
})
export class SelectPopover {

    items: ISelectPopoperItem[];
    title: string;
    callback: (val: ISelectPopoperItem) => void;

    constructor(private vvsApp: VVSApp,
                private navParams: NavParams,
                public viewCtrl: ViewController) {
        this.items = this.navParams.get(cf.items);
        this.title = this.navParams.get(cf.title);
        this.callback = this.navParams.get(cf.callback);
    }

    onItemSelected(item: ISelectPopoperItem) {
		this.callback(item);
		Taptic.selection();
        this.close();
    }

    close() {
        this.viewCtrl.dismiss().then().catch(logger.e);
    }

}
