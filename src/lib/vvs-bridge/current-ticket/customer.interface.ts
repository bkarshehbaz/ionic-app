/*
    Customer Interfaces
*/
export interface ICustomer {
    customerID: number;
    customerFirstName: string;
    customerMiddleName: string;
    customerLastName: string;
    customerPhone: string;
    isPhoneVerified: number;
    // companyArrivalID: number;
    // eventPartyID: number;
    licenseNumber: string;
    dob: string;
    gender: string;
    eyeColor: string;
    hairColor: string;
    height: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    createDate: string;
    modDate: string;

    middleNameInitial?: string;
}
