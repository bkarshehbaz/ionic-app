// /*
//  * Copyright (c) 2017 VVS LLC
//  *
//  * Author: Lucas Estrella
//  */
// import { Observable } from 'rxjs';
// import { Subject } from 'rxjs';
// import { SocketLSS } from '../socket-lss/socket-lss';
// import { SocketCallback, SocketClient } from './socket-service.options';


// import { forEach, isNil } from 'lodash';
// import * as io from 'socket.io-client';

// import { ENV } from "../../environments";

// import * as vvsBridge from '../../lib/vvs-bridge';
// import * as RI from '../../lib/vvs-bridge/api-return';
// import * as CHT from '../../lib/vvs-bridge/chat';
// import * as SCRI from '../../lib/vvs-bridge/socket';


// import * as SocketEvents from '../../constants/socket-events';

// import { VVSApp } from "../vvs-controller/vvs-controller";

// import { uuid } from "@util/index";

// import * as SocketStatus from '../../enums/socket-status';

// import { debounceTime } from 'rxjs/operators';
// import { ILogger, Logger } from '../../providers/vvs-controller/util/logger';
// let logger: ILogger;

// let socket: SocketIOClient.Socket;
// // let socket: SocketClient; // SocketIOClient.Socket;
// let slss: SocketLSS;

// // let me: SocketService;
// //let on:(event:SocketEvents.VVSSocketEvent, data)=>void;

// /*
//   Generated class for the SocketService provider.
//   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
//   for more info on providers and Angular 2 DI.
// */
// // @Injectable()
// export class _SocketService {
//     socketObserver: any;
//     socketService: any;

//     userID: number;
//     propertyID: number;
//     currentProperty: vvsBridge.IProperty;

//     isConnected: boolean;
//     isAuthenticated: boolean;
// 	socketCurrentStatus: SocketStatus.SocketStatus;

// 	get socket() {
// 		return socket;
// 	}

// 	get connected() {
// 		return socket && socket.connected;
// 	}

//     constructor(private vvsApp: VVSApp) {
// 		logger = Logger.get(_SocketService.name);

//         this.socketService = new Observable( (observer) => {
//             this.socketObserver = observer;
//         });
//         this.vvsApp.lss.verifyIH();
//         slss = this.vvsApp.slss;
//     }

// 	initialize(token: string, propertyID: number, userID: number, cb?: SocketCallback) {
// 		logger.info("initialize", arguments);
//         this.connect();
//         this.initSocketEvents(token, propertyID, userID);
//     }

//     authenticate(token: string) {
//         socket.emit("authenticate", {token});
//     }

//     connect() {
// 		const connectOpts: SocketIOClient.ConnectOpts = {};
// 		connectOpts.transports = ['websocket'];
// 		connectOpts.reconnection = true;
// 		connectOpts.reconnectionDelay = 1000;
// 		connectOpts.reconnectionAttempts = Infinity;
// 		connectOpts.secure = true;
// 		connectOpts.forceNew = true;
//         socket = io.connect(this.getSocketHost(), connectOpts);
// 	}

// 	getSocketHost() {
// 		return `http://${this.vvsApp.apiHost || ENV.apiHost}`;
// 	}

//     /*
//      * Socket Listeners opens
//      */


// 	/***************************************************************************
// 	 * Park Receiver ***********************************************************
// 	 ***************************************************************************/
//     parkEvents() {
//         socket.on(SocketEvents.ParkInit, (ticket: RI.IParkInit) => {
//             slss.ParkInit(ticket);
//         });

//         socket.on(SocketEvents.ParkCancel, (ticket: RI.IParkCancel) => {
//             slss.ParkCancel(ticket);
//         });

//         socket.on(SocketEvents.Park, (ticket: RI.IPark) => {
//             // logger.debug("parkEvents","SocketEvents.Park",SocketEvents.Park,ticket);
//             if (this.isMine(ticket.TicketSequence[0].parkUserID)) {
//                 logger.l("You received your park event, but no action taken from here", ticket);
//             } else {
//                 slss.Park(ticket);
//             }
//         });
//     }


// 	/***************************************************************************
// 	 * Checkout Receiver *******************************************************
// 	 ***************************************************************************/
//     checkoutEvents() {
//         socket.on(SocketEvents.CheckOutInit, (ticket: RI.ICheckOutInit) => {
//             slss.CheckOutInit(ticket);
//         });

//         socket.on(SocketEvents.CheckOutCancel, (ticket: RI.ICheckOutCancel) => {
//             slss.CheckOutCancel(ticket);
//         });

//         socket.on(SocketEvents.CheckOut, (ticket: RI.ICheckOut) => {
//             // logger.debug("checkoutEvents","checkoutEvents.CheckOut",SocketEvents.CheckOut);
//             if(this.isMine(ticket.TicketSequence[0].checkOutUserID)) {
//                 logger.l("You received your checkout event, but no action taken from here", ticket);
//             } else {
//                 slss.CheckOut(ticket);
//             }
//         });
//     }


// 	/***************************************************************************
// 	 * Pull Receiver ***********************************************************
// 	 ***************************************************************************/
//     pullEvents() {
//         socket.on(SocketEvents.PullInit, (ticket: RI.IPullInit) => {
//             slss.PullInit(ticket);
//         });

//         socket.on(SocketEvents.PullRequest, (ticket: RI.IPullRequest) => { // CT.TaskBase) => {
//             slss.PullRequest(ticket);
//         });

//         socket.on(SocketEvents.PullCancel, (ticket: RI.IPullCancel) => {
//             slss.PullCancel(ticket);
//         });

//         socket.on(SocketEvents.Pull, (ticket: RI.IPull) => {
//             // logger.debug("checkoutEvents","checkoutEvents.CheckOut",SocketEvents.CheckOut);
//             if(this.isMine(ticket.TicketSequence[0].pullUserID)) {
//                 logger.l("You received your pull event, but no action taken from here", ticket);
//             } else {
//                 slss.Pull(ticket);
// 			}
// 		});
//     }




// 	/***************************************************************************
// 	 * Checkin Receiver ********************************************************
// 	 ***************************************************************************/
//     checkinEvents() {
//         socket.on(SocketEvents.CheckIn, (ticket: RI.ICheckIn) => {
//             if (this.isMine(ticket.TicketSequence[0].checkInUserID)) {
//                 logger.l("You received the ticket you posted, but no action taken from here", ticket);
//             } else {
//                 slss.CheckIn(ticket);
//             }
//         });
//         // socket.on(SocketEvents.CheckInInit, (ticket: RI.ICheckInInit) => {
//         //     slss.checkInInitEmit(ticket);
//         // });
//         socket.on(SocketEvents.CheckInCancel, (ticket: RI.ICheckInCancel) => {
//             slss.CheckInCancel(ticket);
//         });
//     }



// 	/***************************************************************************
// 	 * CheckinReturn Receiver **************************************************
// 	 ***************************************************************************/
//     checkinReturningEvents() {
//         socket.on(SocketEvents.ReturningCheckIn, (ticket: RI.ICheckInReturning) => {
// 			if (this.isMine(ticket.TicketSequence[0].checkInUserID)) {
//                 logger.l("You received the ticket you posted, but no action taken from here", ticket);
//             } else {
//                 slss.ReturningCheckIn(ticket);
//             }
//         });
//         socket.on(SocketEvents.ReturningCheckInInit, (ticket: RI.ICheckinInitReturning) => {
//             slss.ReturningCheckInInit(ticket);
//         });
//         socket.on(SocketEvents.ReturningCheckInCancel, (ticket: RI.ICheckInReturningCancel) => {
//             slss.ReturningCheckInCancel(ticket);
//         });
//     }



//     chatEvents() {
//         socket.on("receive-message", (msg: any) => {
//             this.vvsApp.lss.setSingleMessage(msg);
//             this.socketObserver.next({ category: 'message', message: msg });
//         });
//     }

//     // singleTicketEvents() {
//     //     socket.on(SocketEvents.ReturnBalance, (data: {balance: number, currentTicketID: number}) => {
//     //         slss.updateBalance(data.balance, data.currentTicketID);
//     //     });
//     // }


//     initSocketEvents(token: string, propertyID: number, userID: number) {

//         // logger.l("token: string, propertyID: number", token.substring(0, 15), propertyID);
//         socket.on("connect", () => {
// 			// this.onlineSubject.next(true);
// 			this.isConnected = true;
// 			// this.onlineSubject.next(true);
//             // logger.w"onConnect");
//             // socket.emit("callbackTEST", {data:"Lucas"}, (data) => {
//             //     logger.w"data >>> ", data, cb);
//             //     this.vvsApp.presentSingleAlert("I just joined! \n" + JSON.stringify(data, null, 3) );
//             // });

//             this.setCurrentSocketStatus(SocketStatus.CONNECTED);

// 			// this.overrideOnEvent();

//             socket.on("authenticated", () => {
//                 logger.i("authenticated");
//                 this.isAuthenticated = true;
//                 socket.emit("join", propertyID, userID);
//                 this.propertyID = propertyID;
//                 this.userID = userID;
//                 this.setCurrentSocketStatus(SocketStatus.AUTHENTICATED);
//             });

//             socket.on("unauthorized", (args: any) => {
//                 logger.i("unauthorized", args);
//                 this.isAuthenticated = false;
//                 this.setCurrentSocketStatus(SocketStatus.UNAUTHORIZED);

// 				this.refreshToken(propertyID, userID);

//             });

//             socket.on("joined", (data) => {
//                 logger.i("joined");
//                 this.checkinEvents();
//                 this.checkinReturningEvents();
//                 this.checkoutEvents();
//                 this.pullEvents();
//                 this.parkEvents();
//                 this.chatEvents();
//                 // this.singleTicketEvents();
// 			});

// 			this.authenticate(token);

//         });

//         socket.on("reconnecting", (msg: any) => {
//             this.isConnected = false;
//             this.setCurrentSocketStatus(SocketStatus.RECONNECTING);
//         });

//         socket.on("reconnect_error", (msg: any) => {
//             this.isConnected = false;
//             this.setCurrentSocketStatus(SocketStatus.RECONNECT_ERROR);
//         });

//         socket.on("reconnect_failed", (msg: any) => {
//             this.isConnected = false;
//             this.setCurrentSocketStatus(SocketStatus.RECONNECT_FAILED);
//         });

//         socket.on('disconnect', () => {
// 			// this.onlineSubject.next(false);
//             this.isConnected = false;
//             this.setCurrentSocketStatus(SocketStatus.DISCONNECTED);
//         });

//         // socket.on('error', function (err) {
//         //     logger.i("Error");
//         // });
//     }

//     getCurrentSocketStatus() {
//         return this.socketCurrentStatus;
//     }
//     setCurrentSocketStatus(status: SocketStatus.SocketStatus) {
//         this.socketCurrentStatus = status;
//     }

//     sendMessage(message: CHT.IChat, cb: SocketCallback) {
//         const imagesToDB = [];
//         const imagesToS3 = [];
//         forEach(message.msgImage, msgImage => {
//             const uid = uuid();
//             imagesToDB.push({uid});
//             imagesToS3.push({uid, data: msgImage});
//         });


//         const newMessage: CHT.IChat = {} as CHT.IChat;
//         newMessage.msgContent = message.msgContent;
//         newMessage.sent = message.sent;
//         newMessage.userID = message.userID;
//         newMessage.msgImage = imagesToDB;
//         // delete message.msgImage;
//         // message.msgImage = imageToS3;

//         const msgObject = { message: newMessage, imagesToS3, ...this.vvsApp.lss.getIH()};


//         this.emit('send-message', msgObject, ( data: any) => {
//             logger.i("message send", { data });
//             // this.socketObserver.next({ category: 'message', message });

//             cb(data);
//         });
//     }

// 	/***************************************************************************
// 	 * Check-In Emitter ********************************************************
// 	 ***************************************************************************/
//     // checkInInit(ticketNumber: string, cb: SocketCallback) {
//     //     const data: SCRI.ICheckInInit = {
//     //         ticketNumber,
//     //         userID: this.userID,
//     //         propertyID: this.propertyID
//     //     } as SCRI.ICheckInInit; // no currentTicketID
//     //     this.emit(SocketEvents.CheckInInit, data, cb);
//     // }
//     checkInCancel(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.ICheckInCancel = this._getSocketEventBase(currentTicketID) as SCRI.ICheckInCancel;
//         this.emit(SocketEvents.CheckInCancel, data, cb);
//     }


// 	/***************************************************************************
// 	 * Pull Emitter ************************************************************
// 	 ***************************************************************************/
//     pullInit(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.IPullInit = this._getSocketEventBase(currentTicketID) as SCRI.IPullInit;
//         this.emit(SocketEvents.PullInit, data, cb);
//     }
//     pullCancel(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.IPullCancel = this._getSocketEventBase(currentTicketID) as SCRI.IPullCancel;
//         this.emit(SocketEvents.PullCancel, data, cb);
//     }

// 	/***************************************************************************
// 	 * CheckOut Emitter ********************************************************
// 	 ***************************************************************************/
//     checkOutInit(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.ICheckOutInit = this._getSocketEventBase(currentTicketID) as SCRI.ICheckOutInit;
//         this.emit(SocketEvents.CheckOutInit, data, cb);
//     }
//     checkOutCancel(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.ICheckOutCancel = this._getSocketEventBase(currentTicketID) as SCRI.ICheckOutCancel;
//         this.emit(SocketEvents.CheckOutCancel, data, cb);
//     }


// 	/***************************************************************************
// 	 * Park Emitter ************************************************************
// 	 ***************************************************************************/
//     parkInit(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.IParkInit = this._getSocketEventBase(currentTicketID) as SCRI.IParkInit;
//         this.emit(SocketEvents.ParkInit, data, cb);
//     }
//     parkCancel(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.IParkCancel = this._getSocketEventBase(currentTicketID) as SCRI.IParkCancel;
//         this.emit(SocketEvents.ParkCancel, data, cb);
//     }


// 	/***************************************************************************
// 	 * Pay Emitter *************************************************************
// 	 ***************************************************************************/
//     payInit(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.IPayInit = this._getSocketEventBase(currentTicketID) as SCRI.IPayInit;
//         this.emit(SocketEvents.PayInit, data, cb);
//     }
//     payCancel(currentTicketID: number, cb: SocketCallback) {
//         const data: SCRI.IPayCancel = this._getSocketEventBase(currentTicketID) as SCRI.IPayCancel;
//         this.emit(SocketEvents.PayCancel, data, cb);
//     }

//     emit(event: SocketEvents.VVSSocketEvent, data: any, cb: SocketCallback) {
// 		// logger.debug();
//         logger.l("this.getCurrentSocketStatus() >>> ", this.getCurrentSocketStatus(), event, data, cb, socket);
//         // if (this.isConnected && this.isAuthenticated) {
// 		// logger.debug();
//         if (!isNil(socket) && socket.connected === true) {
//             socket.emit(event, data, cb);
//         } else {
//             // this.vvsApp.toast("You are disconnected");
//             cb("You are disconnected");
// 			logger.l("You are disconnected");
// 			// this.initialize()
// 			// this.initialize();
// 			// this.refreshToken();
//         }
//     }

//     private _getSocketEventBase = (currentTicketID) => ({ currentTicketID, userID: this.userID, propertyID: this.propertyID });

//     private isMine(userID) {
//         // tslint:disable-next-line:triple-equals
//         return userID == this.userID;
// 	}

// 	private refreshToken(propertyID: number = this.propertyID, userID: number = this.userID) {
// 		this.vvsApp
// 		.httpService
// 		.presentPasswordAlert(undefined, undefined, (token: string) => {
// 			// this.connect();
// 			// alert(token);
// 			this.initialize(token, propertyID, userID);
// 		});
// 	}

// 	// private overrideOnEvent() {
// 	// 	const originalOnEvent = socket.onevent;
// 	// 	/**
// 	// 	 * @name Middleware
// 	// 	 * @description intercepts all calls, return 0 if the currentUser is the user
// 	// 	 */
// 	// 	socket.onevent = (packet) => {
// 	// 		if (packet && packet.data && packet.data.length >= 2) {

// 	// 			const [ eventName, eventData ] = packet.data;

// 	// 			if ( !eventData || (eventData && eventData.userID !== this.userID) ) { // tslint:disable-line:triple-equals
// 	// 				// if invoke .apply instead of .call, then we get "Cannot read property 'data' of undefined"
// 	// 				originalOnEvent.call(socket, packet);
// 	// 			} else {
// 	// 				logger.l( { myUserID: this.userID, eventName, eventData } );
// 	// 			}

// 	// 		} else {
// 	// 			// if invoke .apply instead of .call, then we get "Cannot read property 'data' of undefined"
// 	// 			originalOnEvent.call(socket, packet);
// 	// 		}
// 	// 	};

// 	// 	return 1;
// 	// }

// }
