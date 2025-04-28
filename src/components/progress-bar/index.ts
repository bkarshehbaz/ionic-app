import { Component, Input } from "@angular/core";

@Component({
	selector: "progress-bar",
	templateUrl: "index.html"
})
export class ProgressBarComponent {
	@Input("progress") progress;

	constructor() {}
}
