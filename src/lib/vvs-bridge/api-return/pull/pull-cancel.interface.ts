import { ICurrentTicket, ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface IPullCancel {
	TicketSequence: ITicketSequence[];
	CurrentTicket: ICurrentTicket[];
}

export interface IPullCancelNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
}
