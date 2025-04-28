// import { isEmpty, isNumber, delay } from "lodash";
// import { CarStep } from "../car-step";
// import { valid, invalid } from "../../../../../constants/constants";
// import * as vvsValidation from '../../../../../util/vvs-validation/index';
// import { checkValue, toStringTrim } from "../../../../../util";

// export function vinNumber(fromScanner?: boolean): boolean {

// 	let me: CarStep = this;

//     const { vinNumber: vN } = me.ticket;

//     const val = checkValue(vN) && validateVIN(vN) ? true
//               : toStringTrim(vN).length === 0 ? undefined
//               : false;

//     me.validations.vinNumber = val === true  ? valid
//                              : val === false ? invalid
//                              : "";

//     // logger.l("val === false ? false : true", val === false ? false : true, me.validations.vinNumber);
//     return true; // val === false ? false : true;
// }

// //NOTE: this function is from wikipedia
// function transliterate ($c: any) {
//     return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf($c) % 10;
// }

// function get_check_digit (vin: string) {
//     const $map = '0123456789X';
//     const $weights = '8765432X098765432';
//     let $sum = 0;
//     for (let i = 0; i < 17; ++i) {
//         $sum += transliterate(vin[i]) * $map.indexOf($weights[i]);
//     }
//     return $map[$sum % 11];
// }

// function validateVIN (vin: string) {
//     // if (vin && vin.length !== 17) return false;
//     if (vin && ( vin.length !== 17 || vin.length < 17 ) ) {
//         return false;
//     }
//     return get_check_digit(vin) === vin[8];
// }
