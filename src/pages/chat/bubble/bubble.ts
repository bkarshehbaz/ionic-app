import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IChat } from '../../../lib/vvs-bridge';

@Component({
    selector: "chat-bubble", // tslint:disable-line:component-selector
    templateUrl: "./bubble.html"
})
export class ChatBubbleComponent {
    @Input() message: IChat;
    @Input() classToUse: string;
	@Input() searchQuery: string;

	@Output() retry = new EventEmitter<{event: any, message: IChat}>();
}
