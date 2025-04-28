import { ILicenseID } from './license-id.interface';

export interface ICustomerStepModel {
    ticketNumber: string;
    currentTicketID: number;

    roomNumber: string;
    licenseID: ILicenseID;

    customerPhone: string;
    maskCustomerPhone: string;

    ticketTypeName: string;
    ticketTypeID: number;
    ticketPrice: number;

    eventID: number;
    eventName: string;

    // companyEventName    :  string; //CompanyArrival and EventCombined
    // companyEventID      :  number;
    // companyArrivalName  :  string;
    // companyArrivalID    :  number;
    // eventPartyName      :  string;
    // eventPartyID        :  number;

    status: string;

    isHotel: number;
}

export interface ICustomerStepControl<T> {
    customerFirstName: T;
    customerLastName: T;
    ticketNumber: T; // string;
    ticketPrice: T;
    currentTicketID?: T; // number;

    roomNumber: T; // string;
    confirmation_number: T; // string;
    Email: T; // string;


    customerPhone: T; // string;
    maskCustomerPhone: T; // string;

    ticketTypeName: T; // string;
    ticketTypeID: T; // number;

    eventName: T;
    eventID: T;
    // companyEventName    :  T; // string; //CompanyArrival and EventCombined
    // companyEventID      :  T; // number;
    // companyArrivalName  :  T; // string;
    // companyArrivalID    :  T; // number;
    // eventPartyName      :  T; // string;
    // eventPartyID        :  T; // number;

    status: T; // string;

    isHotel: T; // number;
    // [key: string] 		: T;
}
