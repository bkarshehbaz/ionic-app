
import { Pipe, PipeTransform } from '@angular/core';
import { filter, orderBy } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { IFullTicket, checkValue } from '../../util';
import { NumericMap } from '../../lib/vvs-bridge';
import { Logger } from '../../providers/vvs-controller/util/logger';


const staged = (ticket: IFullTicket) =>
	ticket.staged === 1 || ticket.pullStaged === 1 || ticket.parkProgress === 1;
const pull = (ticket: IFullTicket) =>
	ticket.pullRequest == 1 || ticket.pullProgress == 1;
const all = (ticket: IFullTicket) =>
	ticket.isDeparted != 1;
const parked = (ticket: IFullTicket) => {
	if (!ticket.TicketSequence) {
		// tslint:disable-next-line: no-debugger
		debugger;
	}

	return 	ticket.TicketSequence && checkValue(ticket.TicketSequence.parkUserID, ticket.TicketSequence.parkTimeStamp)
	&& ticket.TicketSequence.parkUserID == VVSApp.instance.userID
	&& ticket.isDeparted === 0;
};

const busy = (ticket: IFullTicket) =>
	!ticket.Car || !ticket.Car.makeID;

const functions = {
	staged, pull, all, parked, busy
};

const logger = Logger.get("home.component");

@Pipe({
    name: 'filterTicketBy'
})
export class FilterTicketsByPipe implements PipeTransform {

    // constructor(private vvsApp: VVSApp) { }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(
		tickets: NumericMap<IFullTicket>,
		type: "staged" | "pull" | "all" | "parked" | "busy",
		sort_key?: string,
		sort_order: "asc" | "desc" = "desc"
	): IFullTicket[] {
		logger.info("filterTicketBy transform", type);

		let results = filter(tickets, functions[type]);

		if (sort_key) {
			results = orderBy(
				results,
				(ticket) => Number.parseInt('1' + ticket.ticketNumber, 10),
				[sort_order]
			);
		}

		return results;
		// return ticket.statusName == 'PARK_INIT'
		// 		|| ticket.statusName == 'PULL_INIT'
		// 		|| ticket.statusName == 'CHECKIN_INIT'
		// 		|| ticket.statusName == 'CHECKOUT_INIT';
    }

}
