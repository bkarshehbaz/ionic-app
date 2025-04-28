// export interface CustomerValidationInterface {
//     ticketNumber		: string;
//     customerFirstName	: string;
//     customerLastName	: string;
//     customerPhone		: string;
//     ticketType          : string;
//     roomNumber          : string;
//     companyEvent        : string;
// }

// export interface CustomerValidatorInterface {
//     ticketNumber		  : (tN?: string) => boolean;
//     customerFirstName	  : () => boolean;
//     customerLastName	  : () => boolean;
//     customerPhone		  : () => boolean;
//     ticketType            : () => boolean; // (highlight?: boolean) => boolean;
//     roomNumber            : () => boolean;
//     companyEvent          : (cE?: string) => boolean;
// }

export const ticketNumberPos:      CustomerStepPosition = 1;
export const ticketTypePos:        CustomerStepPosition = 2;
export const companyEventPos:      CustomerStepPosition = 3;
export const roomNumberPos:        CustomerStepPosition = 4;
export const customerFirstNamePos: CustomerStepPosition = 5;
export const customerLastNamePos:  CustomerStepPosition = 6;
export const customerPhonePos:     CustomerStepPosition = 7;


export type CustomerStepPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7;
