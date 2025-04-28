// import { noop } from "lodash";
// import * as vvsBridge from '../../../lib/vvs-bridge';
// import { processFullTicket } from '../../../util';
// import { LocalStorageService } from '../local-storage-service';

// import { Logger } from '../../../providers/vvs-controller/util/logger';
// const logger = Logger.get("get-full-current-ticket-by-ticket-id");

// // today, feb 23, 2018
// // polyfills.js:3 [get-full-current-ticket-by-ticket-id] - ERROR - Error: ViewDestroyedError: Attempt to use a destroyed view: detectChanges
// //     at viewDestroyedError (core.js:9539)
// //     at Object.debugUpdateDirectives [as updateDirectives] (core.js:14335)
// //     at checkAndUpdateView (core.js:13507)
// //     at callWithDebugContext (core.js:14739)
// //     at Object.debugCheckAndUpdateView [as checkAndUpdateView] (core.js:14276)
// //     at ViewRef_.detectChanges (core.js:11299)
// //     at handleFullTicket (ticket-view.ts:124)
// //     at get-full-current-ticket-by-ticket-id.ts:100
// //     at t.invoke (polyfills.js:3)
// //     at Object.onInvoke (core.js:4626)

// export function _getFullCurrentTicketByTicketID(me: LocalStorageService, ticketID: any, cb: (ticket: any) => void = (ticket: any) => {}): void {


//     Promise.all<any>(
//               [
//                 me.getCurrentTicketData(),
//                 me.getCustomerData(),
//                 me.getCarData(),
//                 me.getColorData(),
//                 me.getTicketTypeData(),
//                 me.getTicketSequenceData(),
//                 me.getParkLocationData(),
//                 me.getParkAreaData(),
//                 me.getSelectedCompany(),
//                 me.getMakes(),
//                 me.getModels(),
//                 me.getLoginUser(),
//                 me.getPropertyUserData(),

//                 me.getRecentActivityData(),
//                 me.getRecentActivityTypeData()
//               ]
//            ).then( ([currentTickets,
//                      currentCustomers,
//                      currentCars,
//                      currentColors,
//                      ticketTypes,
//                      ticketSequences,
//                      parkLocationData = {},
//                      parkAreaData = {},
//                      _selectedCompany,
//                      _makes,
//                      _models,
//                      _loginUser,
//                      _propertyUserData,
//                      _recentActivities,
//                      _recentActivityTypes]) => {
//                 // //logger.debug("$values >> ", $values);
//                 // //logger.debug("ticketID >> ", ticketID);
//                 // tslint:disable-next-line:no-console
//                 logger.l("currentTickets", {currentTickets, ticketSequences, parkLocationData});

//                 const _currentTicket  : vvsBridge.ICurrentTicket    = currentTickets[ticketID];

//                 // l(JSON.stringify(_currentTicket));
//                 // //logger.debug("_currentTicket >> ", _currentTicket);
//                 const _currentCustomer: vvsBridge.ICustomer         = currentCustomers[_currentTicket .customerID];
//                 const _currentCar     : vvsBridge.ICar              = currentCars[_currentTicket .carID];
//                 const _currentColor   : vvsBridge.IColor            = currentColors[_currentCar.colorID];
//                 const _ticketType     : vvsBridge.ITicketType       = ticketTypes[_currentTicket .ticketTypeID  ];
//                 const _ticketSequence : vvsBridge.ITicketSequence   = ticketSequences[ticketID];

//                 const _parkLocation   : vvsBridge.IParkLocation     = _ticketSequence.parkLocationID
//                                                                     ? parkLocationData[_ticketSequence.parkLocationID]
//                                                                     : {};

//                 const _parkArea       : vvsBridge.IParkArea         = _parkLocation.parkAreaID
//                                                                     ? parkAreaData[_parkLocation.parkAreaID]
//                                                                     : {};
//                 logger.i("_parkArea", _parkArea);

//                 // const _selectedProperty: Property                = $values[8];

//                 const _selectedMake   : vvsBridge.IMake            = _makes[_currentCar.makeID];
//                 const _selectedModel  : vvsBridge.IModel           = _models[_currentCar.modelID];


//                 // _currentCustomer.middleNameInitial = (toString(_currentCustomer.customerMiddleName).length > 0) ?
//                 //                                      (toString(_currentCustomer.customerMiddleName)[0] + ". " ) : "";

//                 // let _recentActivityItems: IRecentActivityItem[] = [];

//                 const data = processFullTicket(me,
//                                                ticketID         ,
//                                                _currentTicket   ,
//                                                _currentCustomer ,
//                                                _currentCar      ,
//                                                _currentColor    ,
//                                                _ticketType      ,
//                                                _ticketSequence  ,
//                                                _parkArea        ,
//                                                _parkLocation    ,
//                                                _selectedCompany ,
//                                                _selectedMake    ,
//                                                _selectedModel   ,
//                                                _loginUser       ,
//                                                _propertyUserData,
//                                                _recentActivities,
//                                                _recentActivityTypes);

//                 logger.i("processFullTicket", data);
//                 cb(data);
//                 // return data;
//                 // me.sendFullTicket(data);
//            })
//            .catch(logger.e);
// }
