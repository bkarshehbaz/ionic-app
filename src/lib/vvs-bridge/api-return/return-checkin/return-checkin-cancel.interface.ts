import { ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface ICheckInReturningCancel {
	TicketSequence: ITicketSequence[];
}

export interface ICheckInReturningCancelNew extends IBaseAPIReturn {
	CurrentTicket: {
		TicketSequence: ITicketSequence;
	}
}
