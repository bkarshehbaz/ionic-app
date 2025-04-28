// import { forEach, keys } from 'lodash';
// import { Subject } from "rxjs";
// import * as cf from "../../../constants/constant-fields";
// import { ICurrentTicket, IRecentActivity, IRecentActivityItem, NumericMap } from '../../../lib/vvs-bridge';
// // import { checkValue, getRecentActivityItem } from '../../../util/index';
// import { LocalStorageService } from "../local-storage-service";
// import { _processRecentActivityToDisplay } from './process-recent-activity-to-display';

// import { Logger } from '../../../providers/vvs-controller/util/logger';
// const logger = Logger.get(_getRecentActivityToDisplayTo.name);

// export function _getRecentActivityToDisplayTo(me: LocalStorageService, where: string): void {

// 	me.getRecentActivityRequiredData()
// 	.then( ([recentActivities, recentActivityTypes, propertyUsers, currentTickets]) => {

// 		if (where === cf.search) {
// 			// recentsSubject.next(recentActivities as NumericMap<IRecentActivity>);
// 			return recentActivities;
// 		} else if (where === cf.tab) {

// 			if (!me.recentActivityToDisplay || (me.recentActivityToDisplay && Object.keys(recentActivities).length > me.recentActivityToDisplay.recentActivityCount)) {
// 				me.recentActivityToDisplay = _processRecentActivityToDisplay(me, { recentActivities, recentActivityTypes, propertyUsers, currentTickets });
// 			}

// 			// me.vvsApp.reactive.sendRecentActivities(me.recentActivityToDisplay);

// 			return me.recentActivityToDisplay;
// 		}


// 	})
// 	.catch(logger.e);
// }
