import { Logger } from "../providers/vvs-controller/util/logger";
import { VVSApp } from "../providers/vvs-controller/vvs-controller";
import { IFullTicket } from "../util/process-full-ticket";
import { merge } from "lodash";
import { pages } from "../pages/index";
import { getAllowedOperations } from "../util/ticket/get-allowed-operations";

const logger = Logger.get("ModalService");

export class ModalService {

	// TODO: parkInit was called twice because of a 500 error,
	// if we get the alert( only staged can be parked,)
	// then we can verify if the parkUserID == currentUserID
	// then let him/her go
	public static ticketAllData: any = false;
	public static presentPark = (me: VVSApp, ticket: IFullTicket) => {

		const tmp = ModalService.cantContinue(me);

		if (tmp) {
			return;
		}

		const present = () => {
			const data = {
				ticket,
				cardViewConfig: merge(me.getCardConfig(ticket), { editing: true }),
			};

			me.presentModal(pages.park, data);
		};

		getAllowedOperations(ticket, me)
			.then(({ park }) => {
				if (park.mine) {
					present();
				} else {
					me.httpService.parkInit(ticket, _data =>
						present()
					);
				}
			});



	}

	public static editParkLocation = (me: VVSApp, ticket: IFullTicket) => {
		const data = {
			ticket,
			cardViewConfig: merge({}, me.getCardConfig(ticket), { editing: true }),
			title: "Edit Park Location",
			mode: "edit"
		};

		me.presentModal(pages.park, data);
	}

	public static presentCheckout = (me: VVSApp, ticket: IFullTicket) => {

		if (ModalService.cantContinue(me)) {
			return;
		}

		const present = () => me.presentModal(pages.checkout, { ticket });

		getAllowedOperations(ticket, me)
			.then(({ checkOut }) => {
				if (checkOut.mine) {
					present();
				} else {
					me.httpService
						.checkOutInit(ticket.currentTicketID, _data => present());
				}
			});



	}

	public static presentPull = (me: VVSApp, ticket: IFullTicket) => {

		if (ModalService.cantContinue(me)) {
			return;
		}

		const present = () => me.presentModal(pages.pull, { ticket });

		getAllowedOperations(ticket, me)
			.then(({ pull }) => {
				if (pull.mine) {
					present();
				} else {
					me.httpService
						.pullInit(ticket, (_data) =>
							present()
						);
				}
			});

	}

	public static presentRCheckin = (me: VVSApp, ticket: IFullTicket) => {

		if (ModalService.cantContinue(me)) {
			return;
		}

		// me.httpService.returningCheckin(ticket, (_data) => {
		me.presentModal(pages.rcheckin, { ticket });
		// });

	}

	public static presentPullRequest = (me: VVSApp, ticket: IFullTicket) => {

		if (ModalService.cantContinue(me)) {
			return;
		}

		me.presentModal(pages.pullRequest, { ticket });
	}

	private static cantContinue(me: VVSApp) {
		if (me.ably.state === "connected") {
			return false;
		}

		me.httpService.presentPasswordAlert();
		return true;
	}

}
