import { Injectable, Injector } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ENV } from "../../environments";
import { Logger } from "../vvs-controller/util/logger";
import { VVSApp } from "../vvs-controller/vvs-controller";
import { toString, includes, get, find, cloneDeep} from "lodash";
// import * as sK from '../../constants/storage-keys';
import { IInitialize, ICurrentTicket } from "../../lib/vvs-bridge";
import { getStatusDescription } from "../../util/get-status-description";
import { ICheckInNew } from "../../lib/vvs-bridge/api-return";
import { pages } from "../../pages";

import * as endpoints from '../../constants/end-points';

const logger = Logger.get("ErrorHandlerInterceptor");

const badCommonErrors = [422, 403, 400];

// export interface IUpdates {
// 	CurrentTicket: ICurrentTicket[];
// 	Car: ICar[];
// 	Customer: ICustomer[];
// 	TicketSequence: ITicketSeqence[];

// }


/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

	private static vvsApp: VVSApp;

	constructor(private inj: Injector) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (includes(request.url, ENV.VVSPHOTOS_API) || includes(request.url, "s3/")) {
			// logger.info("S3 HEADERS", request.headers);
			return next.handle(request)
						.pipe(
							catchError( error => {
								logger.warn(request, error);
								return of(error);
							})
						);
		}
		return next.handle(request).pipe(catchError(error => this.errorHandler(error, request)));
	}

	// Customize the default error handler here if needed
	private errorHandler(error: HttpEvent<any>, request: HttpRequest<any>): Observable<HttpEvent<any>> {

		// if ( (request.url == 'https://api.stripe.com/v1/tokens') ) {
		// 	return throwError(error);
		// }

		const vvsApp: VVSApp = ErrorHandlerInterceptor.vvsApp || (ErrorHandlerInterceptor.vvsApp = this.inj.get(VVSApp));

		const err: {
			code: number;
			name: "QueryError"
			sqlMessage: "TICKET_EXISTS";
			message: string;
		} = get(error, "error.error") || {} as any;

		if (err && err.name === "QueryError") {

			// let _error: {
			// 	error: {
			// 		error: {
			// 			code: number;
			// 			sqlMessage: "TICKET_EXISTS";
			// 			message: string;
			// 		},
			// 		result: {
			// 			updates: {
			// 				CurrentTicket: ICurrentTicket[]
			// 			}
			// 		}
			// 	}
			//  } = error as any;

			if (err.message) {

				let message = "";
				// if (includes(err.message, "ER_DUP_ENTRY") && includes(err.message, "ticketNumber_UNIQUE") ) {
				if (err.sqlMessage == "TICKET_EXISTS") {

					const _data: ICheckInNew = get(error, "error.results");
					// _data.currentTicketID = _data.CurrentTicket.currentTicketID;

					const existingUUID: string = _data.CurrentTicket.uuid;

					const myUUID: string = get(request, "body.ticket.uuid");

					if (existingUUID != myUUID) {
						message = "Ticket number is already in use. Change it? Yes, No. If yes, then take me to customer step. What do you think about showing an input alert?";
					} else {
						const data = cloneDeep(_data);
						return throwError({ error: false, data, code: "TICKET_EXISTS_BUT_ITS_YOURS" });
					}

				} else {

					const id = get(request, "body.payload.currentTicketID");

					if (id) {
						const updates: IInitialize = get(error, "error.result.updates");
						vvsApp.doSync("error-handler", updates)
						.then( () => vvsApp.lss.getCurrentTicketByID(id, ErrorHandlerInterceptor.name) )
						.then( (ticket) => getStatusDescription(vvsApp, ticket) )
						.then( (_message: string) => vvsApp.presentSingleAlert(_message, "") );

						return throwError(error);

					} else {
						message = err.message.replace("UNKNOWN_CODE_PLEASE_REPORT: ", "");
					}

					// if (ct && id) {


					// 	const ticket = find(
					// 		ct,
					// 		(x: ICurrentTicket) => x.currentTicketID == id
					// 	);

					// 	debugger;

					// 	if (ticket) {
					// 		getStatusDescription(vvsApp, ticket)
					// 		.then( (message) =>
					// 			this.updateAndShowMessage(vvsApp, message, error)
					// 		)
					// 		.catch(logger.error);

					// 		return throwError(error);
					// 	}

					// } else {
					// 	message = err.message.replace("UNKNOWN_CODE_PLEASE_REPORT: ", "");
					// }
					// debugger;
					// getStatusDescription(vvsApp, )
				}

				// let subtitle = "";
				// const operation = get(request, "body.operation");
				// if (operation) {
				// 	const ticketID = get(request, "body.payload.currentTicketID");
				// 	const ticket: ICurrentTicket = find(
				// 		updates.CurrentTicket,
				// 		(update: ICurrentTicket) => update.currentTicketID == ticketID
				// 	);
				// 	debugger;

				// 	switch(operation) {
				// 		case "ParkInit":
				// 			// subtitle = `This car is being parked by ${vvsApp.lss.storageMap[sK.PropertyUser][ticket.TicketSequence.parkUserID].userFirstName}`
				// 			break;
				// 	}
				// }

				this.updateAndShowMessage(vvsApp, message, error, request);
				// debugger;

			}

			return throwError(error);
		}

		// logger.warn("errorHandler", error);
		// if (error && (error as any).error && (error as any).error.error && error.error.error.name === "QueryError") {
		// 	return throwError({
		// 		error: (error as any).error.error
		// 	});
		// }

		// logger.debug();

		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string = "";
		if (error instanceof Response) {
			// const body: any = error.json() || "";
			// const err = body.error || JSON.stringify(body);
			// errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
		} else if (error instanceof HttpErrorResponse) {
			if (error.status === 401) {
				vvsApp.presentSingleAlert("You need to re-enter you credentials.", null, null, 3000, () => {
					vvsApp.httpService.presentPasswordAlert(request.url as any, request.body);					
				});
				// .then( () => {
				// 	vvsApp.httpService.presentPasswordAlert(request.url as any, request.body);
				// });
			} else if (error.status === 0) {
				// window.alert(
				// 	"Only showing on debugging mode!\n" +
				// 	request.url + "\n" +
				// 	JSON.stringify(request.body, null, 3) + "\n" +
				// 	JSON.stringify({headers: request.headers }, null, 3) + "\n" +
				// 	JSON.stringify(error, null, 3)
				// );
				logger.error("error.status === 0", error, request, vvsApp.currentAlerts);
				vvsApp.presentSingleAlert(
					"Something went wrong when communicating with server!"
				);
			} else if ( includes(badCommonErrors, error.status) ) {
				// this is bad
				// throw error;
				return throwError(error);
			} else {
				logger.error(error, request);
				return throwError(error);
				// window.alert(
				// 	"Only showing on debugging mode!\n" +
				// 	request.url + "\n" +
				// 	JSON.stringify(request.body, null, 3) + "\n" +
				// 	JSON.stringify(error, null, 3)
				// );
			}
		} else {
			const $error = error as any;
			errMsg = $error && $error.message ? $error.message : "error " + toString($error);
		}


		// logger.error(errMsg);
		// logger.error(error);

		// return Obser
		return throwError(error);

		// return me.hE(error, { where, what });
	}

	updateAndShowMessage(vvsApp: VVSApp, message, error, request) {

		if ( !(request && includes(request.url, endpoints.ChatInsert)) ) {
			vvsApp.presentSingleAlert(message, "");
		}

		// logger.info("error", error, (error as any).results);
		const updates: IInitialize = get(error, "error.results.updates");

		vvsApp.doSync("error-handler", updates);
	}
}
