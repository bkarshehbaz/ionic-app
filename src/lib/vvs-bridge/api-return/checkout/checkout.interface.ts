import { ICurrentTicket, IRecentActivity, ITicketSequence } from '../../current-ticket';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckOut {
    TicketSequence: ITicketSequence[];
    CurrentTicket: ICurrentTicket[];
    RecentActivity: IRecentActivity[];
}

export interface ICheckOutNew extends IBaseAPIReturn {
    CurrentTicket: ICurrentTicket;
    RecentActivity: IRecentActivity;
}
