import { IProperty, IRecentActivity, IUser, NumericMap } from '../';
import * as CI from '../current-ticket/index';
import { IRecentActivityType } from '../current-ticket/recent-activity-type.interface';
// import { IRecentActivity } from '../current-ticket/index';

export interface INote {
    data: string;
    userID: number;
    date: string;
}

export interface ICoordinates {
	latitude?: string;
	longitude?: string;
}

// export interface IImage {
//     uid: string;
//     index: number;
//     timestamp: string; //NOTE: ojo take care
// }

export interface INewTicket {
    CurrentTicket : CI.ICurrentTicket[];
    Car : CI.ICar[];
    Customer : CI.ICustomer[];
    TicketSequence : CI.ITicketSequence[];
    ParkLocation : CI.IParkLocation[];
    // Transaction : CI.ITransaction[];
}

export interface ICurrentStep {
    formstep: IStep;
    timestamp: number;
}

export interface IEditing {
    editing: boolean;
    option: string;
    title: string;
}

export interface IItem {
    id: number;
    name: string;
}

export interface ISearchObject {
    ref: number;
    score: number;
}

export interface IItemWithType {
    id: number;
    name: string;
    type: string;
}

export interface IStepClass {
    customer: string;
    car: string;
    carnotes: string;
}
export type IStepName = "customer" | "car" | "carnotes";

export interface IStep {
	name: IStepName;
	displayTitle: string;
    prevStatus: boolean;
    nextStatus: boolean;
    nextTitle: string;
    index: number;
	$class: IStepClass;
	next: IStep;
}

export interface IIndexTicket {
    currentTicketID: number;
    ticketNumber: string;
    makeName: string;
    modelName: string;
    carYear: string;
    colorName: string;
    customerFirstName: string;
    customerMiddleName: string;
    customerLastName: string;
    customerPhone: string;
    ticketTypeName: string;

    eventName: string;
    // companyArrivalName: string;
    // eventPartyName: string;
}

export interface IObservableData<T> {
    category: string;
    data?: T;
}

export interface ICurrentMonthAnalyticsReturned {
    CurrentMonthCarDemographics: any[];
    CurrentMonthCustomerDemographics: any[];
    CurrentMonthCompanyArrivalDemographics: any[];
    CurrentMonthEventPartyDemographics: any[];
    CurrentMonthParkAreaDemographics: any[];
    CurrentMonthRevenueDemographics: any[];
    CurrentMonthTicketTypeDemographics: any[];
    CurrentMonthUserDemographics: any[];
}

export interface IRecentActivityItem extends IRecentActivity {
    // message: string;
    // time: string;
    // color: string;
    // index: number;

    // userID: number;
    // ticketNumber: string;

    // // fullName?: string;

    show?: boolean;

    // shownCount?: number;
}

export interface IRecentActivityGroupItem {
    time: string;
    min: number;
    max: number;
    recentActivities: NumericMap<IRecentActivityItem>;
    shownCount?: number;
}
export interface IRecentActivityObservable {
    category: string;
    data: IRecentActivityObservableData;
}

export interface IRecentActivityObservableData {
    recentActivityCount: number;
    groups: IRecentActivityGroupItem[];
    recentActivityTypes: {[key: number]: IRecentActivityType};
}

export interface ILicenseRawJSON {
    State: string;
    Fields: ILicenseFieldItem[];
}
export interface ILicenseFieldItem {
    Value: string;
    ID: string;
    Type: string;
}

export interface ICodeMessage {
    code: number;
    success: boolean;
    message: string;
}

export interface ILoginSuccess extends ICodeMessage {
    user: IUser;
    properties: IProperty[];
}
