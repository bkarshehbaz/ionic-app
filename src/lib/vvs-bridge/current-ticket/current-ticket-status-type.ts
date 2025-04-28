export interface ICurrentTicketStatusType {
	currentTicketStatusTypeID: number;
	statusName: "PULL_INIT" | "CHECKOUT_INIT" | "CHECKIN_INIT" | string;
	statusDescription: string;
	/**
	 *
	 */
	allowedOperations: "CHECKOUT" | "CHECKIN" | "PARK" | "PULL" | "PULL_REQUEST" | "PAY";
	allowedStates: string;
}
