import { IParkLocation } from './../../lib/vvs-bridge/current-ticket/park-location.interface';
import { Pipe, PipeTransform } from '@angular/core';
// import { orderBy, values } from "lodash";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
// import { Logger } from '../../providers/vvs-controller/util/logger';

// const logger = Logger.get("FullParkLocationPipe");

@Pipe({
    name: 'fullParkLocation'
})
export class FullParkLocationPipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {
			// tslint:disable-next-line:no-console
			// console.log("FullParkLocationPipe", vvsApp);
    }

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(parkLocation: IParkLocation, ...args: string[]): Promise<string> {

			return this.vvsApp.lss.getParkAreaData()
			.then( (pAData) => {
				// const pAData = this.vvsApp.lss.getParkAreaData();
				// tslint:disable-next-line:no-debugger
				// logger.debug();
				if (!parkLocation) {
					return "N/A";
				}

				// logger.debug();

				const parkArea = (pAData || {} as any)[parkLocation.parkAreaID];
				if (!parkArea) {
					return `${parkLocation.parkLocationName} @ N/A`;
				}
				return `${parkLocation.parkLocationName} @ ${parkArea.parkAreaName}`;
					// return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
			});

    }

}
