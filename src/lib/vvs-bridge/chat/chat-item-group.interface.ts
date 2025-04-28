import { IChat } from "./chat.interface";
// import { IDisplayChatItem } from './display-chat-item.interface';

export interface IChatItemGroup {
	time: string;
	messages: IChat[]; // IDisplayChatItem[];
	range: { max: number, min: number };
}
