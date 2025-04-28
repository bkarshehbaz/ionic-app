import { Component } from "@angular/core";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
// import { EnvService } from "../../providers/env-service";
import { ENV } from "../../environments";

@Component({
	selector: "vvs-status-bar",
	templateUrl: "index.html"
})
export class VvsStatusBarComponent {

	get env() {
		return ENV.CURRENT_ENV; // return EnvService.get();
	}

	constructor(public vvsApp: VVSApp) {}
}
