// import { forEach } from 'lodash';
// import * as vvsBridge from '../../../lib/vvs-bridge';
// import { checkValue, IFullTicket } from '../../../util/index';
// // import { checkValue, generateSSTV, IFullTicket } from '../../../util/index';
// import { LocalStorageService } from "../local-storage-service";

// import { Logger } from "../../vvs-controller/util/logger";
// const logger = Logger.get("send-home-single-ticket-view");

// export function _sendHomeSingleTicketView(me: LocalStorageService, currentTicketIDs: number[]): void {

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
//            .then( ([
//                currentTickets,
//                currentCustomers,
//                currentCars,
//                currentColors,
//                ticketTypes,
//                ticketSequences,
//                ,
//                loginUser,

//            ]) => {

//                 const ticketSmallItems: vvsBridge.ITicketSmallItem[] = [];
//                 forEach(currentTicketIDs, (currentTicketID: number) => {
//                     const ticket: vvsBridge.ICurrentTicket = currentTickets[currentTicketID];

//                     if (ticket) {

//                         const customer      : vvsBridge.ICustomer        = currentCustomers[ticket.customerID];
//                         const car           : vvsBridge.ICar             = currentCars[ticket.carID];
//                         const make          : vvsBridge.IMake            = me.global_makes[car.makeID];
//                         const model         : vvsBridge.IModel           = me.global_models[car.modelID];
//                         const color         : vvsBridge.IColor           = currentColors[car.colorID];
//                         const ticketType    : vvsBridge.ITicketType      = ticketTypes[ticket.ticketTypeID];
//                         const ticketSequence: vvsBridge.ITicketSequence  = ticketSequences[ticket.currentTicketID];

//                         if (checkValue(customer, car, make, model, color, ticketType, ticketSequence)) {

//                             // logger.l("generateSSTV ticket", ticket);
//                             const _ticket = generateSSTV({ticket,
//                                                           customer,
//                                                           car,
//                                                           make,
//                                                           model,
//                                                           color,
//                                                           ticketType,
//                                                           ticketSequence,
//                                                           loginUser,
//                                                           } as IFullTicket ) as vvsBridge.ITicketSmallItem;

//                             ticketSmallItems.push(_ticket);

//                         } else {
//                             logger.error("This is unacceptable",
//                               "checkValue(customer, car, make, model, color, tickettype, ticketSequence)",
//                               checkValue(customer, car, make, model, color, ticketType, ticketSequence),
//                               {customer, car, make, model, color, ticketType, ticketSequence});
//                         }
//                       }
//                 });

//                 me.sendSingleHomeTicket(ticketSmallItems);

//           })
//           .catch(logger.e);
// }
