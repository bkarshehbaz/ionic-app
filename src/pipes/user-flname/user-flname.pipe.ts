import { Pipe, PipeTransform } from '@angular/core';
// import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { getFullName } from '../../util/get-full-name';

@Pipe({
    name: 'userFLName'
})
export class UserFullNamePipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {}

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(userID: number, ...args: string[]): Promise<string> {
		if (!userID) {
			return Promise.resolve("");
		}
		// this.vvsApp.lss.pr

		return this.vvsApp.lss.getPropertyUserData()
		.then( user => {
			if (user && user[userID]) {
				// const fullName = getFullName([userID]);
				return getFullName(user[userID]);
			}
	
			return "";
		});

		// // logger.debug();
		// const { modelName } = this.vvsApp.lss.global_models[id] || {} as any;
		// return modelName;
        // // return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
    }

}
