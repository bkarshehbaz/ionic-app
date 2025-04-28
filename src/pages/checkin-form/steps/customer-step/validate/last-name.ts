// import { CustomerStep } from "../customer-step";
// import { toStringTrim } from "../../../../../util";
// import { invalid, valid } from "../../../../../constants/constants";
// import { trim } from "lodash";

// export function customerLastName() {

// 	let me: CustomerStep = this;
// 	const { customerLastName, customerFamilyName } = me.ticket.licenseID;

// 	if ( toStringTrim(customerLastName).length > 1 ) {
// 		me.validations.customerLastName = valid;
// 	} else {
// 		if ( trim(customerFamilyName).length > 0 ) {
// 			me.ticket.licenseID.customerLastName = me.ticket.licenseID.customerFamilyName;
// 			me.ticket.licenseID.customerFamilyName = "";
// 			return me.validate.customerLastName();
// 		} else {
// 			me.validations.customerLastName = invalid;
// 		}
// 	}

// 	return me.validations.customerLastName === valid ? true : false;

// }
