import { IFullTicket } from "../../../util";
import * as cf from "./../../../constants/constant-fields";
import * as t from "./../../../constants/constant-titles";
import { VVSApp } from "./../vvs-controller";
import { ActionSheetButton } from "ionic-angular";
import { pages } from "../../../pages";
import { Logger } from "./logger";
import { ModalService } from "../../../modals/modal.service";
import { Taptic } from "../../haptic-service";
import { ENV } from "../../../environments";

const logger = Logger.get("PresentEditOptions");

const getButtons = (
	buttons: { text: string; handler: () => void }[],
	me: VVSApp,
	ticket,
	from?: "modal"
) => {
	const _buttons = [
		{
			text: "Edit " + t.CUSTOMER,
			handler: () => {
				console.log("ticket is main", ticket)
				ModalService.ticketAllData = ticket;
				me.multiFormEdit(
					cf.customer,
					t.EDIT_WITH_SPACE_AT_THE_END + t.CUSTOMER,
					ticket,
					from
				);
			}
		},
		{
			text: "Edit " + t.CAR,
			handler: () => {
				me.multiFormEdit(
					cf.car,
					t.EDIT_WITH_SPACE_AT_THE_END + t.CAR,
					ticket,
					from
				);
			}
		},
		{
			text: "Add " + t.PHOTOS_NOTES,
			handler: () => {
				me.multiFormEdit(
					cf.carnotes,
					"Add " + t.PHOTOS_NOTES,
					ticket,
					from
				);
			}
		},
		{
			text: t.SUMMARY,
			handler: () => {
				me.presentModal(pages.summary, { data: ticket });
			}
		},
		...buttons
	];

	if (ENV.CURRENT_ENV != "prod") {
		_buttons.unshift({
			text: "Debug",
			handler: () => {
				me.presentModal(pages.vvsdebugger, { data: ticket });
			}
		});
		_buttons.unshift({
			text: "Open eClaim",
			handler: async () => {
				me.httpService.getEClaimLink(ticket.currentTicketID)
					.subscribe(
						data => {
							logger.info(data);
							window.open(data.link, '_system', 'location=yes');
						},
						error => {
							logger.error(error);
						}
					);
			}
		});
	}

	return _buttons;
};

export const _presentEditOptions = (
	me: VVSApp,
	ticket: IFullTicket,
	from?: "modal"
) => {

	if (me.ably.state != "connected" || !navigator.onLine) {
		Taptic.error();
		me.httpService.presentPasswordAlert();
		return;
	}

	Taptic.light();

	const title = "Actions"; // t.EDIT_WITH_SPACE_AT_THE_END + t.SOMETHING_LOWER_CASE;

	const condButtons = [];

	// tslint:disable-next-line:no-console
	logger.info({ ticket });

	if (ticket.statusName === "PARK_INIT") {
		condButtons.push({
			text: "Cancel Park",
			handler: () => {
				me.httpService.parkCancel(ticket);
			}
		});
	}

	if (ticket.statusName === "PULL_INIT") {
		condButtons.push({
			text: "Cancel Pull",
			handler: () => {
				me.httpService.pullCancel(ticket);
			}
		});
	}

	if (ticket.statusName === "PARK" || ticket.statusName === "IN" || ticket.statusName == "PULL_REQUEST") { // || true) { // NOTE
		condButtons.push({
			text: "Edit " + t.PARK_LOCATION,
			handler: () => {
				// alert("Not Implemented");
				ModalService.editParkLocation(me, ticket);
			}
		});
	}

	// let buttons:ActionSheetButton[] = [
	const buttons: ActionSheetButton[] = getButtons(
		condButtons,
		me,
		ticket,
		"modal"
	);

	// me.presentSingleAlert("Edit is disabled.");
	//Edit is being disabled.
	me.presentActionSheet(title, buttons);
};
