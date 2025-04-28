// import { isEmpty, isNumber, delay } from "lodash";
// import { CarStep } from "../car-step";
// import { valid, invalid } from "../../../../../constants/constants";
// import * as vvsValidation from '../../../../../util/vvs-validation/index';
// import { checkValue, toStringTrim } from "../../../../../util";

// export function model(fromScanner?: boolean) {

// 	let me: CarStep = this;

// 	const { modelName, modelID } = me.ticket;

// 	if ( !isEmpty(modelName) && (fromScanner || isNumber(modelID)) ) {
// 		me.validations.model = valid;
// 	} else {
// 		me.validations.model = invalid;
// 	}

//     return vvsValidation.isValid(me.validations.model);
// }
