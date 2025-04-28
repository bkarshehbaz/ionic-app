// import * as vvsValidation from "../../../../../util/vvs-validation/index";
// import { invalid, licenseCodes, valid } from "../../../../../constants/constants";
// import { toString } from "lodash";
// import { CustomerStep } from "../customer-step";
// import { toStringTrim } from "../../../../../util";

// export function ticketNumber(tN?: string) {

// 	const me: CustomerStep = this;

// 	tN = tN || me.ticket.ticketNumber;

// 	const { currentTicketID } = me.ticket;

// 	let $toReturn;

// 	me.attemptToPopulatePlace();

// 	if (
// 		(toStringTrim(tN).length === 5 && !Number.isNaN(Number.parseInt(tN))) // || toStringTrim(tN).length === 0
// 	) {
// 		me.validations.ticketNumber = valid;
// 		$toReturn = true;
// 		// me.checkInInit();
// 	} else {
// 		me.validations.ticketNumber = invalid,
// 		$toReturn = false;
// 		toStringTrim(tN).length === 0 && me.restartTicketType()
// 	}

// 	return $toReturn;

// }
