import * as CI from '../../current-ticket/index';
import { IBaseAPIReturn, IBaseAPIReturnOld } from '../base.interface';

export interface IEdit extends IBaseAPIReturnOld {
	RecentActivity: CI.IRecentActivity[];
	// // EditedItem: CI.ICurrentTicket[]|CI.ICar[]|CI.ICustomer[]|CI.IParkLocation[]|CI.ITicketSequence[];

	CurrentTicket?: CI.ICurrentTicket[];
	Car?: CI.ICar[];
	Customer?: CI.ICustomer[];
	ParkLocation?: CI.IParkLocation[];
	TicketSequence?: CI.ITicketSequence[];
}

export interface IEditNew extends IBaseAPIReturn {
	RecentActivity: CI.IRecentActivity;
	// EditedItem: CI.ICurrentTicket[]|CI.ICar[]|CI.ICustomer[]|CI.IParkLocation[]|CI.ITicketSequence[];

	CurrentTicket?: CI.ICurrentTicket; // [];
	Car?: CI.ICar; // [];
	Customer?: CI.ICustomer; // [];
	ParkLocation?: CI.IParkLocation; // [];
	TicketSequence?: CI.ITicketSequence; // [];
}
