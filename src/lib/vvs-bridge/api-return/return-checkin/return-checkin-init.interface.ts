import { ITicketSequence } from '../../current-ticket/ticket-sequence.interface';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckinInitReturning {
	TicketSequence: ITicketSequence[];
}

export interface ICheckinInitReturningNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
