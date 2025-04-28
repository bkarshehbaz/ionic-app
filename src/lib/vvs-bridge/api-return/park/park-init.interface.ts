import { ICurrentTicket, ITicketSequence } from '../../current-ticket/index';
import { IBaseAPIReturn } from '../base.interface';

export interface IParkInit {
	TicketSequence: ITicketSequence[];
	CurrentTicket: ICurrentTicket[];
}

export interface IParkInitNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
}
