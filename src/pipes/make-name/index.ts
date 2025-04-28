import { Pipe, PipeTransform } from '@angular/core';
// import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { Memoize } from 'lodash-decorators';

@Pipe({
    name: 'makeName'
})
export class MakeNamePipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {
		// tslint:disable-next-line:no-console
		// console.log("MakeNamePipe", vvsApp);
    }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
	@Memoize()
    transform(id: number, ...args: string[]): string {
		if (!id) {
			return "";
		}

		const { global_makes } = this.vvsApp.lss;

		if (!global_makes) {
			return "";
		}

		const { makeName } = this.vvsApp.lss.global_makes[id] || {} as any;
		return makeName;
        // return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
    }

}
