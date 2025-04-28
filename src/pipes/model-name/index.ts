import { Pipe, PipeTransform } from '@angular/core';
// import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';

@Pipe({
    name: 'modelName'
})
export class ModelNamePipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {
		// tslint:disable-next-line:no-console
		// console.log("ModelNamePipe", vvsApp);
    }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(id: number, ...args: string[]): string {
		if (!id) {
			return "";
		}

		const { global_models } = this.vvsApp.lss;
		if (!global_models) {
			return "";
		}

		const { modelName } = global_models[id] || {} as any;
		return modelName;
        // return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
    }

}
