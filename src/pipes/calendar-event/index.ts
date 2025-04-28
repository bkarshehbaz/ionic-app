import { Pipe, PipeTransform } from '@angular/core';
// import { toString, isEmpty } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
// import { ICar } from '../../lib/vvs-bridge';

@Pipe({
    name: 'calendarEventName'
})
export class CalendarEventPipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {}

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(eventID: number, ...args: string[]): Promise<string> {
		// if (isEmpty(car) || isEmpty(this.vvsApp.lss.global_makes) || isEmpty(this.vvsApp.lss.global_models)) {
		// 	return Promise.resolve("");
        // }
        
        return this.vvsApp.lss.getCalendarEventData()
        .then( events => {
            if (events && events[eventID]) {
                return events[eventID].eventName;
            }
        });
		// const { makeName } = this.vvsApp.lss.global_makes[car.makeID];
		// const { modelName } = this.vvsApp.lss.global_models[car.modelID];
		// return `${makeName} ${modelName} ${toString(car.carYear)}`.trim();
		// return <span> {{ticket.carYear}} {{ticket.makeName}} {{ticket.modelName}}</span>;
        // return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
    }

}
