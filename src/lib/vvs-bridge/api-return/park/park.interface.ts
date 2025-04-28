import { ICurrentTicket, IParkLocation, IRecentActivity, ITicketSequence } from "../../current-ticket/index";
import { IBaseAPIReturn } from '../base.interface';

export interface IPark {
	ParkLocation: IParkLocation[];
	TicketSequence: ITicketSequence[];
	CurrentTicket: ICurrentTicket[];
	RecentActivity: IRecentActivity[];
}

export interface IParkNew extends IBaseAPIReturn {
	CurrentTicket: ICurrentTicket;
	RecentActivity: IRecentActivity;
}
