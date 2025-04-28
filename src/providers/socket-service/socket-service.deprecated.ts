// handleQueue() {
//     Promise.all([
//         slss.getCurrentTicketQueue(),
//         slss.getChatQueue()
//     ])
//     .then( (values) => {
//         let currentTQueue:CurrentTicketQueue[] = values[0];
        // logger.debug("currentTQueue >> ",currentTQueue);
//         // let currentTBad:CurrentTicketQueue[] = [];
//         if (!isNil(currentTQueue && !isArray(currentTQueue))) {
//             while(currentTQueue.length != 0) {
//                 let cTicket:CurrentTicketQueue = currentTQueue.pop();
                // logger.debug("cTicket",cTicket);
//                 this.httpService
//                     .checkIn(cTicket)
//                     .subscribe(
//                         (data:ICheckIn) => {
//                             // if (data.status != "ok" && isNil(cTicket)) {
                            // logger.debug("data",data);
//                             if (data.CurrentTicket[0].ticketNumber && cTicket.ticketCombined.ticketNumber ) {
//                                 // currentTQueue.push(cTicket);
//                                 // cTicket = undefined;
//                                 slss.setCurrentTicketQueue(currentTQueue);
//                             }
//                         },
//                         (error) => {
                            // logger.debug("data",error);
//
//                             if (isNil(cTicket)) {
//                                 // currentTBad.push(cTicket);
//                                 // cTicket = undefined;
//                             }
//                         },
//                         () => {
                            // logger.debug("completed with no error");
//
//                             if (isNil(cTicket)) {
//                                 // currentTBad.push(cTicket);
//                                 // cTicket = undefined;
//                             }
//                         }
//                     );
//             }
//
//         }
//
//
//         let chatQueue: any[]     = values[1];
//         if (!isNil(chatQueue && !isArray(chatQueue))) {
//             while(chatQueue.length == 0) {
//                 let chatM:Chat = chatQueue.pop();
//                 if (!isNil(chatM)) {
//                     this.sendMessage(chatM);
//                     // this.httpService
//                     //     .checkIn(chatM)
//                     //     .subscribe(
//                     //       (data) => {
//                     //           if (data.status != "ok" && isNil(chatM)) {
//                     //               chatQueue.push(chatM);
//                     //               chatM = undefined;
//                     //           }
//                     //       },
//                     //       (error) => {
//                     //           if (isNil(chatM)) {
//                     //               chatQueue.push(chatM);
//                     //               chatM = undefined;
//                     //           }
//                     //       },
//                     //       () => {
//                     //           if (isNil(chatM)) {
//                     //               chatQueue.push(chatM);
//                     //               chatM = undefined;
//                     //           }
//                     //       }
//                     //     );
//                 }
//             }
//         }
//
//
//     })
    // .catch( reason => logger.debug(reason));
// }

/*
* Socket Listeners closes
*/

/*
*
*/
