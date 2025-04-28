import { IFullTicket } from "./process-full-ticket";
import { Logger } from "../providers/vvs-controller/util/logger";
import { VVSApp } from "../providers/vvs-controller/vvs-controller";
import { isEmpty } from "lodash";
import { IUser } from "../lib/vvs-bridge";

const logger = Logger.get("getStatusDescription");

export const getStatusDescription = (vvsApp: VVSApp, ticket: IFullTicket) => {
	if (ticket) {

		return vvsApp.lss.getPropertyUserData()
		.then( (users) => {
			let user: IUser;

			const matches: string[] = ticket.statusDescription.match(/#{by_(.*?)User}/);

			if (isEmpty(matches) || isEmpty(matches[1])) {
				return ticket.statusDescription;
			}

			let id: string; //"checkInUserID";

			switch(matches[1]) {
				case "park":
				case "checkIn":
				case "pull":
				case "checkOut":
					id = matches[1] + "UserID";
					break;
			}

			if (id) {
				user = users[ticket.TicketSequence[id]];
			}

			if (user) {
				return (ticket.statusDescription || "").replace(matches[0],`by ${user.userFirstName} ${user.userLastName}`);
			} else {
				return (ticket.statusDescription || "").replace(matches[0], "");
			}
		})
		.catch(logger.error);

	}

	return Promise.resolve(ticket.statusDescription);
};
