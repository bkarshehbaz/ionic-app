import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
import { GlobalSearch } from './/global-search';
import { HomePageModule } from '../home/home.module';
import { LogsPageModule } from '../logs-page/logs-page.module';
import { ChatModule } from '../chat/chat.module';

@NgModule({
    declarations: [
		GlobalSearch,
	],
    imports: [
		IonicPageModule.forChild(GlobalSearch),
		SharedModule,
		HomePageModule,
		LogsPageModule,
		ChatModule
    ],
    entryComponents: [
		GlobalSearch,
	]
})
export class GlobalSearchModule { }
