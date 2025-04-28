import { IFullTicket } from "../../../util";

// import { ITicketSmallItem } from './ticket-small-ticket.interface';

export interface IOpenSpanOption {
	[key: number]:  {
        ionItem: any; // TicketItemOptions,
        spanItem: any;
        minHeight: number;
        ticket: IFullTicket;
    };
}
