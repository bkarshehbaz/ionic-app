
import { e2eUtil } from "../../../../../util/util.e2e-class";

// import InputBase from "../../input-base.e2e-class";

// import SearchablePopoverUtil from "../searchable-popover/searchable-popover.e2e-class";

import { SearchablePopoverInputBase } from "./searchable-popover-inputbase";

class VehicleMakeItem extends SearchablePopoverInputBase {

}
export const vehicleMakeItem = new VehicleMakeItem("car-step ion-item", e2eUtil.getCarFields().vehicleMake);
