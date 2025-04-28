import { ITicketSequence } from '../../current-ticket/ticket-sequence.interface';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckInInit {
	TicketSequence : ITicketSequence[];
}

export interface ICheckInInitNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
