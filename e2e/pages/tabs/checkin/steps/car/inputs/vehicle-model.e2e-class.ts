import {SearchablePopoverInputBase} from "./searchable-popover-inputbase";
import { E2EUtil } from "../../../../../../util/util.e2e-class";

export class VehicleModelItem extends SearchablePopoverInputBase {

	constructor() {
		super("car-step ion-item", E2EUtil.get().getCarFields().vehicleModel);
	}

}
