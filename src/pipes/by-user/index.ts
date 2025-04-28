// import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef, Injector } from '@angular/core';
// import { toString, isEmpty } from "lodash";
// import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
// import { ICar } from '../../lib/vvs-bridge';
// import { IFullTicket } from '../../util';
// import { AsyncPipe } from '@angular/common';
// import { Logger } from '../../providers/vvs-controller/util/logger';

// const logger = Logger.get("ByUserPipe");

// @Pipe({
//     name: 'byUser'
// })
// export class ByUserPipe implements PipeTransform, OnDestroy {

// 	private asyncPipe: AsyncPipe;

//     constructor(private vvsApp: VVSApp, private injector: Injector) {
// 		// this.asyncPipe = new AsyncPipe(injector.get(ChangeDetectorRef));
// 	}

//     /**
//      * @param object and it must contain a recentActivityID
//      * @return array
//      */
//     transform(ticket: IFullTicket, ...args: string[]): string {
// 		if (ticket) {
// 			if (ticket.statusName == "PARK_INIT") {
// 				return fromPromise(
// 					this.vvsApp.lss.getPropertyUserData()
// 					.then( (users) => {
// 						const user = users[ticket.TicketSequence.parkUserID];
// 						if (user) {
// 							return ticket.statusDescription + " " + user.userFirstName + " " + user.userLastName;
// 						}
// 					})
// 					.catch(logger.error)
// 				)
// 			}
// 		}

// 		// return this.asyncPipe.transform(this.myApiService.getText(key));

// 		return ticket.statusDescription;
// 	}


// 	ngOnDestroy() {
// 		this.asyncPipe.ngOnDestroy();
// 	}

// }
