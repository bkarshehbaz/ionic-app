import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from 'rxjs';
import { IObservableData, NumericMap, IUser, IChat, IRecentActivityObservableData, IRecentActivityItem, ILicenseID, ICurrentTicket, IRecentActivity, IRecentActivityType } from "../../lib/vvs-bridge";
import { IFullTicket } from "../../util";
import { Logger } from "../vvs-controller/util/logger";
import * as cat from '../../constants/event-categories';
import { forEach, cloneDeep, delay as _delay } from "lodash";
import { VVSApp } from "../vvs-controller/vvs-controller";

export interface IServices {
    tickets: Subject<IObservableData <NumericMap<IFullTicket | IFullTicket[]> >>;
    // tab: Observable<IObservableData>;
    chat: Subject<IObservableData<IChat>>;
    form: Subject<IObservableData<{ticketNumber?: string, license?: ILicenseID}>>;
    app: Subject<IObservableData<{loginUser: IUser}>>;
    // ticketView: Subject<IObservableData>;
    recentActivity: Subject<IObservableData<IRecentActivityObservableData|IRecentActivityItem>>;
}

const logger = Logger.get("ReactiveService");

@Injectable()
export class ReactiveService implements IServices {

	tickets: Subject<IObservableData <NumericMap<IFullTicket> >> = new Subject();
	chat: Subject<IObservableData<IChat>> = new Subject();
	form: Subject<IObservableData<{ticketNumber?: string, license?: ILicenseID}>> = new Subject();
	app: Subject<IObservableData<{loginUser: IUser}>> = new Subject();
	recentActivity: Subject<IObservableData<IRecentActivityObservableData|IRecentActivityItem>> = new Subject();

	constructor(private vvsApp: VVSApp) {}

	sendHomeTickets(tickets = {} as NumericMap<IFullTicket>): void {
		this.tickets.next({
			category: cat.HOME_TICKETS,
			data: tickets
		});
    }

    /*
    * Chat Observable
    */
    sendMessagesToChat(): void {
		this.chat.next({ category: cat.CHAT_NEW_MESSAGES });
	}

	sendNewMessage(chat: IChat) {
		this.chat.next({ category: cat.CHAT_NEW_MESSAGE, data: chat });
		if (this.vvsApp.getCurrentTab() != 1) { // chat
			if (this.vvsApp.userID != chat.userID) {
				this.addChatBadge(chat);
			}
		}
	}

	addChatBadge(...chats: IChat[]) {
		forEach(chats, chat => {
			if (chat.userID && this.vvsApp.userID != chat.userID) {
				this.vvsApp.chatBadge.add(chat.chatID);
			}
		});
	}
	addRecentBadge(...ras: IRecentActivity[]) {
		forEach(ras, ra => {
			if (ra.userID && this.vvsApp.userID != ra.userID) {
				this.vvsApp.recentActivityBadge.add(ra.recentActivityID);
			}
		});
	}

	/*
     * Form Observable
     */
    newCheckInFromTab(ticketNumber: string, license: ILicenseID) {
		// this.clearLastTicket();
		this.form.next({
			category: cat.NEW_SCAN_TICKET,
			data: {
				ticketNumber,
				license
			}
		});
	}

	/*
     * App Component Observable
     */
   	onPropertySelected(): void {
		this.app.next({
			category: cat.FIRST_TIME_LOGIN,
			data: {
				loginUser: cloneDeep(this.vvsApp.user) as IUser
			}
		});
	}

	/*
     * RecentActivity Observables
     */
    sendRecentActivities(): void {
		this.recentActivity.next({ category: cat.RECENT_ACTIVITIES });
	}

	updateSingleRecentActivity(recentActivity: IRecentActivityItem, from: string) {
		this.addRecentBadge(recentActivity);
		this.sendRecentActivities();
	}

    sendUpdatedTickets = (...currentTicketIDs: number[]) => {
		// logger.info("sendUpdatedTickets", currentTicketIDs);
        const tickets: IFullTicket[] = [];

        return this.vvsApp.lss
		.getCurrentTicketData()
		.then( (ticketObj) => {
			forEach(currentTicketIDs, (currentTicketID) => {
				// debugger;
				if (ticketObj[currentTicketID]) {
					tickets.push(ticketObj[currentTicketID]);
				}
			});

			this.tickets.next({
				category: cat.SINGLE_TICKETS,
				data: tickets || []
			});
		});
	}


	handleNewRecentActivity(...recentActivities: IRecentActivity[]) {
		return this.vvsApp.lss
		.getRecentActivityTypeData()
		.then( (_rAT: NumericMap<IRecentActivityType>) => {

			forEach(recentActivities, (recentActivity) => {

				_delay( () => {
					// debugger;

					// tslint:disable-next-line:no-debugger
					// const rAI: IRecentActivityItem =
					// getRecentActivityItem(
					// 	_rAT[recentActivity.recentActivityTypeID],
					// 	recentActivity,
					// 	currentTicket,
					// 	0
					// );
					this.updateSingleRecentActivity(recentActivity, "handleNewRecenActivity");
				}, 1000);

			});

		})
		.catch(logger.e);
    }

}
