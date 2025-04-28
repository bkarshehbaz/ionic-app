import { IChat } from './chat.interface';

export interface IDisplayChatItem extends IChat {
	fullName: string;
	initials: string;
	index: number;
	// show?: boolean;
}
