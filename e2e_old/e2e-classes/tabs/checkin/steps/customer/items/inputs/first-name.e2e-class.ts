// import ItemUtil from "../../../../../components/item/item.e2e-class";
// import InputUtil from "../../../../../../components/input/input.e2e-class";

import { e2eUtil } from "../../../../../../util/util.e2e-class";

import {InputBase} from "../../../input-base.e2e-class";
class FirstNameItem extends InputBase {


}
export const firstNameItem = new FirstNameItem("customer-step ion-item", e2eUtil.getCheckinFields().firstName);
