import { ICurrentTicket, IRecentActivity, ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckInReturning {
	CurrentTicket: ICurrentTicket[];
	TicketSequence: ITicketSequence[];
	RecentActivity: IRecentActivity[];
}

export interface ICheckInReturningNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
	RecentActivity: IRecentActivity;
}
