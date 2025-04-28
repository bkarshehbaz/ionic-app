import { Pipe, PipeTransform } from '@angular/core';
import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';

@Pipe({
    name: 'ticketTypeName'
})
export class TicketTypeNamePipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {
		// tslint:disable-next-line:no-console
		// console.log("TicketTypeNamePipe", vvsApp);
    }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(id: number, ...args: string[]): Promise<string> {
        // return "Ticket Type Name";
        return this.vvsApp.lss.getTicketTypeData()
        .then( (ticketType) => {
          return ticketType && ticketType[id] ? ticketType[id].ticketTypeName : "";
        });
    }

}
