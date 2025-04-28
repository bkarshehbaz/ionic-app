import { forEach, groupBy, keys, orderBy } from "lodash";
import * as moment from 'moment';
import {
	ICurrentTicket,
	IRecentActivity,
	IRecentActivityGroupItem,
	IRecentActivityObservableData,
	IRecentActivityType,
	IUser,
	NumericMap
} from '../../../lib/vvs-bridge';
// import { checkValue} from "../../../util/index";
// import { LocalStorageService } from '../local-storage-service';
import { getMomentFormats } from '../../../constants/constants';

// import { Logger } from '../../../providers/vvs-controller/util/logger';
// const logger = Logger.get(_processRecentActivityToDisplay.name);

interface IProcessRecentActivityToDisplay {
    recentActivities: NumericMap<IRecentActivity>;
    recentActivityTypes: NumericMap<IRecentActivityType>;
    // propertyUsers: NumericMap<IUser>;
    // currentTickets: NumericMap<ICurrentTicket>;

}

/**
 * @param me
 * @param param1
 * @return the required data to be used in the recent activity component(page)
 */
export function _processRecentActivityToDisplay({
	recentActivities:$recentActivities,
	recentActivityTypes
}: IProcessRecentActivityToDisplay): IRecentActivityObservableData {

    const groups: IRecentActivityGroupItem[] = [];
    let max = 0;

	const groupedByDay = groupBy(
		$recentActivities,
		(rA: IRecentActivity) =>
			moment(rA.activityTimeStamp).startOf('day').format()
	);

	const raOrdered = orderBy(keys(groupedByDay), [key => key], ["desc"]);

    forEach(raOrdered, (key) => {

        const min = max;
		max += (groupedByDay[key] || []).length;

		groups.push({
            time: moment(key).calendar(null, getMomentFormats()),
            min,
            max,
            recentActivities: groupedByDay[key]
		});

    });

    return {
        recentActivityCount: max,
        recentActivityTypes,
        groups
    };
}
