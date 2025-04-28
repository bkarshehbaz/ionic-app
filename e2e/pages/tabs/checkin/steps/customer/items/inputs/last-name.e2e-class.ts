import { InputBase } from "../../../input-base.e2e-class";
import { E2EUtil } from "../../../../../../../util/util.e2e-class";

export class LastNameItem extends InputBase {

	constructor() {
		super("customer-step ion-item", E2EUtil.get().getCheckinFields().lastName);
	}

}
