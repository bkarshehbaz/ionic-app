// import { toString } from "lodash";
// import * as moment from "moment";
// import { ICurrentTicket, IRecentActivity, IRecentActivityItem, IRecentActivityType, IUser } from '../lib/vvs-bridge';
// import { checkValue, getFullName } from "./index";

// import { Logger } from '../providers/vvs-controller/util/logger';

// export const getRecentActivityItem = (
// 	_recentActivityType: IRecentActivityType,
// 	_recentActivity: IRecentActivity,
// 	_currentTicket: ICurrentTicket,
// 	i: number
// ): IRecentActivityItem => {

// 	const logger = Logger.get("get-recent-activity-item");

//     logger.assert(
// 		!checkValue(_recentActivityType, _recentActivity),
// 		"required values must not be undefined",
// 		{
// 			_recentActivityType,
// 			_recentActivity
// 		}
// 	);

// 	if (!_recentActivityType) {
// 		return {} as any;
// 	}

//     const _rAI: IRecentActivityItem = {} as any;

//     // tslint:disable-next-line:no-object-literal-type-assertion
//     _currentTicket = _currentTicket || {} as ICurrentTicket;

//     // _rAI.message = _recentActivityType.recentActivityMessage
// 	// 			.replace("#{userFirstName}", toString(_currentUser ? _currentUser.userFirstName : 'the customer'))
// 	// 			.replace("#{userLastName}" , toString(_currentUser ? _currentUser.userLastName : ''))
// 	// 			.replace("#{ticketNumber}" , "<span class='ticketNumber'>" + toString(_currentTicket.ticketNumber) + "</span>&nbsp;");

//     _rAI.color                = _recentActivityType.color;
//     _rAI.time                 = moment(_recentActivity.activityTimeStamp).format("LT");
//     _rAI.recentActivityID     = _recentActivity.recentActivityID;
//     _rAI.recentActivityTypeID = _recentActivity.recentActivityTypeID;
//     _rAI.index                = i;
//     _rAI.ticketNumber         = _currentTicket.ticketNumber;
//     _rAI.currentTicketID      = _currentTicket.currentTicketID;
//     // _rAI.userID               = _currentUser ? _currentUser.userID : null;
//     // _rAI.fullName             = _currentUser ? getFullName(_currentUser) : null;
//     _rAI.show                 = true;

//     return _rAI;
// };
