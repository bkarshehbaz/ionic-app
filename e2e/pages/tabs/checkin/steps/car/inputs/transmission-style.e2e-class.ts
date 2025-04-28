import { InputBase } from "../../input-base.e2e-class";
import { E2EUtil } from "../../../../../../util/util.e2e-class";

export class TransmissionStyleItem extends InputBase {

	constructor() {
		super("car-step ion-item", E2EUtil.get().getCarFields().transmissionStyle);
	}

}
