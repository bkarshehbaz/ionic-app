import { includes, toNumber } from "lodash";
import { IFullTicket } from "../process-full-ticket";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { getStatusDescription } from "../get-status-description";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { RollbarService } from "../../services/rollbar";

export interface IAllowedOperation {
	mine: boolean;
	allowed: boolean;
}
export interface IAllowedOperations {
	checkIn: IAllowedOperation;
	checkOut: IAllowedOperation;
	pull: IAllowedOperation;
	pay: IAllowedOperation;
	park: IAllowedOperation;
	pullRequest: IAllowedOperation;
	add_car: IAllowedOperation;
	resendEclaim: IAllowedOperation;
	statusDescription: string;
}

const logger = Logger.get("TicketItemView");

export async function getAllowedOperations(ticket: IFullTicket, vvsApp: VVSApp): Promise<IAllowedOperations> {

	const { allowedOperations: allowedOps } = ticket;

	// const ran = random(0, 4);
	logger.info("getAllowedOperations", allowedOps);

	// return {
	// 	checkIn: ran == 0,
	// 	checkOut: ran == 1,
	// 	pull: ran == 1,
	// 	pay: ran == 2,
	// 	park: ran == 3,
	// 	pullRequest: ran == 1,
	// };

	let statusDescription = "";

	const user = vvsApp.user;

	try {
		statusDescription = await getStatusDescription(vvsApp, ticket) as string;
	} catch (e) {
		RollbarService.error(e);
	}

	return {
		statusDescription,
		checkIn: {
			mine: false, // ticket.TicketSequence.parkUserID == user.userID,
			allowed: includes(allowedOps, "CHECKIN"),
		},
		checkOut: {
			mine: ticket.statusName === "CHECKOUT_INIT" && ticket.TicketSequence.checkOutUserID == user.userID,
			allowed: includes(allowedOps, "CHECKOUT"),
		},
		pull: {
			mine: ticket.statusName === "PULL_INIT" && ticket.TicketSequence.pullUserID == user.userID,
			allowed: includes(allowedOps, "PULL_INIT"),
		},
		pullRequest: {
			mine: false,
			allowed: includes(allowedOps, "PULL_REQUEST"),
		},
		pay: {
			mine: ticket.Payment.complete != 1 && toNumber(ticket.balance) > 0 && ticket.TicketType.enablePayment != 0, // true,// false,
			allowed: ticket.Payment.complete != 1 && toNumber(ticket.balance) > 0 && ticket.TicketType.enablePayment != 0, // false // includes(allowedOps, "PAY"),
		},
		park: {
			/**
			 * just because the parkUserID equals myUserID,
			 * it doesn't mean that the car can be parked.
			 * This applies to all "mine" conditions.
			 * How do we solve this?
			 */
			mine: ticket.statusName === "PARK_INIT" && ticket.TicketSequence.parkUserID == user.userID,
			allowed: includes(allowedOps, "PARK_INIT")
		},
		add_car: {
			mine: false, //!ticket.Car || !ticket.Car.makeID,
			allowed: !ticket.Car || !ticket.Car.makeID,
		},
		resendEclaim: {
			mine: false,
			allowed: includes(allowedOps, "RESEND_ECLAIM"),
		}
	};

}
