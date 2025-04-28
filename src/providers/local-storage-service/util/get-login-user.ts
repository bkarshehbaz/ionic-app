// import { isEmpty, toString } from "lodash";
// // import * as Raven from 'raven-js';
// import * as sK from '../../../constants/storage-keys';
// import * as vvsBridge from '../../../lib/vvs-bridge';
// import {Logger} from '../../../providers/vvs-controller/util/logger';
// import { LocalStorageService } from '../local-storage-service';
// import { VVSApp } from "../../vvs-controller/vvs-controller";
// import { VVSErrorHandler } from "../../../services/error-handler/error-handler";
// import { RollbarService } from "../../../services/rollbar";

// const logger = Logger.get(_getLoginUser.name);

// // export function _getLoginUser(me: LocalStorageService): Promise<void|vvsBridge.IUser> {
// export function _getLoginUser(me: LocalStorageService): Promise<any> {

//     return me._get(sK.LoginUser)
//              .then( (user: vvsBridge.IUser): vvsBridge.IUser => {

// 				if (user) {

// 					// // Set the person data to be sent with all errors for this notifier.
// 					// Rollbar.configure({
// 					// 	payload: {
// 					// 		person: {
// 					// 		id: 456,
// 					// 		username: "foo",
// 					// 		email: "foo@example.com"
// 					// 		}
// 					// 	}
// 					// });
// 					// // Unset the person data to be sent with all errors for this notifier.
// 					// Rollbar.configure({
// 					// 	payload: {
// 					// 		person: {
// 					// 		id: null
// 					// 		}
// 					// 	}
// 					// });

// 					RollbarService.init(_getLoginUser.name).configure({
// 						payload: {
// 							person: {
// 								propertyID: user.CurrentProperty.propertyID,
// 								userID: user.userID,
// 								username: user.username,
// 								stage: user.stage
// 							},
// 						}
// 					});

// 				}

// 				return user;
// 			})
// 			.catch(logger.e);
//                 // .catch();
// }
