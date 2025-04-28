// import { FormControl } from '@angular/forms';
import { IImageChat } from './image-chat.interface';

export interface IChat {
    chatID			 ?: number;
    userID			  : number;
    // msgContentInput	 ?: FormControl;
    msgContent		 ?: string;
    msgImage		  : IImageChat[];
    createDate		 ?: string | any;
    sent			 ?: boolean;

    /** Local only */
    fullName		  : string;
    initials		 ?: string;

    //  createDate    : string;
	//  modDate		  : string;
	// index			  : number;

	sending?: boolean;
	// newMessage?: boolean;

	/**
	 * to find message when sent
	 */
	uuid?: any;

	dividerDate?: any;
}
