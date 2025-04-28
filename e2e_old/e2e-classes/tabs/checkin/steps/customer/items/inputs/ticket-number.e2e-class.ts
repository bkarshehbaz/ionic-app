// import InputUtil from "../../../../../../components/input/input.e2e-class";
import { e2eUtil } from "../../../../../../util/util.e2e-class";

import { InputBase } from "../../../input-base.e2e-class";

class TicketNumberItem extends InputBase {

}
export const ticketNumberItem = new TicketNumberItem("customer-step ion-item", e2eUtil.getCheckinFields().ticketNumber);
