import { ICurrentTicket, IRecentActivityItem } from "../lib/vvs-bridge";
import { Observable } from "rxjs";

export interface IFullTicket extends ICurrentTicket {

	recentActivityItems?: Observable<IRecentActivityItem[]>;
	balance?: number;
	resend?: boolean;
	// profilePhoto?: string;
}
