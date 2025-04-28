import { e2eUtil } from "../../../../../util/util.e2e-class";

import {InputBase} from "../../input-base.e2e-class";
class VinNumberItem extends InputBase {


}
export const vinNumberItem = new VinNumberItem("car-step ion-item", e2eUtil.getCarFields().vinNumber);
