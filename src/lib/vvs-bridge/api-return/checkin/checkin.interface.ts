import * as CI from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckIn {
	CurrentTicket   : CI.ICurrentTicket[];
	Car				: CI.ICar[];
	Customer		: CI.ICustomer[];
	TicketSequence  : CI.ITicketSequence[];
	// Transaction		: CI.ITransaction[];
	RecentActivity  : CI.IRecentActivity[];
}

export interface ICheckInNew extends IBaseAPIReturn {
	CurrentTicket: CI.ICurrentTicket;
	RecentActivity: CI.IRecentActivity;
}
