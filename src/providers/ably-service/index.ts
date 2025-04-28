import { Logger } from '../vvs-controller/util/logger';
import { VVSApp } from '../vvs-controller/vvs-controller';
import * as Ably from 'ably';
import { isArray, isEmpty, forEach } from 'lodash';
import { ICurrentTicket, IRecentActivity, ITicketSequence, IProperty, IChat, IParkLocation } from '../../lib/vvs-bridge';
import Throttle from 'lodash-decorators/throttle';
import { RollbarService } from '../../services/rollbar';
// import { Observer } from 'rxjs/Observer';
import { Observable, Observer } from 'rxjs';
import { first } from 'rxjs/operators';
// import { fromEvent } from 'rxjs/observable/fromEvent';

export interface IAblyUpdate {
	CurrentTicket: ICurrentTicket&{ TicketSequence: ITicketSequence };
	RecentActivity: IRecentActivity|IRecentActivity[];
	ParkLocation: IParkLocation|IParkLocation[];
	currentTicketID: number;
	ChatMessage: IChat;
}

declare class AblyRealtime extends Ably.Realtime {
	options: {
		token: string;
	};
}

const logger = Logger.get("AblyService");

export class AblyService {


	public static instance: AblyService;
	public static get(vvsApp: VVSApp) {
		return AblyService.instance || (AblyService.instance = new AblyService(vvsApp));
	}

	ably: AblyRealtime;

	currentProperty: IProperty;

	channel: any; //Ably.Types.RealtimeChannelCallbacks; // any; // Ably.Types.RealtimeChannelPromise;

	firstConnectedObserver: Observer<number>;
	
	constructor(private vvsApp: VVSApp) {

		// fromEvent(window, "beforeunload")
		// .subscribe( (event: any) => {
		// 	logger.error("beforeunload", event);
		// });

		new Observable( x => this.firstConnectedObserver = x )
		.pipe(
			first()
		)
		.subscribe(
			x => {
				logger.info("triggerUpdate");
				this.vvsApp.triggerUpdate();
			}
		);

	}

	get state() {
		return this.ably ? (AblyService.state = this.ably.connection.state) : "nil";
	}

	@Throttle(500)
	connect(token: string = this.vvsApp.user.AblyToken): void {
		logger.info("connect", token);

		if (this.ably) {
			if (this.ably.options.token == token) {
				return;
			}
		}

		if (isEmpty(token)) {
			return;
		}

		this.ably = new Ably.Realtime({
			token,
			useBinaryProtocol: true
		}) as AblyRealtime;

		// debugger;

		this.ably.connection
			.on('connected', (data: Ably.Types.ConnectionStateChange) => {
				this.vvsApp.toast(data.current, undefined);
				this.firstConnectedObserver.next(1);
			});

		this.ably.connection
			.on('failed', (data: Ably.Types.ConnectionStateChange) => {
				logger.error("failed >> ", data);
				if (data.reason.statusCode == 403) {
					this.refreshToken();
				}
			});
	}

	getChannelDefaultName() {
		if (isEmpty(this.vvsApp.stage)) {
			RollbarService.error(new Error("stage is undefined"));
			return;
		}
		return `${this.vvsApp.stage}:${this.vvsApp.propertyID}`;
	}

	subscribe() {

		const channelName: string = this.getChannelDefaultName();

		logger.info("subscribe channel: ", channelName);
		if (this.state !== "connected") {

			const user = this.vvsApp.user;

			if (isEmpty(user.AblyToken)) {
				logger.warn("Please, provide the token.");
				return false;
			} else {
				this.connect(user.AblyToken);
			}
		} 
		// else {
		// 	this.firstConnectedObserver.next(1);
		// }

		logger.info("channels", this.ably.channels);
		logger.info("this.ably.channels.all", (this.ably.channels as any).all);

		if ( !isEmpty((this.ably.channels as any).all) ) {
			forEach((this.ably.channels as any).all, channel => {
				if (channel && channel.name !== channelName) {
					channel.unsubscribe && channel.unsubscribe();
					// channel.off && channel.off(); // deprecated
				}
			});
		}

		this.channel = this.ably.channels.get(channelName + "");

		if ( isEmpty(this.channel.listeners) ) {
			this.channel
			.subscribe(
				(message: Ably.Types.Message) => {
					logger.warn("ably subscribe disabled", message);

					const event = message.name;
					const data: IAblyUpdate = message.data as any;

					this.update(event, data as any)
						.then( () =>
							logger.info("Successfully handled event", event, data)
						)
						.catch( (error: any) => RollbarService.error(error, "ably:update") );
				},
				(error: Ably.Types.ErrorInfo) => {

					if (error && error.code == 40171) {
						logger.info("error", error);
						return;
					}

					// do not report this error
					// RollbarService.error(error, "ably:subscribe");

				}
			);

		}

	}


	update(event: string, data: IAblyUpdate) {

		logger.info("ably-event", event, "data", data);

		const promises: Promise<any>[] = [];

		if ((data as any).updates) {
			this.vvsApp.doSync("ably-service.update", (data as any).updates);
		}

		if (data.currentTicketID) {

		} else {

		}

		if (data.ChatMessage) {
			promises.push(
				this.vvsApp.lss
				.insertChat(data.ChatMessage)
			);
		}

		if (data.CurrentTicket) {
			if (isArray(data.CurrentTicket)) {
				promises.push(
					this.vvsApp.lss
					.updateCurrentTicketData(
						event, ...data.CurrentTicket
					)
				);
			} else {
				logger.assert(!data.CurrentTicket.currentTicketID, "data.CurrentTicket.currentTicketID must be defined.");
				promises.push(
					this.vvsApp.lss
					.updateCurrentTicketData(
						event, data.CurrentTicket
					)
				);
			}
			// promises.push(
			// 	this.vvsApp.lss
			// 	.updateCurrentTicketData(
			// 		event, data.CurrentTicket
			// 		// {
			// 		// 	...data.CurrentTicket,
			// 		// 	// currentTicketID: data.CurrentTicket.currentTicketID // || data.currentTicketID
			// 		// },
			// 	)
			// );
		} else {

		}

		if (data.RecentActivity) {
			if (isArray(data.RecentActivity)) {
				promises.push(
					this.vvsApp.lss
					.updateRecentActivityData(
						...data.RecentActivity
					)
				);
			} else {
				promises.push(
					this.vvsApp.lss
					.updateRecentActivityData(
						data.RecentActivity
					)
				);
			}
		} else {

		}

		return Promise.all(promises)
		.then( () => {
			if (data.currentTicketID) {
				this.handleSingleTicket(data.currentTicketID);
				// return this.vvsApp.lss.getCurrentTicketByID(data.currentTicketID)
				// .then( (ticket) => {
				// 	if (!isEmpty(data.RecentActivity)) {
				// 		if (isArray(data.RecentActivity)) {
				// 			this.vvsApp.reactive.handleNewRecentActivity(ticket, ...data.RecentActivity);
				// 		} else {
				// 			this.vvsApp.reactive.handleNewRecentActivity(ticket, data.RecentActivity);
				// 		}
				// 	}

				// 	setTimeout( () => this.vvsApp.reactive.sendUpdatedTickets(data.currentTicketID), 1000 );

				// 	return ticket;
				// })
				// .catch(logger.error);
			} else {
				if (isArray(data.CurrentTicket)) {
					forEach(data.CurrentTicket, (cTicket) => {
						this.handleSingleTicket(data.currentTicketID);
					});
				} else if (data.CurrentTicket) {
					this.handleSingleTicket(data.CurrentTicket.currentTicketID);
				}
			}

			if (!isEmpty(data.ChatMessage)) {
				this.vvsApp.reactive.sendNewMessage(data.ChatMessage);
			}
		})
		.catch( reason => {
			RollbarService.error(reason, "ably:promiseall");
		})
		.then( () => {
			if (!isEmpty(data.RecentActivity)) {
				if (isArray(data.RecentActivity)) {
					this.vvsApp.reactive.handleNewRecentActivity(...data.RecentActivity);
				} else {
					this.vvsApp.reactive.handleNewRecentActivity(data.RecentActivity);
				}
			}
		})
		.catch( reason => {
			RollbarService.error(reason, "ably:promiseall");
		});
	}

	release() {
		const channel = this.getChannelDefaultName(); // this.vvsApp.propertyID;
		if (channel) {
			this.ably.channels.release(channel + "");
			this.channel = undefined;
		}

		if (this.channel && this.channel.unsubscribe()) {
			this.channel.unsubscribe();
		}
	}

	private static state: string;

	private refreshToken() {
		this.vvsApp
		.httpService
		.presentPasswordAlert()
		.then( (val) => val != false ? this.vvsApp.lss.getLoginUser() : undefined)
		.then( user => user && this.connect(user.AblyToken) );
	}

	private handleSingleTicket(ticketID: number) {
		return this.vvsApp.lss.getCurrentTicketByID(ticketID, AblyService.name)
		.then( (ticket) => {
			// if (!isEmpty(recentActivity)) {
			// 	if (isArray(recentActivity)) {
			// 		this.vvsApp.reactive.handleNewRecentActivity(ticket, ...recentActivity);
			// 	} else {
			// 		this.vvsApp.reactive.handleNewRecentActivity(ticket, recentActivity);
			// 	}
			// }

			setTimeout( () => this.vvsApp.reactive.sendUpdatedTickets(ticketID), 1000 );

			return ticket;
		})
		.catch(logger.error);
	}

}
