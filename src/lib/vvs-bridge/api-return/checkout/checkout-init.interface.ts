import { ITicketSequence } from '../../current-ticket';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckOutInit {
	TicketSequence: ITicketSequence[];
}

export interface ICheckOutInitNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
