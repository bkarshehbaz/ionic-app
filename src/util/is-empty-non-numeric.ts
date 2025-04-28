import { isEmpty, isNumber } from 'lodash';

export const isEmptyNonNumeric = (value, key) => {
    return isNumber(value) ? false
         : isEmpty(value) ? true
         : false;
};

// import { filter, forEach, includes, isNil, map, toString, trim, values, isNumber, isEmpty } from 'lodash';


// import { awsBaseUrl, carplaceholder, valid } from "../constants/constants";

// import * as cf from "../constants/constant-fields";
// import * as t from "../constants/constant-titles";

// import moment from "moment";


// import * as vvsBridge from "vvs-bridge"; // tslint:disable-line:no-duplicate-imports
// import { NumericMap, StringMap } from "vvs-bridge";








// // export const vvsValidation = {
// //     ticketNumber: (tN) => (toStringTrim(tN).length === 5 && !Number.isNaN(Number.parseInt(tN))) || toStringTrim(tN).length === 0,
// //     customerFirstName: (fN) => toStringTrim(fN).length > 2,
// //     customerLastName: (lN) => lN && lN.trim().length > 2,
// //     customerPhone: (cP) => cP && /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(cP),
// //     roomNumber: (rN) => rN,
// //     ticketType: (ticketTypeName: string, ticketTypeID: number) => checkValue( ticketTypeName, ticketTypeID ),
// //     companyEvent: (companyEventName: string, companyEventID: number) => checkValue( companyEventName, companyEventID ),

// //     carYear: (cY) => checkValue(cY) && toStringTrim(cY).length === 4 && parseInt(cY, 10) > 1940,
// //     color: (colorName: string, colorID: number) => checkValue(colorName, colorID),
// //     isValid: (v) => v  === valid
// // };




