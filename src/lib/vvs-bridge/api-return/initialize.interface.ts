import { IChat } from '../chat/index';
import {
         ICar,
        //  ICompanyArrival,
         ICurrentTicket,
         ICustomer,
        //  IEventParty,
         IParkArea,
         IParkLocation,
         IRecentActivity,
         IRecentActivityType,
         ITicketSequence,
         ITicketType,
        //  ITransaction,
		 ICalendarEvent,
		 IPaymentType,
       } from '../current-ticket/index';

import { IColor, ICommonMake, ICommonModel } from '../car';

import { NumericMap } from '../helper';
import { IUser } from '../user/user.interface';

/*
	Initialize Return Interface
*/
export interface IInitialize {
	CurrentTicket: ICurrentTicket[];
	// Car?: ICar[];
	CommonMake: ICommonMake[];
	CommonModel: ICommonModel[];
	// Customer?: ICustomer[];
	// TicketSequence?: ITicketSequence[];
	// Transaction?: ITransaction[];
	TicketType: ITicketType[];
	// ParkLocation?: IParkLocation[];
	ParkArea: IParkArea[];
	// CompanyArrival:	ICompanyArrival[];
	// EventParty:	IEventParty[];
	CalendarEvent: ICalendarEvent[];

	Color: IColor[];
	CurrentUser: IUser[];
	PropertyUser: IUser[];
	RecentActivityType:	IRecentActivityType[];
	RecentActivity:	IRecentActivity[];
	Chat: IChat[];

	PaymentType: IPaymentType[];

	lastSync: string;


	// new
	ParkLocation?: IParkLocation|IParkLocation[];
}

export interface IInitializeMap {
	CurrentTicket: NumericMap<ICurrentTicket>;
	Car: NumericMap<ICar>;
	CommonMake: NumericMap<ICommonMake>;
	CommonModel: NumericMap<ICommonModel>;
	Customer: NumericMap<ICustomer>;
	TicketSequence: NumericMap<ITicketSequence>;
	// Transaction: NumericMap<ITransaction>;
	TicketType: NumericMap<ITicketType>;
	ParkLocation: NumericMap<IParkLocation>;
	ParkArea: NumericMap<IParkArea>;
	// CompanyArrival:	NumericMap<ICompanyArrival>;
	// EventParty:	NumericMap<IEventParty>;
	CalendarEvent: NumericMap<ICalendarEvent>;
	Color: NumericMap<IColor>;
	CurrentUser: NumericMap<IUser>;
	PropertyUser: NumericMap<IUser>;
	RecentActivityType:	NumericMap<IRecentActivityType>;
	RecentActivity:	NumericMap<IRecentActivity>;
	Chat: NumericMap<IChat>;
}
