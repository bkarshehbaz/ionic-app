import { ICurrentTicket, ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface IParkCancel {
	TicketSequence: ITicketSequence[];
	CurrentTicket: ICurrentTicket[];
}

export interface IParkCancelNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
