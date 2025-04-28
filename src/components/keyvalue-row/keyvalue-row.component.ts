import { Component, Input } from "@angular/core";

@Component({
	selector: "keyvalue-row",
	templateUrl: "./keyvalue-row.component.html"
})
export class KeyValueRowComponent {

	@Input() key: string;
	@Input() value: string;
	@Input() whitespace: "nowrap" | "normal" = "nowrap";

	@Input() lWidth = "4";
	@Input() rWidth = "8";

}
