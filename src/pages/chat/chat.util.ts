// import { IChatItemGroup, NumericMap, IChat, IUser, IImageChat } from "../../lib/vvs-bridge";
// import * as moment from "moment";
// import { getMomentFormats } from "../../constants/constants";
// import { LocalStorageService } from "../../providers/local-storage-service/local-storage-service";
// import { omit, forEachRight, groupBy } from "lodash";
// import { parseJSON } from "../../util/parse-json";
// // import { checkValue } from "../../util/check-value";
// // import { getFullName, getUserInitials } from "../../util";


// export interface IChatItemGroupsAndCount {
// 	groups: IChatItemGroup[];
// 	numberOfMsgs: number
// }

// /**
//  * [getChatGroup description]
//  * @param  {[type]}        key   [description]
//  * @param  {[type]}        value [description]
//  * @param  {[type]}        i     [description]
//  * @param  {[type]}        min   [description]
//  * @return {ChatItemGroup}       [description]
//  */
// export function getChatGroup(key: string,
// 		messages: IChat[], // IDisplayChatItem[],
// 		max: number,
// 		min: number): IChatItemGroup {

// 	return {
// 		time: moment(key).calendar(null, getMomentFormats()),
// 		messages,
// 		range: { max, min }
// 	};

// }

// /**
//  * [groupChatToDisplayInChat description]
//  * @return {Promise} {groups: ChatItemGroup[],numberOfMsgs: number} [description]
//  */
// export function groupChatToDisplayInChat(me: LocalStorageService): Promise<IChatItemGroupsAndCount> {

//     const groups: IChatItemGroup[] = [];
// 	let i = 0;

//     return Promise.all([
//         me.getChatData(),
//         me.getPropertyUserData()
//     ])
//     .then( (valuesPromised) => {
//         let chatData: NumericMap<IChat> = valuesPromised[0];
//         const propertyUserData: NumericMap<IUser> = valuesPromised[1];

//         chatData = (omit as any)(chatData, ['undefined']);

//         forEachRight(
// 			groupBy(
//                 chatData,
//             	(chatMessage: IChat) => moment(chatMessage.createDate).startOf('day').format()
// 			),
// 			(value: IChat[], key) => {
// 				const min = i;
// 				forEachRight(value, (valueT, keyT) => {
// 					value[keyT].msgImage = parseJSON(valueT.msgImage as any) as IImageChat[] || [];

// 					// const user = propertyUserData[value[keyT].userID] as IUser;
// 					// if (checkValue(user)) {
// 					// 	value[keyT].fullName = getFullName(user);
// 					// 	// value[keyT].initials = getUserInitials(user);
// 					// }

// 					// // value[keyT].createDate = moment(valueT.createDate).isValid() ? valueT.createDate : moment();
// 					// // value[keyT].createDate = val
// 					// value[keyT].index = i;
// 					i++;
// 				});

// 				if (value.length > 0) {
// 					groups.push(getChatGroup(key, value, i, min));
// 				}

// 			});

//         return { groups: (groups), numberOfMsgs: i };
//         // return { groups: reverse(groups), numberOfMsgs: i };

//     });
// }
