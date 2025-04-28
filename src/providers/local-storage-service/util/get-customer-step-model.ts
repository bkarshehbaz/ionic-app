import { VVSApp } from './../../vvs-controller/vvs-controller';
import * as cf from "../../../constants/constant-fields";
import { ICustomerStepModel, ILicenseID, ITicketType, ICalendarEvent } from '../../../lib/vvs-bridge';
import { IFullTicket } from '../../../util/process-full-ticket';
import { maskPhoneNumber } from '../../../util/mask-phone-number';
import { to } from '../../../util/to';

export const getCustomerStepModel = async(v: IFullTicket, vvsApp: VVSApp): Promise<ICustomerStepModel> => {

    const cS                              = {} as ICustomerStepModel;
    cS.currentTicketID                    = v.currentTicketID;
	cS.ticketNumber                       = v.ticketNumber;
	cS.roomNumber						  = v.roomNumber;
    cS.licenseID                          = {} as ILicenseID;
    v.Customer                            = v.Customer || {} as any;
    cS.licenseID.customerFirstName        = v.Customer.customerFirstName;
    // cS.licenseID.customerMiddleName       = toString(v.Customer.customerMiddleName);
    cS.licenseID.customerLastName         = v.Customer.customerLastName;
    // cS.licenseID.firstNameAndMiddleName   = v.customerFirstName + toString(v.customerMiddleName);
    // cS.licenseID.firstNameAndMiddleName   = v.Customer.customerFirstName;
	cS.customerPhone                      = maskPhoneNumber(v.Customer.customerPhone);

    cS.status                             = cf.editing;

    const [ ticketTypes ]                   = await to(vvsApp.lss.getTicketTypeData());
    
    if (ticketTypes && ticketTypes[v.ticketTypeID]) {
        const ttype = ticketTypes[v.ticketTypeID];

        cS.ticketTypeName                 = ttype.ticketTypeName;
        cS.ticketTypeID                   = ttype.ticketTypeID;
        cS.isHotel						  = ttype.isHotel;
    }

    const [calendarEvents]                = await to(vvsApp.lss.getCalendarEventData());

    if (v.eventID && calendarEvents && calendarEvents[v.eventID]) {
        cS.eventID = v.eventID;
        cS.eventName = calendarEvents[v.eventID].eventName;
    }

    return cS;

};
