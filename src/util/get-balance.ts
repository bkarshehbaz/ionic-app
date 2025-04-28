// import moment from 'moment-timezone';
import moment from 'moment';
import { isNumber } from 'lodash';
import { IPayment, ITicketType, ICurrentTicket } from '../lib/vvs-bridge/current-ticket';
import { Logger } from '../providers/vvs-controller/util/logger';
import { IRequest } from '../lib/vvs-bridge';
import { IFullTicket } from './process-full-ticket';
// import { isEmpty } from 'lodash';

const logger = Logger.get(getBalance.name);

/**
 * @param ticket 
 * @param req 
 * @required createDate, isHotel, ticketPrice, complete
 */
export function getBalance(ticket: IFullTicket): number {
    if (ticket.TicketType && ticket.TicketType.ticketPrice) {
        return ticket.TicketType.ticketPrice;
    }
    return undefined;
}

/*
export function getBalanceV1(ticket: IFullTicket): number {
    
    if ( !ticket.createDate ) {
        throw new Error("ticket.createDate should never be empty: " + ticket.createDate);
    }

    // date is in utc format, so no need to convert
	const createDate: moment.Moment = moment(ticket.createDate);

    const { isHotel, ticketPrice } = ticket.TicketType || {} as any;// (ticket.TicketType && ticket.TicketType.ticketPrice ? ticket.TicketType : ticket) as ITicketType;

    const complete = ticket.Payment.complete; // (isNumber(ticket.Payment.complete) ? ticket.Payment : ticket) as IPayment;

    if (complete != 0 && complete != 1) {
        debugger;
        throw new Error("complete should always be 1 or 0: " + complete);
    } 

    if (complete == 1) {
        return 0.00;
    }

    const overNightPrice = 22;

    // logger.info({
    //     isHotel,
    //     complete,
    //     momentTimeZone,
    //     ticketPrice
    // })


    let balance = 0.00;

    // const tmp = true;
    // if (tmp) {
    //     return 14.99;
    // }


    if (isHotel == 1) { // if it's hotel

        balance = getOvernightBalance({ ticketPrice, createDate });

    } else if (isHotel == 0) { // if it's not hotel
        const now = moment();

        if (now.diff(createDate, "minutes") < 30) {
            // There is no charge for non-hotel customers who stay less than 30 mins
            balance = 0.00;
        } else {

            // let createdTimeAt12AM = createDate.set({ "hour": 0 });
            const createDateTomorrowAt12AM = createDate.clone().set({ "hour": 0 }).add({ day: 1 });

            balance = now.diff(createDateTomorrowAt12AM, "minutes") > 0 ? getOvernightBalance({ ticketPrice: overNightPrice, createDate }) : ticketPrice;
        }
    }

    return balance;
}

function getOvernightBalance({ createDate, ticketPrice }) {
    // create today's date and set hour to 12 AM (past)
    const todayAt12AM = moment().set({ "hour": 0 });

    // set createdDaet set hour to 12 AM (past)
    const createDateAt12AM = createDate.set({ "hour": 0 });

    // get difference in days
    const differenceInDays = todayAt12AM.diff(createDateAt12AM, "days");

    if (differenceInDays < 1) {
        // if less than 1 day, set balance to ticketprice
        return ticketPrice;
    } else {
        // multiply days by ticketPrice
        return differenceInDays * ticketPrice;
    }
}
*/





// import * as moment from 'moment';
// import { IFullTicket } from './process-full-ticket';
// import { Logger } from '../providers/vvs-controller/util/logger';


// export function getBalance(ticket: IFullTicket): number { // isHotel: number, ticketPrice, overNightPrice, createDate) {

// 	const logger = Logger.get(getBalance.name);

// 	logger.w("using hard coded overnight price", ticket);

//     if (!ticket || !ticket.createDate) {
//         return;
//     }

// 	const createDate: moment.Moment = moment(ticket.createDate);

// 	if (!ticket.TicketType) {
// 		return;
// 	}

//     const { isHotel, ticketPrice } = ticket.TicketType;
//     const overNightPrice = 22;

//     let balance = 0;
//     if (isHotel === 1) {

//         const todayAt3 = moment().set({ "hour": 3 });
//         const createDateAt3 = createDate.set({ "hour": 3 });
//         const differenceInDays = todayAt3.diff(createDateAt3, "days");
//         balance = differenceInDays * (ticketPrice);

//     } else if (isHotel === 0) {
//         const now = moment();
//         balance = 0;
//         if (now.diff(createDate, "minutes") < 30) {

//             // There is no charge for non-hotel customers stay less than 0 mins
//             balance = 0;
//         } else {
//             let createDateAt6PlusOneDay = createDate.set({ "hour": 6 }).add(1, "days");
//             // NOTE: not sure what this condition statement is for but it works..
//             if (now.diff(createDateAt6PlusOneDay, "minutes") > 0) {
//                 const tCreateDate = createDate.set({ "hour": 6 });
//                 createDateAt6PlusOneDay = moment().set({ "hour": 6 });
//                 const differenceInDays = createDateAt6PlusOneDay.diff(tCreateDate, "days");
//                 if (differenceInDays === 1) {
//                     // Charge the customer using the standard rate
//                     balance = differenceInDays * (ticketPrice);
//                 } else if (differenceInDays > 1) {
//                     // Charge the customer using the overnight rate
//                     balance = differenceInDays * (overNightPrice);
//                 }
//             }
//         }
//     }
//     return balance;
// }
