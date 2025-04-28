import { Component, Input } from "@angular/core";
import { IFullTicket } from "../../../util";
import { VVSApp } from "../../../providers/vvs-controller/vvs-controller";
// import { ITicketType, NumericMap } from "../../../lib/vvs-bridge";
import { to } from "../../../util/to";
// import { Logger } from "../../../providers/vvs-controller/util/logger";

export interface IValecon {
	color?: string;
	class: string;
	show: boolean;
	type?: "ion-spinner" | "li" | "ion-icon";
}

// const logger = Logger.get("ValeconsComponent");

@Component({
	selector: "valecons",
	templateUrl: "./valecons.component.html"
})
export class ValeconsComponent {

	valecons: IValecon[] = [];

	_ticket: IFullTicket;
	@Input()
	set ticket(ticket: IFullTicket) {
		this._ticket = ticket;
		if (ticket) {
			this.initValecons(ticket);
		}
	}

	constructor(private vvsApp: VVSApp) {}

	async initValecons(ticket: IFullTicket) {

		// ticket.TicketType = ticket.TicketType || {} as any;
		
		// if (!ticket.TicketType.ticketTypeName) {
		// 	// ticket.TicketType = (this.vvsApp.lss.getRawValue("TicketType") as NumericMap<ITicketType>)[ticket.TicketType.ticketTypeID];
		// 	const [ticketTypes] = await to(this.vvsApp.lss.getTicketTypeData());

		// 	if (ticketTypes) {
		// 		ticket.TicketType = ticketTypes[ticket.ticketTypeID];
		// 	}
		// }

		const { isHotel } = ticket.TicketType || {} as any;
		this.valecons = [
		{
			// Overnight
			color: "#223D6B",
			class: "micon-ios-moon",
			show: isHotel == 1
		},
		{
			// Call Down
			color: 'orange',
			class: "micon-android-call",
			show: ticket.statusName == "PULL_REQUEST"
		},
		// {
		// 	// Hot Car
		// 	color: "red",
		// 	show: isHotel == 1 && !ticket.roomNumber,
		// 	class: "micon-fireball"
		// },
		{
			// Outbound Stage
			color: "red",
			class: "micon-arrow-return-left",
			show: ticket.pullStaged == 1
		},
		{
			// Inbound Stage
			color: "green",
			class: "micon-arrow-return-right",
			show: ticket.staged == 1
		},
		// {
		// 	// Checkout
		// 	color: "green",
		// 	class: "micon-android-exit",
		// 	show: ticket.pullRequest == 1 && ticket.staged == 0
		// },
		{
			// Inside
			color: "green",
			class: "micon-ios-location",
			show: ticket.isIn == 1
		},
		{
			// Outside
			color: "red",
			class: "micon-ios-location",
			show: ticket.isIn == 0
		},
		{
			color: "red",
			class: "micon-ios-manual",
			show: ticket.Car && ticket.Car.manual == 1
		},
		{
			// color: ""
			class: "dollar",
			show: ticket.Payment && ticket.Payment.complete == 1
		},
		];
	}
	

}
