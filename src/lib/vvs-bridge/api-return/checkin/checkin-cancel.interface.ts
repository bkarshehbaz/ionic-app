import { ITicketSequence } from '../../current-ticket/ticket-sequence.interface';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckInCancel {
	TicketSequence: ITicketSequence[];
}

export interface ICheckInCancelNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
