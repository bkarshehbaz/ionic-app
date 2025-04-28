// import { Subject } from "rxjs";
// // import { ICurrentTicket, ITicketSmallItem, NumericMap } from "../../../lib/vvs-bridge";
// import { ICurrentTicket, NumericMap } from "../../../lib/vvs-bridge";
// import { checkValue, getFullTicket } from '../../../util/index';
// import { LocalStorageService } from '../local-storage-service';

// import { cloneDeep, filter, forEach, isEmpty, isNumber} from 'lodash';
// import * as log4javascript from "log4javascript";

// import { Logger } from '../../../providers/vvs-controller/util/logger';
// const logger = Logger.get(_getCurrentTicketToDisplayIn.name);

// export function _getCurrentTicketToDisplayIn(
// 		me: LocalStorageService,
// 		where: string,
// 		ticketsSubject?: Subject<NumericMap<IFullTicket>>,
// 		_filter?: 'pull'
// 	): void {

//     Promise.all(
//               [
//                 me.getCurrentTicketData(),
//                 me.getCustomerData(),
//                 me.getCarData(),
//                 me.getColorData(),
//                 me.getTicketTypeData(),
//                 me.getTicketSequenceData(),
//                 me.getSelectedCompany(),
//                 me.getLoginUser(),
//                 me.getMakes(),
//                 me.getModels()
//               ]
//            )
//            .then( ([currentTickets,
//                     currentCustomers,
//                     currentCars,
//                     currentColors,
//                     ticketTypes,
//                     ticketSequences,
//                     sCompany,
//                     loginUser]) => {

//                 const tickets = {} as { [key: number]: ITicketSmallItem };

//                 // //logger.debug(currentTickets);
//                 let i = 0;
//                 if (checkValue(currentTickets)) {

//                     if (isEmpty(me.global_models)) {
//                         logger.w("models is empty", me.global_models, i);
// 					}

// 					let _tickets = cloneDeep(currentTickets);

// 					if (_filter === 'pull') {
// 						_tickets = filter(_tickets, (value, key) => value.pullRequest === 1 || value.pullProgress === 1);
// 					}

//                     forEach(_tickets, (value, key) => {
//                         i++;
//                         if (checkValue(key, _tickets[key], value) ) {
//                         //     return false;
//                         // } else {
//                             const c: ICurrentTicket = _tickets[key];
//                             const c2 = c && currentCars[c.carID];
//                             if (c2) {

// 								const _ticketID = Number(key);
// 								logger.assert(!isNumber(_ticketID), "Must be a number", _ticketID, typeof _ticketID);

//                                 const ticket = getFullTicket(_ticketID,
//                                                             _tickets,
//                                                             currentCustomers,
//                                                             currentCars,
//                                                             currentColors,
//                                                             ticketTypes,
//                                                             ticketSequences,
//                                                             loginUser,
//                                                             sCompany,
//                                                             me.global_makes,
//                                                             me.global_models);

//                                 tickets[key] = ticket;

//                             }
//                         }
//                     });
//                 }

//                 if (!ticketsSubject) {
//                     me.sendHomeTicket(tickets, undefined);
//                 } else {
//                     // me.sendSearchTicket(tickets);
//                     ticketsSubject.next(tickets);
//                 }

//            })
//            .catch( (error: Error) => logger.error("line 83", error.name, error.message, error));
// }
