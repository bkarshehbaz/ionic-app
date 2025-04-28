
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { IFullTicket } from '../../util';

@Pipe({
    name: 'inProgress'
})
export class InProgressPipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) { }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(ticket: IFullTicket, ...args: string[]): boolean {
		return ticket.statusName == 'PARK_INIT'
				|| ticket.statusName == 'PULL_INIT'
				|| ticket.statusName == 'CHECKIN_INIT'
				|| ticket.statusName == 'CHECKOUT_INIT';
    }

}
