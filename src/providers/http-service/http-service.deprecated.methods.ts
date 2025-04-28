// NOTE DEPRECATED
// public GetModelsByKeyword(keyword: string) {
//     return this.post(endpoints.GetModelsByKeyword, { keyword });
// }

// // NOTE DEPRECATED
// public GetModelsByMakeID(makeID: number) {
//     return this.post(endpoints.GetModelsByMakeID, { makeID });
// }

// // NOTE DEPRECATED
// public GetMakesByKeyword(keyword: string) {
//     return this.post(endpoints.GetMakesByKeyword, { keyword });
// }

// public GetAllPlaces() {
//     return this.post(endpoints.GetAllPlaces);
// }

// // NOTE DEPRECATED
// public GetAllLocations() {
//     return this.post(endpoints.GetAllLocations);
// }

// public GetAllLocationByPlaceID(placeID: number) {
//     return this.post(endpoints.GetAllLocationByPlaceID, { placeID });
// }

// public GetAllColors() {
//     return this.post(endpoints.GetAllColors);
// }

// public getCurrentTicketByID(currentTicketID: number) {
//     return this.post(endpoints.GetCurrentTicketByID, { currentTicketID });
// }

// // NOTE this method can be combined with the CheckInInit
// // TO BE IMPLEMENTED
// public getCurrentTicketByTicketNumber(ticketNumber) {
//     return this.http
//                .post(`${ENV.apiHost}${awsApiBaseUrl}GetCurrentTicketByTicketNumber`,
//                      JSON.stringify(ObjevvsBridge.Iassign(this.lss.getIH(),
//                                                  {"ticketNumber":ticketNumber}
//                                                  )
//                                     ),
//                                     this.awsOptions)
//                .timeout(ENV.timeout)
//                .map(res => res.json())
//                .catch(this.hE);
// }
/*
* Edit Methods
*/

// public syncAllData() {
//     // this.lss
//     //     .getLatestMod()
//     //     .then( (data) => {
//     //           //logger.debug(data);
//     //           return this.http
//     //                      .post(`${ENV.apiHost}${awsApiBaseUrl}SyncAllData`,
//     //                            this.lss.getIH(),
//     //                            this.awsOptions)
//     //                      .timeout(ENV.timeout)
//     //                      .map(res => res.json())
//     //                      .subscribe( (data) => {
//     //                           //logger.debug(JSON);
//     //                           this.lss
//     //                               .addUpdateModified(data);
//     //                      });
//     //     // this.lss.getConstants();
//     // }).catch( reason => //logger.debug(reason));
// }

