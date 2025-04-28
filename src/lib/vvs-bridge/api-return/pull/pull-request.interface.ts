import { ICurrentTicket, ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface IPullRequest {
	CurrentTicket: ICurrentTicket[];
	TicketSequence: ITicketSequence[];
}

export interface IPullRequestNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
}
