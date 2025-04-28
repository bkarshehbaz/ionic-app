import { forEach } from 'lodash';
import {IChat, IUser, NumericMap} from '../../../lib/vvs-bridge';
import { SearchService } from '../search-service';

import { Logger } from '../../../providers/vvs-controller/util/logger';
const logger = Logger.get("init-index-chat");

export const _initIndexChat = (me: SearchService, cb: any): void => {
    Promise.all([
        me.lss.getChatData(),
        me.lss.getPropertyUserData()
    ])
    .then( (promisedValues) => {
        // logger.debug(promisedValues);
        const chatData: NumericMap<IChat> = promisedValues[0];
        const propertyUsers: NumericMap<IUser> = promisedValues[1];

        forEach(chatData, (chatItem: IChat) => {
            // logger.debug(chatItem);
            const cII: any = {}; // chatIndexedItem
            cII.chatID               = chatItem.chatID;
            cII.msgContent           = chatItem.msgContent;
            if (propertyUsers[chatItem.userID]) {
                cII.userFirstName    = propertyUsers[chatItem.userID].userFirstName;
                cII.userLastName     = propertyUsers[chatItem.userID].userLastName;
            }
            me.chatIndex.addDoc(cII);
        });

        cb();
    })
    .catch(logger.e);
};
