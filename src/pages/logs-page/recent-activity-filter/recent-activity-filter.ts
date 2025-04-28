import { Component } from "@angular/core";
import { NavParams, ViewController, IonicPage } from "ionic-angular";
import { IRecentActivityType } from "../../../lib/vvs-bridge";
import { Logger } from "../../../providers/vvs-controller/util/logger";

const logger = Logger.get("RecentActivityFilterPage");

@IonicPage({
	name: "recent-activity-filter"
})
@Component({
	selector: "recent-activity-filter",
	templateUrl: "recent-activity-filter.html"
})
export class RecentActivityFilterPage {

	_toggleAll = true;
	set toggleAll(val: boolean) {
		logger.info("toggerAll", val);
		this._toggleAll = val;
		this.resetFilters(val);
	}
	get toggleAll() {
		return this._toggleAll;
	}
	recentActivityTypesArray: IRecentActivityType[] = [];

	constructor(public navParams: NavParams, public viewCtrl: ViewController) {
		this.recentActivityTypesArray = this.navParams.get("recentActivityTypesArray");
		logger.info("openFilter", this.recentActivityTypesArray);
	}

	resetFilters(val = true) {
		// reset all of the toggles to be checked
		this.recentActivityTypesArray.forEach(track => {
			track.status = val;
		});
	}

	applyFilters() {
		// Pass back a new array of track names to exclude
		this.dismiss(this.recentActivityTypesArray);
	}

	dismiss(data?: any) {
		// using the injected ViewController this page
		// can "dismiss" itself and pass back data
		this.viewCtrl.dismiss(data).catch(logger.error);
	}
}
