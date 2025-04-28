import { e2eUtil } from "../../../../../util/util.e2e-class";

// import InputBase from "../../input-base.e2e-class";
import {SearchablePopoverInputBase} from "./searchable-popover-inputbase";

class VehicleModelItem extends SearchablePopoverInputBase {


}
export const vehicleModelItem = new VehicleModelItem("car-step ion-item", e2eUtil.getCarFields().vehicleModel);
