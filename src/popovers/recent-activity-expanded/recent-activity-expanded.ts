import { Component, Input } from '@angular/core';
import { NavParams, IonicPage } from 'ionic-angular';
// import { isNil } from 'lodash';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

import * as cf from '../../constants/constant-fields';

// import * as Comp from "../../constants/component-names";
import { IRecentActivityItem } from '../../lib/vvs-bridge';


import { Logger } from "../../providers/vvs-controller/util/logger";
import { pages } from '../../pages/index';
const logger = Logger.get("recent-activity-expanded");

@IonicPage({
	name: "recent-activity-expanded"
})
@Component({
    selector: "recent-activity-expanded",
    templateUrl: "./recent-activity-expanded.html"
})
export class RecentActivityExpanded {

    @Input() recentActivities: IRecentActivityItem[];
    @Input() ticketNumber: number;

    // showTitle: boolean;
    // finalRecentActivities;
    // finalTicketNumber: number;

    constructor(private navParams: NavParams,
                private vvsApp: VVSApp) {

		logger.info("recentActivities", this.recentActivities);
	}

    openGlobalSearch() {

        // // if (!this.recentActivities || (this.recentActivities && this.recentActivities.length <= 0) ) {
        // if (isEmpty(this.recentActivities)) {
        //     return;
        // }

        const data = {
           segment: cf.recent,
       	   recentActivities: this.recentActivities|| [],
           query: this.ticketNumber
        };

		// debugger;

        this.vvsApp.presentSearchModal(data, "-ra-expanded");

	}

	ngOnInit() {
		this.recentActivities = this.recentActivities || this.navParams.get(cf.recentActivities);
		this.ticketNumber = this.navParams.get(cf.ticketNumber);
		// this.showTitle = true;
	}

    // ionViewDidLoad() {
    //     logger.info("recentActivities", this.recentActivities);
    //     // if (isNil(this.recentActivities)) {
    //         this.finalRecentActivities = this.navParams.get(cf.recentActivities);
    //         this.finalTicketNumber = this.navParams.get(cf.ticketNumber);
    //         this.showTitle = true;
    //     // }
    // }

}
