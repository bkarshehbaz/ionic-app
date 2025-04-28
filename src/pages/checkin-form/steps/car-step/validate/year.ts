// import { isEmpty, isNumber, delay } from "lodash";
// import { CarStep } from "../car-step";
// import { valid, invalid } from "../../../../../constants/constants";
// import * as vvsValidation from '../../../../../util/vvs-validation/index';
// import { checkValue, toStringTrim } from "../../../../../util";
// import { color } from "./color";

// export function carYear(cY?: any, openColor?: boolean) {

// 	let me: CarStep = this;


//     const { carYear: $cY } = me.ticket;
// 	cY = cY || $cY;

//     me.validations.carYear = checkValue(cY) && toStringTrim(cY).length === 4 && parseInt(cY, 10) > 1940
//                              ? valid
//                              : invalid;

//     const $toReturn = vvsValidation.isValid(me.validations.carYear);

//     // logger.w("cY?: any >>> ", $cY, $toReturn);

//     if (openColor === true) {

//         delay( () => {
//             $toReturn
//             && !color.call(me)
//             && me.presentColorPopover();
//         }, 500);

//     }


//     return $toReturn;
// }
