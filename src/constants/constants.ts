
import * as FO from "../enums/filter-option.enum";

import { ISelectPopoperItem } from "../lib/vvs-bridge";
import * as cf from "./constant-fields";
import { ActionSheetButton } from "ionic-angular";

export let toPick = {
    currentTicket: [cf.ticketNumber,
                    cf.ticketTypeID,
                    cf.roomNumber,
                    cf.eventID,
                    cf.ticketNumber],
    customer: [cf.customerFirstName,
               cf.customerMiddleName,
               cf.customerLastName,
               cf.customerPhone,
               cf.dob,
               cf.eyeColor,
            //    cf.eventID,
            //    cf.companyArrivalID,
            //    cf.eventPartyID,
               cf.gender,
               cf.hairColor,
               cf.height,
               cf.isPhoneVerified,
               cf.licenseNumber,
               cf.city,
               cf.state,
               cf.streetAddress,
               cf.zipcode]
};

export let ed = {
    car: [cf.vinNumber,
          cf.colorID,
          cf.carYear,
          cf.makeID,
          cf.modelID,
          cf.manual,
          cf.electric]
};

// NOTE further improvements, we can go ahead and read 2016 Card Design Standard (3).pdf
export const licenseCodes = {
    DAC:				cf.customerFirstName,
    DBP:                cf.customerFirstName,
    DCT:                cf.customerFirstName,

    DAD:				cf.customerMiddleName,
    DBQ:                cf.customerMiddleName,

    DAB:				cf.customerLastName,
    DBO:                cf.customerLastName,
    DCS:                cf.customerLastName,

    DAQ:				cf.licenseNumber,
    DBB:				cf.dob,
    DBC:				cf.gender,
    DAY:				cf.eyeColor,
    DAZ:				cf.hairColor,
    DAV:				cf.height,
    DAL:				cf.streetAddress,
    DAN:				cf.city,
    State:			    cf.state,
    DAP:				cf.zipcode
};
// export let status: { valid: string, invalid: string} = {
//                                               valid   : "vvs-valid",
//                                               invalid : "vvs-invalid"
//                                             };

export const valid = "vvs-valid";
export const invalid = "vvs-invalid";

export const getMomentFormats = () => ({
                                          sameDay: '[Today]',
                                          nextDay: '[Tomorrow]',
                                          nextWeek: 'dddd',
                                          lastDay: '[Yesterday]',
                                          lastWeek: 'ddd, MMM D',
                                          sameElse: 'MMM DD, YYYY'
                                      });

export const selectPopoperItems: ISelectPopoperItem[] = [
	{
		name: "Open Ticket",
		id: FO.OPEN_TICKET,
		icon: "ios-open-outline"
	},
	{
		name: "Ticket Number",
		id: FO.FILTER_BY_TICKET_NUMBER,
		icon: "ios-options-outline"
	},
	{
		name: "User",
		id: FO.FILTER_BY_USER,
		icon: "ios-options-outline"
	}
];

export const Empty_Popover_Item: ISelectPopoperItem = {
	name: "No Options",
	id: FO.NO_OPTIONS,
	icon: '',
	disabled: true
};

// tslint:disable-next-line:max-line-length
export let carplaceholder = "data:image/png;base64,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";
