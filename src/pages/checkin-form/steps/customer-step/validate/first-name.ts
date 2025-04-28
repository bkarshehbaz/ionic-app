// import { CustomerStep } from "../customer-step";
// import { ICustomerStepModel, ILicenseID } from "../../../../../lib/vvs-bridge";
// import { toStringTrim } from "../../../../../util";
// import { invalid, valid } from "../../../../../constants/constants";
// import { isEmpty } from "lodash";

// export function customerFirstName() {

// 	let me: CustomerStep = this;

// 	me.ticket = me.ticket || {} as ICustomerStepModel;
// 	me.ticket.licenseID = me.ticket.licenseID || { } as ILicenseID;
// 	const { customerFirstName } = me.ticket.licenseID;

// 	let $return;

// 	if (toStringTrim(customerFirstName).length > 1) {
// 		$return = valid;
// 	} else {
// 		$return = invalid;
// 	}

// 	me.validations.customerFirstName = $return;

// 	return $return === valid ? true : false;

// }
