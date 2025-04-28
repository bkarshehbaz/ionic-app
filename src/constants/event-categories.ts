import { ENV } from "../environments";

let i = 0;
const g = (x: string) => ENV.MINIFY_STORAGE_KEYS ? ( "" + i++) : x;

export const SEARCH_TICKETS              =  g("SEARCH_TICKETS");
export const SEARCH_CHATS                =  g("SEARCH_CHATS");
export const SEARCH_ACTIVITIES           =  g("SEARCH_ACTIVITIES");
export const SEARCH_MAKES_RESULT         =  g("SEARCH_MAKES_RESULT");
export const SEARCH_MODELS_RESULT        =  g("SEARCH_MODELS_RESULT");
export const SEARCH_TICKETS_RESULT       =  g("SEARCH_TICKETS_RESULT");
export const SEARCH_CHATS_RESULT         =  g("SEARCH_CHATS_RESULT");
export const SEARCH_ACTIVITIES_RESULT    =  g("SEARCH_ACTIVITIES_RESULT");

export const SINGLE_TICKETS              =  g("SINGLE_TICKETS");
export const HOME_TICKETS                =  g("HOME_TICKETS");

export const CHAT_NEW_MESSAGES           =  g("CHAT_NEW_MESSAGES");
export const CHAT_NEW_MESSAGE            =  g("CHAT_NEW_MESSAGE");

export const NEW_SCAN_TICKET             =  g("NEW_SCAN_TICKET");
export const RESET_FORM                  =  g("RESET_FORM");
export const DEFAULT_ACTION              =  g("DEFAULT_ACTION");
export const NEW_CHECKIN                 =  g("NEW_CHECKIN");
export const FIRST_TIME_LOGIN            =  g("FIRST_TIME_LOGIN");
// export const DISABLE_MENU                =  g("DISABLE_MENU");
export const FULL_TICKET                 =  g("FULL_TICKET");
export const RECENT_ACTIVITIES           =  g("RECENT_ACTIVITIES");
export const RECENT_ACTIVITY             =  g("RECENT_ACTIVITY");


export const VALIDATE_CAR                 =  g("VALIDATE_CAR");
export const BLUR_ON_CAR                  =  g("BLUR_ON_CAR");

export const VALIDATE_CUSTOMER            =  g("VALIDATE_CUSTOMER");
export const BLUR_ON_CUSTOMER             =  g("BLUR_ON_CUSTOMER");

export const VALIDATE_CAR_NOTES           =  g("VALIDATE_CAR_NOTES");
export const BLUR_ON_CAR_NOTES            =  g("BLUR_ON_CAR_NOTES");

export const CHECKIN_INIT_ONE_TO_ONE      =  g("CHECKIN_INIT_ONE_TO_ONE");

export const BLUR                         =  g("BLUR");

// };
