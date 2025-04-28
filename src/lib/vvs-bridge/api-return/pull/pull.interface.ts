import { ICurrentTicket, IRecentActivity, ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface IPull {
	TicketSequence: ITicketSequence[];
	CurrentTicket: ICurrentTicket[];
	RecentActivity: IRecentActivity[];
}

export interface IPullNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
	RecentActivity: IRecentActivity;
}
