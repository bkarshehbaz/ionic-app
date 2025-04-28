// import {
//     ICar,
//     IColor,
//     ICompany,
//     ICurrentTicket,
//     ICustomer,
//     IMake,
//     IModel,
//     ITicketSequence,
//     ITicketSmallItem,
//     ITicketType,
//     IUser,
//     NumericMap
// } from '../lib/vvs-bridge';

// import { checkValue, generateSSTV, IFullTicket } from './index';

// import { Logger } from "../providers/vvs-controller/util/logger";
// import { isEmpty } from 'lodash';
// const logger = Logger.get("get-full-ticket");

// export function getFullTicket(currentTicketID: number,
//                               currentTickets: NumericMap<ICurrentTicket>,
//                               currentCustomers: NumericMap<ICustomer>,
//                               currentCars: NumericMap<ICar>,
//                               currentColors: NumericMap<IColor>,
//                               ticketTypes: NumericMap<ITicketType>,
//                               ticketSequences: NumericMap<ITicketSequence>,
//                               loginUser: IUser,
//                               makes: NumericMap<IMake>,
//                               models: NumericMap<IModel>) {

// 	logger.assert(isEmpty(makes), "Models must not be empty");

//     const ticket         = currentTickets[currentTicketID];
//     const customer       = currentCustomers[ticket.customerID];
//     const car            = currentCars[ticket.carID];
//     const make           = makes[car.makeID];
//     const model          = models[car.modelID];
//     const color          = currentColors[car.colorID];
//     const ticketType     = ticketTypes[ticket.ticketTypeID];
//     const ticketSequence = ticketSequences[ticket.currentTicketID];

//     if (checkValue(customer, car, make, model, color, ticketType, ticketSequence)) {


//         // const ticket = generateSSTV(currentTicket,
//         //                             customer, car, make, model, color,
//         //                             tickettype, ticketSequence, loginUser,
//         //                             sCompany) as ITicketSmallItem;

//         // logger.l("generateSSTV ticket", ticket);
//         const _ticket = generateSSTV({ticket,
//                                       customer,
//                                       car,
//                                       make,
//                                       model,
//                                       color,
//                                       ticketType,
//                                       ticketSequence,
//                                       loginUser,
//                                       } as IFullTicket ) as ITicketSmallItem;

//         return _ticket;
//         // tickets[ticket.currentTicketID] = ticket;

//     } else {
//         logger.error("Line 109 at lib was reached. This is unacceptable", {
//             ticket, customer, car, make, model, color, ticketType, ticketSequence
//         });
//         return {};
//     }
//     // else{
//     //   // //logger.debug("individually",customer,car,make,model,color,tickettype,ticketSequence,"\n");
//     //   // //logger.debug("models >>  ",i,models,"\n");
//     //   // logger.error("This is unacceptable");
//     //
//     //   let ticket  :TicketSmallItem = this.generateSingleSmallTicketView(currentTickets[key],
//     //                                                                     customer,
//     //                                                                     car,
//     //                                                                     make,
//     //                                                                     model,
//     //                                                                     color,
//     //                                                                     tickettype,
//     //                                                                     ticketSequence,
//     //                                                                     loginUser,
//     //                                                                     sCompany);
//     //     // //logger.debug("This is unacceptable",ticket);
//     // }
// }
