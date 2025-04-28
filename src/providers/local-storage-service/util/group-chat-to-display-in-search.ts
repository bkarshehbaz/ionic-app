// import { forEach, omit } from "lodash";
// import { Subject } from "rxjs";
// import { IChat, NumericMap } from "../../../lib/vvs-bridge";
// import { LocalStorageService } from "../local-storage-service";
// import { Logger } from '../../vvs-controller/util/logger';
// const logger = Logger.get("group-chat-to-display-in-search");

// export function _groupChatToDisplayInSearch(me: LocalStorageService, chatsSubject: Subject<NumericMap<IChat>>): void {

// 	let chatItems: NumericMap<IChat> = {};

//     let i = 0;
//     Promise.all([
//         me.getChatData(),
//         me.getPropertyUserData()
//     ])
//     .then( (valuesPromised) => {
//         let chatData: NumericMap<IChat> = valuesPromised[0];
//         // const propertyUserData: NumericMap<IUser> = valuesPromised[1];

//         chatData = omit(chatData, ['undefined']) as any;

//         forEach(chatData, (chatMessage: IChat) => {
//             chatMessage.index = i;
//             i++;
//             me.chatItems[chatMessage.chatID] = chatMessage;
//         });

//         chatsSubject.next(chatItems);
//         // return {groups:groups,numberOfMsgs:i};

//     })
//     .catch(logger.e);
// };
