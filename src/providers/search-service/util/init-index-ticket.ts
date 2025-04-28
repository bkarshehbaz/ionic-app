

import { forEach, toString, get } from 'lodash';
import { IColor, ICurrentTicket, IIndexTicket, IMake, IModel, ITicketType, ICalendarEvent } from '../../../lib/vvs-bridge';
import { checkValue } from '../../../util/index';
import { SearchService } from '../search-service';

import { Logger } from '../../../providers/vvs-controller/util/logger';
const logger = Logger.get("init-index-ticket");

export const _initIndexTicket = (me: SearchService): void => {

    Promise.all(
                [
                    me.lss.getCurrentTicketData(),
                    // me.lss.getCustomerData(),
                    // me.lss.getCarData(),
                    me.lss.getColorData(),
                    me.lss.getTicketTypeData(),

                    me.lss.getCalendarEventData(),
                    // me.lss.getCompanyArrivalData(),
                    // me.lss.getEventPartyData(),

                    me.lss.getMakes(),
                    me.lss.getModels()
                ]
            )
			.then( ([
					 currentTickets,
					 /*currentCustomers, currentCars,*/
					 currentColors,
                     ticketTypes,
                     calendarEvents,
					//  companyArrivals,
					//  eventParties,
					 $makes,$models
					]) => {

                if (checkValue(currentTickets)) {
                    forEach( currentTickets, (ticket: ICurrentTicket) => {
                    // for (const i in currentTickets) {

                        // let ticket : ICurrentTicket  = currentTickets   [i];
                        // const customer   = currentCustomers [ticket.customerID];
                        // const car        = currentCars      [ticket.carID];
                        const ticketType = ticketTypes[ticket.ticketTypeID] || {} as ITicketType;

                        const index: IIndexTicket = {} as IIndexTicket;

                        if (ticket.Car) {
                            const make: IMake = $makes[ticket.Car.makeID];
                            const model: IModel = $models[ticket.Car.modelID];
                            const color: IColor = currentColors[ticket.Car.colorID];   

                            if (!checkValue(make)) {
                                //continue;
                                return;
                            }
                            index.makeName = make.makeName;
                            index.modelName = model.modelName;
                            index.carYear = ticket.Car.carYear;
                            index.colorName = (checkValue(color)) ? toString(color.colorName) : '';
                        }

                        let calendarEvent: ICalendarEvent;

                        if (calendarEvents && calendarEvents[ticket.eventID]) {
                            calendarEvent = calendarEvents[ticket.eventID];
                        }

                        // let companyArrival: ICompanyArrival;
                        // if (checkValue(ticket.Customer.companyArrivalID)) {
                        //     companyArrival = companyArrivals  [ticket.Customer.companyArrivalID];
                        // }

                        // let eventParty    : IEventParty;
                        // if (checkValue(ticket.Customer.eventPartyID)) {
                        //     eventParty     = eventParties     [ticket.Customer.eventPartyID];
                        // }

                        index.currentTicketID = ticket.currentTicketID;
                        index.ticketNumber = ticket.ticketNumber;

                        // }


                        index.customerFirstName = ticket.Customer.customerFirstName;
                        // index.customerMiddleName = '';//TODO
                        index.customerLastName = ticket.Customer.customerLastName;
                        index.customerPhone = ticket.Customer.customerPhone;

                        index.ticketTypeName = ticketType.ticketTypeName;

                        if (calendarEvent) {
                            index.eventName = toString(calendarEvent.eventName);
                        }

                        // if (checkValue(companyArrival)) {
                        //     index.companyArrivalName = toString(companyArrival.companyArrivalName);
                        // }
                        // if (checkValue(eventParty)) {
                        //     index.eventPartyName     = toString(eventParty.eventPartyName);
                        // }

                        // index.companyArrivalName = (checkValue(companyArrival) &&
                        //                                       checkValue(companyArrival.companyArrivalName))
                        //                                       ? companyArrival.companyArrivalName
                        //                                       : '';

                        // index.eventPartyName     = (checkValue(eventParty) &&
                        //                                       checkValue(eventParty.eventPartyName))
                        //                                       ? eventParty.eventPartyName
                        //                                       : '';

                        me.ticketIndex.addDoc(index);
                    });
                }

                // cb && cb();

            })
            .catch(logger.e);
};
