// deprecated
// searchIndexForTicketNumber(query: string, cb: any): void {

//     if (!checkValue(this.ticketIndex)) {
//         // this.initIndexTicket( () => {
//         //     cb(this.ticketIndex.search(query,{
//         //                                     fields: {
//         //                                         ticketNumber:{}
//         //                                     }
//         //                                   }));
//         // });
//         logger.error("SearchIndexForTicketNumber() > ticketIndex is undefined");
//     } else {  
//         cb(this.ticketIndex.search(query, {
//                                          fields: {
//                                              ticketNumber: {}
//                                          }
//                                          }));
//     }

// }

// getMakeIDAndModelIDByMakeNameAndModelName(makeName: string, modelName: string, cb: any) {
//     this.initMakeIndex( () => {
//            const makeResults = this.makeIndex.search(makeName, {expand: true});
//            // logger.debug("makeResults >> ",makeResults);
//            // logger.debug("Array.isArray(makeResults) && makeResults.length > 0 ",Array.isArray(makeResults) && makeResults.length > 0);

//            if (Array.isArray(makeResults) && makeResults.length > 0) {
//                const makeID = makeResults[0].ref;
//                this.lss
//                    .getModelsByMakeID(makeID)
//                    .then( ($modelsByMakeID: vvsBridge.NumericMap<vvsBridge.IModel>) => {
//                        this.initModelIndex($modelsByMakeID)
//                            .then( () => {
//                                const modelResults: NumericMap<vvsBridge.IModel> = this.modelIndex.search(modelName, {expand: true});
//                                if (Array.isArray(modelResults) && modelResults.length > 0) {
//                                    const modelID = modelResults[0].ref;
//                                    // logger.debug("modelResults >> ",modelResults);
//                                    cb(makeID, modelID);
//                                }
//                            })
//                            .catch(logger.e);
//                        // this.initModelIndex($modelsByMakeID, () => {
//                        //     const modelResults: NumericMap<vvsBridge.IModel> = this.modelIndex.search(modelName, {expand: true});
//                        //     if (Array.isArray(modelResults) && modelResults.length > 0) {
//                        //         const modelID = modelResults[0].ref;
//                        //         // logger.debug("modelResults >> ",modelResults);
//                        //         cb(makeID, modelID);
//                        //     }
//                        // });
//                    });
//            } else {
//                logger.w("There is no make. About to check for the model");
//                this.lss
//                    .getModels()
//                    .then( (models) => {

//                        this.initModelIndex(models)
//                            .then(() => {
//                                const modelResults = this.modelIndex.search(modelName, {expand: true}) as vvsBridge.NumericMap<vvsBridge.IModel>;
//                                if (Array.isArray(modelResults) && modelResults.length > 0) {
//                                    const modelID = modelResults[0].ref;
//                                    // logger.debug("modelResults >> ",modelResults);
//                                    cb(9999999999, modelID);
//                                } else {
//                                    // TODO
//                                    // FIXME
//                                }                                
//                            })
//                            .catch(logger.e);

//                        // this.initModelIndex(models, () => {
//                        //     const modelResults = this.modelIndex.search(modelName, {expand: true}) as vvsBridge.NumericMap<vvsBridge.IModel>;
//                        //     if (Array.isArray(modelResults) && modelResults.length > 0) {
//                        //         const modelID = modelResults[0].ref;
//                        //         // logger.debug("modelResults >> ",modelResults);
//                        //         cb(9999999999, modelID);
//                        //     } else {
//                        //         // TODO
//                        //         // FIXME

//                        //     }
//                        // });
//                    })
//                    .catch(logger.e);
//            }
//            }
//     );

//    //  Promise.resolve(this.initMakeIndex())
//    //          .then( () => {
//    //               Promise.resolve(this.makeIndex.search(makeName,{expand: true}))
//    //                      .then( (makeResults:{ref: number}[]) => {
//    //                          if (Array.isArray(makeResults) && makeResults.length > 0) {
//    //                             let makeID = makeResults[0].ref;
//    //                             //logger.debug("makeResults >> ",makeResults);
//    //                             this.lss.getModelsByMakeID(makeID)
//    //                                 .then( ($modelsByMakeID: {[key: number]:Model}) => {
//    //                                      Promise.resolve(this.initModelIndex($modelsByMakeID))
//    //                                             .then( () => {
//    //                                                   let modelResults: {[key: number]:Model} = this.modelIndex.search(modelName,{expand: true});
//    //                                                   if (Array.isArray(modelResults) && modelResults.length > 0) {
//    //                                                       let modelID = modelResults[0].ref;
//    //                                                       //logger.debug("modelResults >> ",modelResults);
//    //                                                       cb(makeID,modelID);
//    //                                                   }
//    //                                             });
//    //                                 });
//    //                          }
//    //                      });
//     //
//    //  });
// }
