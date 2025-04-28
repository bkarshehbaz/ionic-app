
import { SearchablePopoverInputBase } from "./searchable-popover-inputbase";
import { E2EUtil } from "../../../../../../util/util.e2e-class";

export class VehicleMakeItem extends SearchablePopoverInputBase {

	constructor() {
		super("car-step ion-item", E2EUtil.get().getCarFields().vehicleMake);
	}

}
