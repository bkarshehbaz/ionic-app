// export class ChatMessage {
export interface IChatMessage {

    // constructor(userID: number) {
    //     this.userID = userID;
    //     this.msgImages = new Array<string>();
    // }

    chatID: number;
    userID: number;
    // userName: string;
    msgContent: string;
    createDate: Date;
    msgImage: string[];
    sent: boolean;

    // "chatMessageID": number;
    // "userID": number;
    // "msgContent": string;
    // "msgImages": Array<string>;
    // "msgTimeStamp": string;
    // msgProperty: string;
}
