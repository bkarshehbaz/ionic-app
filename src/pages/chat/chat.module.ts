import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../app/shared/shared.module';
import { ChatComponent } from './chat';
import { ChatBubbleComponent } from './bubble/bubble';
import { KeyboardAttachDirective } from '../../directives/keyboard-attach-directive/keyboard-attach-directive';

// import { ElasticModule } from "ng-elastic";

// import { debugUs } from '../../debug';
// debugUs(ChatComponent, ChatBubbleComponent)
@NgModule({
    declarations: [
		ChatComponent,
		ChatBubbleComponent,
		KeyboardAttachDirective
	],
    imports: [
		IonicPageModule.forChild(ChatComponent),
		SharedModule,
		// ElasticModule
    ],
    entryComponents: [
		ChatComponent,
	],
	exports: [
		ChatBubbleComponent
	]
})
export class ChatModule { }
