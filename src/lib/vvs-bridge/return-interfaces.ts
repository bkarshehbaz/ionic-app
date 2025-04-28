import { IChat } from "./chat/index";
import { IProperty } from './property/property.interface';
import { IUser } from './user/index';

import {
    ICar,
    // ICompanyArrival,
    ICustomer,
    // IEventParty,
    IParkArea,
    IParkLocation,
    IRecentActivity,
    ITicketSequence,
    // ITransaction,
} from './current-ticket';
/*
	Edit Return Interfaces
*/

/*
	Chat Return Interfaces
*/
export interface IChatInsert {
	Chat: IChat;
}

/*

Admin Return Interfaces
----------------------------------------------------------------------------------------------------------
*/

export interface IUserProperty extends IProperty {
	userID: number;
}

export interface IAuditRecord {
	User: IUser;
	UserProperties: IUserProperty[];
}

export interface IAudit {
	AuditRecords: IAuditRecord[];
}

export interface IAddUser {
	User: IUser;
	UserProperties: IUserProperty[];
}

export interface IAddParkArea {
	ParkArea: IParkArea[];
}

// export interface IAddEventParty {
// 	EventParty: IEventParty[];
// }

// export interface IAddCompanyArrival {
// 	CompanyArrival: ICompanyArrival[];
// }

export interface IMonthlyGoal {
	monthlyGoalID: number;
	goalMonth: number;
	goalYear: string;
	goalAmount: number;
	createDate: string;
	modDate: string;
}

export interface IAddMonthlyGoal {
	MonthlyGoal: IMonthlyGoal;
}

export interface ISelectAudit {
	User: IUser[];
}

export interface ISelectUser {
	User: IUser[];
}

export interface ISelectParkArea {
	ParkArea: IParkArea[];
}

// export interface ISelectEventParty {
// 	EventParty: IEventParty[];
// }

// export interface ISelectCompanyArrival {
// 	CompanyArrival: ICompanyArrival[];
// }

export interface ISelectMonthlyGoal {
	MonthlyGoal: IMonthlyGoal[];
}

export interface ICurrentTicket {
	CurrentTicket	: ICurrentTicket[];
	Car				: ICar[];
	Customer		: ICustomer[];
	TicketSequence	: ITicketSequence[];
	ParkLocation	: IParkLocation[];
	// Transaction		: ITransaction[];
	RecentActivity  : IRecentActivity[];
}

export interface IUsernames {
	Usernames: string[];
}
