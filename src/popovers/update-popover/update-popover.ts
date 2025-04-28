import { IonicPage, NavParams } from "ionic-angular";
import { Component } from "@angular/core";

// import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { Pro } from "@ionic/pro";
import { RollbarService } from "../../services/rollbar";
// import { ENV } from "../../environments";
// import { Monitoring } from "../../services/monitoring";

@IonicPage({
	name: "update-popover"
})
@Component({
    selector: "update-popover",
    templateUrl: "./update-popover.html"
})
export class UpdatePopover {

	downloadProgress = 3;
	extractProgress = 6;
	skipCheck: boolean = false;

	constructor(private navParams: NavParams) {
		this.skipCheck = this.navParams.get("skipCheck");
		if (this.skipCheck) {
			this.performUpdate();
		}
	}

	// async performManualUpdate() {
	// 	/*
	// 		Here we are going through each manual step of the update process:
	// 		Check, Download, Extract, and Redirect.

	// 		Ex: Check, Download, Extract when a user logs into your app,
	// 		but Redirect when they logout for an app that is always running
	// 		but used with multiple users (like at a doctors office).
	// 	*/

	// 	try {

	// 		const update = await Pro.deploy.checkForUpdate();

	// 		if (update.available) {
	// 			this.performUpdate();
	// 		}
	// 	} catch (err) {
	// 		// We encountered an error.
	// 		// Here's how we would log it to Ionic Pro Monitoring while also catching:
	// 		Monitoring.error(err);
	// 	}

	// }

	async performUpdate() {
		try {
			this.downloadProgress = 0;
			this.extractProgress = 0;

			await Pro.deploy.downloadUpdate((progress) => {
				// console.log(progress);
				this.downloadProgress = progress;
			});

			await Pro.deploy.extractUpdate((progress) => {
				// console.log(progress);
				this.extractProgress = progress;
			});

			// await Pro.deploy.reloadApp();

			// await Pro.deploy.downloadUpdate((progress) => {
			// 	this.downloadProgress = progress;
			// });
			await Pro.deploy.extractUpdate();
			await Pro.deploy.reloadApp();
		} catch (err) {
			RollbarService.error(err);
		}
	}

}
