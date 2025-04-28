import { ICurrentTicket, ITicketSequence } from '../../current-ticket';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckOutCancel {
	TicketSequence: ITicketSequence[];
	CurrentTicket: ICurrentTicket[];
}

export interface ICheckOutCancelNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
}
