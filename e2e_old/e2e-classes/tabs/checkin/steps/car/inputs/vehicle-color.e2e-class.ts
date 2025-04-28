
import { e2eUtil } from "../../../../../util/util.e2e-class";

import {InputBase} from "../../input-base.e2e-class";
class VehicleColorItem extends InputBase {


}
export const vehicleColorItem = new VehicleColorItem("car-step ion-item", e2eUtil.getCarFields().vehicleColor);
