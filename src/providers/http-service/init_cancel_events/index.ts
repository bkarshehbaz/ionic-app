import * as SCRI from '../../../lib/vvs-bridge/socket';
import { IFullTicket } from '../../../util';

import * as SocketEvents from '../../../constants/socket-events';
import { VVSApp } from '../../vvs-controller/vvs-controller';
// import { VVSSocketEvent } from '../../constants/socket-events';

type AblyPublishCallback = <T>(data: T) => void; // (status: PubNub.PublishStatus, response: PubNub.PublishResponse) => void;

export type IOperation =
"CheckInCancel" |
"CheckInInit" |

"CheckOutCancel" |
"CheckOutInit" |

"ParkCancel" |
"ParkInit" |

"PayCancel" |
"PayInit" |

"PullCancel" |
"PullInit" |

"ReturningCheckInInit";

export class InitCancelEvents {

    protected vvsApp: VVSApp;


	/***************************************************************************
	 * Check-In Emitter ********************************************************
	 ***************************************************************************/
    // checkInInit(ticketNumber: string, cb: AblyPublishCallback) {
    //     const data: SCRI.ICheckInInit = {
    //         ticketNumber,
    //         userID: this.userID,
    //         propertyID: this.propertyID
    //     } as SCRI.ICheckInInit; // no currentTicketID
    //     this.emit(SocketEvents.CheckInInit, data, cb);
	// }

    // checkInInit(currentTicketID: number, cb: AblyPublishCallback) {
    //     const data: SCRI.ICheckInInit = this._getSocketEventBase(currentTicketID) as SCRI.ICheckInInit;
    //     this.emit(SocketEvents.CheckInInit, data, cb);
    // }

    // checkInCancel(currentTicketID: number, cb: AblyPublishCallback) {
    //     const data: SCRI.ICheckInCancel = this._getSocketEventBase(currentTicketID) as SCRI.ICheckInCancel;
    //     this.emit(SocketEvents.CheckInCancel, data, cb);
    // }

	/***************************************************************************
	 * Pull Emitter ************************************************************
	 ***************************************************************************/
    pullInit(ticket: IFullTicket, cb: AblyPublishCallback) {
		const data: SCRI.IPullInit = this._getSocketEventBase(ticket.currentTicketID) as SCRI.IPullInit;
        this.emit(SocketEvents.PullInit, data, cb);
    }
    pullCancel(ticket: IFullTicket, cb?: AblyPublishCallback) {
		const data: SCRI.IPullCancel = this._getSocketEventBase(ticket.currentTicketID) as SCRI.IPullCancel;
        this.emit(SocketEvents.PullCancel, data, cb);
    }


	/***************************************************************************
	 * CheckOut Emitter ********************************************************
	 ***************************************************************************/
    checkOutInit(currentTicketID: number, cb: AblyPublishCallback) {
        const data: SCRI.ICheckOutInit = this._getSocketEventBase(currentTicketID) as SCRI.ICheckOutInit;
        this.emit(SocketEvents.CheckOutInit, data, cb);
    }
    checkOutCancel(ticket: IFullTicket, cb: AblyPublishCallback) {
		const data: SCRI.ICheckOutCancel = this._getSocketEventBase(ticket.currentTicketID) as SCRI.ICheckOutCancel;
        this.emit(SocketEvents.CheckOutCancel, data, cb);
    }


	/***************************************************************************
	 * Park Emitter ************************************************************
	 ***************************************************************************/
    parkInit(ticket: IFullTicket, cb: AblyPublishCallback) {
		const data: SCRI.IParkInit = this._getSocketEventBase(ticket.currentTicketID) as SCRI.IParkInit;
        this.emit(SocketEvents.ParkInit, data, cb);
    }
    parkCancel(ticket: IFullTicket, cb?: AblyPublishCallback) {
		const data: SCRI.IParkCancel =  this._getSocketEventBase(ticket.currentTicketID) as SCRI.IParkCancel;
        this.emit(SocketEvents.ParkCancel, data, cb);
    }

	/***************************************************************************
	 * Pay Emitter *************************************************************
	 ***************************************************************************/
    payInit(ticket: IFullTicket, cb: AblyPublishCallback) {
        const data: SCRI.IPayInit = this._getSocketEventBase(ticket.currentTicketID) as SCRI.IPayInit;
        this.emit(SocketEvents.PayInit, data, cb);
    }
    payCancel(ticket: IFullTicket, cb: AblyPublishCallback) {
        const data: SCRI.IPayCancel = this._getSocketEventBase(ticket.currentTicketID) as SCRI.IPayCancel;
        this.emit(SocketEvents.PayCancel, data, cb);
    }

	protected emit(event: IOperation, data: any, cb?: AblyPublishCallback) {}

    private _getSocketEventBase = (currentTicketID: number) => ({ currentTicketID, userID: this.vvsApp.userID, propertyID: this.vvsApp.propertyID });


}
