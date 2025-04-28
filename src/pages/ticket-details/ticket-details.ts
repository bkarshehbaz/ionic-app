import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IFullTicket } from '../../util/process-full-ticket';
import { Events, NavController, NavParams, IonicPage } from 'ionic-angular';
import { VVSApp, IActions } from '../../providers/vvs-controller/vvs-controller';
import { ICardNotesPhotosView } from '../../components/card-notes-photos-map-view/card-notes-photos-map-view.options';
import { includes, isEmpty, cloneDeep, merge, forEach, get } from "lodash";
import * as cf from "../../constants/constant-fields";
import { Logger } from '../../providers/vvs-controller/util/logger';
// import { getBalance } from '../../util/get-balance';
import { parseJSON } from '../../util/parse-json';
import { pages } from '../index';
import * as cat from './../../constants/event-categories';
import { getAllowedOperations, IAllowedOperation } from '../../util/ticket/get-allowed-operations';
import { GlobalSearch } from '../global-search/global-search';
import { takeWhile } from 'rxjs/operators';
import { getStatusDescription } from '../../util/get-status-description';
import { Taptic } from '../../providers/haptic-service';
import { RollbarService } from '../../services/rollbar';
import { ITicketType, NumericMap, ICurrentTicket } from '../../lib/vvs-bridge';
import { to } from '../../util/to';
import moment from 'moment';
import { getBalance } from '../../util/get-balance';

const logger = Logger.get("ticket-details");

// tslint:disable-next-line:max-line-length
const thisSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAl4AAACZCAYAAAD+UzSjAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4QUFAzQaqvypEQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEIElEQVR42u3c0W3DMAxF0bjICB7OQ3gc79su0AYJUdKSeM4IhD8unoI8HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArW1OQGfXdX27Ar85z3Pzjf3tOA4fCbxh3/dNeCGeAPEEN4TX00kQViCsgBrCC5EFIgsQXggtQGiB8AKRBSILEF6ILRBbgPBCbAFiC4SXEyC2QGwBwgvBBYILEF6ILVcAsQUILwQXCC5AeCG4QHABwgsEFwguQHghuEBwAcILwQUILuBjX06A6ALRBdSweAkuwQWCCyhi8RJdgOgCili8BBcguIAiFi/RBYguQHghukB0AWvx1Ci4AMEFFLF4iS5AdAHCC9EFogsQXoguEF0AwgvRBaILEF6ILhBdgPByAtEFokt0AcIL0QWiCxBeiC4QXQCf8weqggsEF0ARixcAgPDiFWsXxFi7AOGF6ALRBQgvRBeILgDhJboA0QUIL0QXiC4A4SW6QHQBCC8AAOHFzaxdEGPtAoQXogtEFyC8EF0gugCEl+gCRBcgvAAAEF4Ts3ZBjLULEF6ILhBdAMILAEB4NWXtghhrFyC8EF0gugCEl+gC0QUgvAAAhBdZrF0QY+0ChBeiC0QXgPACABBeTVm7IMbaBQgvRBeILgDhBQAgvJqydkGMtQsQXoguEF0AwgsAQHg1Ze2CGGsXILwQXSC6AIQXAIDwasraBTHWLkB4AQAgvEZk7YIYaxcgvBBdILoAhBcAgPBqytoFMdYuQHghukB0AQgvAADh1ZS1C2KsXYDwQnSB6AIQXgAAwqspaxfEWLsA4YXoAtEFILwAAIRXU9YuiLF2AcIL0QWiC0B4iS4QXQDCCwAA4ZXF2gUx1i4A4SW6QHQBCC8AAOHVlLULYqxdAMJLdIHoAhBeogtEF4DwAgBAeGWxdkGMtQtAeIkuEF0Awkt0gegCEF6iCxBdAMJLdIHoAhBeAAAIr1esXRBj7QIQXqILRBeA8BJdILoAhJfoAkQXgPASXSC6AISX6ALRBYDwEl0gugCEl+gC0QUgvEQXILoAhJfoAtEFILxEF4guAISX6ALRBSC8RBeILgDhJbpAdDkCgPASXSC6AISX6ALRBcAHnoILBBcANaZevEQXiC4A4SW6QHQBsEZ4iS4QXQAzmuo3XoILBBfAzKZZvEQXiC4A4SW6QHQB8JahnxoFFwgugJUMu3iJLhBdAKsZbvESXCC4AFY11OIlukB0AaxsiMVLcIHgAhBeggsEFwD/5ranRtEFogugm/LFS3CB4AIQXoILBBcAc4eX4ALBBUByeAkuEFwAJIeX4ALBBUByeAkuEFwAJIeX4ALBBUBieIktEFsAJIeX4ALBBUBieIktEFsAJIeX4ALBBUBieIktEFsAJIaX2AJxBUCNH9NbyU7IQNrfAAAAAElFTkSuQmCC";

@IonicPage({
	name: "ticket-details",
	priority: "high"
})
@Component({
	selector: "ticket-details",
	templateUrl: "./ticket-details.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailsPage implements OnInit, OnDestroy {
	public title: string = "";

	public config = {} as ICardNotesPhotosView;

	ticket: IFullTicket; // = {} as IFullTicket;
	from: "search";

	showTicketNumberCol = true;

	public operations: {
		action: () => any,
		enable: boolean,
		hidden: boolean,
		label: string
	}[] = [];

	public status: string;

	is_iPad: boolean;


	get thisSrc() {
		return thisSrc;
	}

	// tslint:disable-next-line: member-ordering
	constructor(
		public vvsApp: VVSApp,
		private navParams: NavParams,
		private events: Events,
		private navCtrl: NavController,
		private cdr: ChangeDetectorRef
	) {

		this.is_iPad = this.vvsApp.platform.is("ipad");

		this.ticket = cloneDeep(this.navParams.get(cf.ticket));

		// this.ticket.Payment.complete = 0;
		// this.ticket.balance = 0;
		// debugger;
		// this.from = this.navParams.get("from") || this.from;

		// tslint:disable-next-line:no-console
		// logger.info(JSON.stringify(this.ticket, null, 3));

		if (isEmpty(this.ticket)) {
			this.popToTabs();
			return;
		}

		this.refreshView();

		logger.info("operations", this.operations);




		if (isEmpty(this.ticket)) {

			this.popToTabs();

		} else {

			// if (!this.ticket.TicketType) {
			//     this.vvsApp.lss.getTicketTypeData().then( (ticket) => this.refreshView() );
			// } else {
			this.refreshView();
			// }

		}

	}

	ngOnDestroy() {
		this.isDestroyed = true;
	}

	ionViewWillEnter() {
		logger.info("ionViewWillEnter");
		this.vvsApp.dismissLoading('view-enter-details');
	}

	vvsViewWillReenter() {
		this.ionViewWillEnter();
	}

	ionViewDidEnter() {
		logger.info("ionViewDidEnter");
		// this.vvsApp.dismissLoading('view-enter-details');

		const name = get(this.navCtrl, "_views[0].data.component.name");
		if (name == GlobalSearch.name) {
			this.from = "search";
			this.cdr.markForCheck();
		}

		const activePage = this.vvsApp.app;

		if (activePage) {
			// debugger;
			logger.info("activePage", activePage);
		}

		this.vvsApp.httpService.doSync();

	}

	goBack() {
		this.showTicketNumberCol = false;
		// alert("Going back");
		if (this.from === "search") {
			this.navCtrl.pop();
		} else {
			this.navCtrl.popToRoot();
		}
	}


	popToTabs() {
		this.navCtrl.setRoot(pages.tabs).catch(logger.e);
	}

	ngOnInit() {
		this.vvsApp.reactive.tickets
			.pipe(takeWhile(_ => !this.isDestroyed))
			.subscribe((event) => {
				// logger.info("services.tickets", event, JSON.stringify(event, null, 3));
				switch (event.category) {
					case cat.SINGLE_TICKETS:
						// debugger;
						forEach(event.data, (ticket: IFullTicket) => {
							if (this.ticket && ticket && this.ticket.currentTicketID == ticket.currentTicketID) {
								this.refreshView(ticket);
							}
						});
				}
			});
	}

	handleCurrentTicketUpdate(currentTicketIDs: number[]) {
		// throw new Error("Not Implemented!");
		if (!this.ticket || !this.ticket.currentTicketID) {
			// tslint:disable-next-line:no-debugger
			logger.debug();
			logger.w("ticketID is empty");
			logger.i(this);
		}

		logger.i("currentTickeUpdate 136", { currentTicketIDs });
		if (includes(currentTicketIDs, this.ticket.currentTicketID)) {
			this.vvsApp.lss.getCurrentTicketByID(this.ticket.currentTicketID, TicketDetailsPage.name)
				.then((data: IFullTicket) => {
					this.refreshView(data);
				})
				.catch(logger.e);

		}
	}

	async refreshView($ticket = {} as IFullTicket) {

		this.ticket = merge({}, this.ticket, $ticket);

		// if (this.ticket.TicketType) {
		// 	const [ttypes] = await to<NumericMap<ITicketType>>(this.vvsApp.lss.getTicketTypeData());
		// 	if (ttypes && ttypes[this.ticket.ticketTypeID]) {
		// 		this.ticket.TicketType = ttypes[this.ticket.ticketTypeID];
		// 	}
		// }

		if (!this.ticket.TicketSequence) {
			RollbarService.error("ASSERT ticket-details", { currentTicketID: this.ticket.currentTicketID });
		}

		this.ticket.TicketSequence.images = parseJSON(this.ticket.TicketSequence.images as any, []);

		// debugger;
		this.ticket.balance = getBalance(this.ticket);
		this.config = this.vvsApp.getCardConfig(this.ticket) || this.config;

		this.refreshOperations();

		this.cdr.markForCheck();
	}

	allowed(operation: IAllowedOperation) {
		return operation.allowed || operation.mine;
	}

	async refreshOperations() {
		const hidden = this.ticket.isDeparted == 1;

		try {
			const { checkIn, checkOut, park, pay, pull, pullRequest, resendEclaim } =
				await getAllowedOperations(this.ticket, this.vvsApp);

			logger.info(this.ticket);

			this.setStatus();
			const selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));

			console.log("selectedProperty", selectedProperty);
			console.log("this.ticket", this.ticket);

			this.operations = [
				{
					action: () => this.performAction("rcheckin"),
					enable: this.allowed(checkIn),
					hidden,
					label: "Check-In"
				},
				{
					action: () => this.performAction("checkout"),
					enable: this.allowed(checkOut),
					hidden,
					label: "Check-Out"
				},
				{
					action: () => this.performAction("pull"),
					enable: this.allowed(pull),
					hidden,
					label: "Pull"
				},
				{
					action: () => this.performAction("park"),
					enable: this.allowed(park),
					hidden,
					label: "Park"
				},
				...(selectedProperty && selectedProperty.hotelID && this.ticket.TicketType && this.ticket.TicketType.isHotel == 1
					? []
					: [
						{
							action: () => this.performAction("pay"),
							enable: this.allowed(pay),
							hidden,
							label: "Pay"
						}
					]),
				{
					action: () => this.performAction("pullRequest"),
					enable: this.allowed(pullRequest),
					hidden,
					label: "Pull Request"
				},
				{
					action: () => this.performAction("resendEclaim"),
					enable: true,
					hidden,
					label: "Resend Eclaim"
				},
				{
					label: "Add Car",
					action: () => this.performAction("add_car"),
					// icon: "car",
					hidden: hidden || !(!this.ticket.Car || !this.ticket.Car.makeID),
					enable: !this.ticket.Car || !this.ticket.Car.makeID
					// disabled: // false,
				},
				// {
				// 	action: () => this.vvsApp.presentConfirm("Are you sure...?"),
				// 	enable: true, //includes(allowedOperations, "****************************"),
				// 	hidden,
				// 	label: "Request"
				// },

				// {
				// 	action: () => this.performAction("recover"),
				// 	enable: this.ticket.isDeparted == 1,
				// 	hidden: this.ticket.isDeparted == 0,
				// 	label: "Recover"
				// }

			];

		} catch (e) {
			RollbarService.error(e);
		}

	}

	/**
	 * performAction description
	 * @param  {[type]} action [description]
	 * @return {[type]}        [description]
	 */
	public performAction(action: IActions) {
		if (this.ticket.isDeparted == 1) {
			this.vvsApp.presentSingleAlert("The customer has departed.");
			return;
		}
		logger.i("performAction", action);
		Taptic.light();
		this.vvsApp.performOperation({ action, ticket: this.ticket });
	}

	setStatus() {
		getStatusDescription(this.vvsApp, this.ticket)
			.then((message: string) => {
				this.status = this.ticket.isDeparted == 1 ? "The customer has departed." : message;

				this.cdr.detectChanges();
			});
		// if (this.ticket) {
		// 	if (this.ticket.statusName == "PARK_INIT") {
		// 		this.vvsApp.lss.getPropertyUserData()
		// 		.then( (users) => {
		// 			const user = users[this.ticket.TicketSequence.parkUserID];
		// 			if (user) {
		// 				return this.status = this.ticket.statusDescription + " by " + user.userFirstName + " " + user.userLastName;
		// 			}
		// 		})
		// 		.catch(logger.error)
		// 	}
		// }

		// // return this.asyncPipe.transform(this.myApiService.getText(key));

		// return this.status = this.ticket.statusDescription;
	}

	private isDestroyed = false;

}
