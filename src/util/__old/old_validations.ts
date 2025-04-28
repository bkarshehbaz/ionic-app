// import { checkValue } from './lib';
// import { trim, toString } from 'lodash';
// import { status } from '../constants/constants';

// export const vinNumber = (vN, fromScanner?:boolean) => {

//         checkValue(vN) && this.validateVIN(vN) ? ( this.validations.vinNumber = status.valid )

//     : trim(toString(vN)).length == 0 ? ( this.validations.vinNumber = "" )

//     : (this.validations.vinNumber = status.invalid );

// };

// export const make = (mKName, mKID, fromScanner?:boolean) => {

//     return this.validations.make = checkValue(mKName, fromScanner) || checkValue(mKName, mKID)
//             ? status.valid
//             : status.invalid;

// };

// export const model = (mDName, mDID, fromScanner?:boolean) => {
//     return this.validations.model = checkValue(mDName, fromScanner) || checkValue(mDName, mDID)
//             ? status.valid
//             : status.invalid;
// };

// export const manual = (m: string|number, fromScanner?:boolean) => {
//     return this.validations.manual = m == 0 || m == 1
//             ? status.valid
//             : status.invalid;
// };

// export const carYear = (y: string|number) => {
//     return this.validations.carYear = checkValue(y) && toString(y).length == 4 && parseInt(<any>y) > 1940
//             ? status.valid
//             : status.invalid;
// };

// export const color = (cName, cID) => {
//     return this.validations.color = checkValue(cName, cID)
//             ? status.valid
//             : status.invalid;
// };
