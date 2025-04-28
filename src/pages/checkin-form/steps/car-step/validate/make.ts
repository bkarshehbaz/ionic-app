// import { isEmpty, isNumber } from "lodash";
// import { CarStep } from "../car-step";
// import { valid, invalid } from "../../../../../constants/constants";
// import * as vvsValidation from '../../../../../util/vvs-validation/index';

// export function make(fromScanner?: boolean) {

// 	let me: CarStep = this;

// 	const { makeName, makeID } = me.ticket;

// 	if ( !isEmpty(makeName) && (fromScanner || isNumber(makeID)) ) {
// 		me.validations.make = valid;
// 	} else {
// 		me.validations.make = invalid;
// 	}

//     return vvsValidation.isValid(me.validations.make);
// }
