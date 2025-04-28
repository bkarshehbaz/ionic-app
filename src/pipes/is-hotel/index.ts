import { Pipe, PipeTransform } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';

@Pipe({
    name: 'isHotel'
})
export class IsHotelPipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {
		// tslint:disable-next-line:no-console
		// console.log("TicketTypeNamePipe", vvsApp);
    }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(id: number, ...args: string[]): Promise<number> {
        // return "Ticket Type Name";
        return this.vvsApp.lss.getTicketTypeData()
        .then( (ticketType) => {
          // debugger;
          return ticketType && ticketType[id] ? ticketType[id].isHotel : -1;
        });
    }

}
