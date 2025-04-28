import { ITicketSequence } from '../../current-ticket/ticket-sequence.interface';
import { IBaseAPIReturn } from '../base.interface';

export interface IPullInit {
	TicketSequence: ITicketSequence[];
}

export interface IPullInitNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
