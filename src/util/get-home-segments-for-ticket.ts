// import { isEmpty } from 'lodash';
// import { ALL, PARK, PULL, STAGED } from "../enums/home-segments.enum";
// // import { ITicketSmallItem } from "../lib/vvs-bridge";
// import { checkValue } from './index';

// import { Logger } from '../providers/vvs-controller/util/logger';
// import { IFullTicket } from './process-full-ticket';
// import { IUser } from '../lib/vvs-bridge';

// export const getHomeSegmentsForTicket = (ticket = {} as IFullTicket, loginUser: IUser): boolean[] => {
//     const logger = Logger.get(getHomeSegmentsForTicket.name);

//     logger.assert(isEmpty(ticket), "ticket must not be empty", ticket);
//     logger.assert(isEmpty(loginUser), "loginUser must not be empty", loginUser);

// 	// const lastTicketSequence =
//     const home_segments: boolean[] = [];
//     home_segments[STAGED] = (ticket.staged === 1 || ticket.pullStaged === 1 || ticket.parkProgress === 1);

//     home_segments[PULL] = (ticket.pullRequest == 1 || ticket.pullProgress == 1);

//     home_segments[ALL] = (ticket.isDeparted == 0);

//     // logger.assert(!ticket.TicketSequence, "TicketSequence is undefined", {ticket});
//     if (ticket.TicketSequence) {
//     home_segments[PARK] = checkValue(ticket.TicketSequence.parkUserID, ticket.TicketSequence.parkTimeStamp)
//                           && ticket.TicketSequence.parkUserID === loginUser.userID
//                           && ticket.isDeparted === 0;
//     } else {
//         home_segments[PARK] = false;
//     }
//     return home_segments;
// };
