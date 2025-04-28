import { Pipe, PipeTransform } from '@angular/core';
import { toString, isEmpty } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { ICar } from '../../lib/vvs-bridge';
import { logger } from 'handlebars';

@Pipe({
    name: 'carInfo'
})
export class CarInfoPipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {}

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(car: ICar, ...args: string[]): string {
		if (isEmpty(car) || !car.makeID || isEmpty(this.vvsApp.lss.global_makes) || isEmpty(this.vvsApp.lss.global_models)) {
			return "";
        }

		const { makeName } = this.vvsApp.lss.global_makes[car.makeID] || {} as any;
		const { modelName } = this.vvsApp.lss.global_models[car.modelID] || {} as any;
		return `${makeName} ${modelName} ${toString(car.carYear)}`.trim();
		// return <span> {{ticket.carYear}} {{ticket.makeName}} {{ticket.modelName}}</span>;
        // return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
    }

}
