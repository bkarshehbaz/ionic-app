import { Pipe, PipeTransform } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';

@Pipe({
    name: 'ticketNumber'
})
export class TicketNumberPipe implements PipeTransform {

	constructor(private vvsApp: VVSApp) {}

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(ticketID: number, ...args: string[]): Promise<string> {
		if (!ticketID) {
			return Promise.resolve("");
		}

		return this.vvsApp.lss.getCurrentTicketByID(ticketID, TicketNumberPipe.name)
		.then( ticket => ticket ? ticket.ticketNumber : "" );

		// const tickets = this.vvsApp.lss.getRawValue("CurrentTicket");

		// return tickets && tickets[ticketID] ? tickets[ticketID].ticketNumber : "";
	}

}
