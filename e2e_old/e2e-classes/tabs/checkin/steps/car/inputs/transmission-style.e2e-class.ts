
import { e2eUtil } from "../../../../../util/util.e2e-class";

import { InputBase } from "../../input-base.e2e-class";
class TransmissionStyleItem extends InputBase {


}
export const transmissionStyleItem = new TransmissionStyleItem("car-step ion-item", e2eUtil.getCarFields().transmissionStyle);
