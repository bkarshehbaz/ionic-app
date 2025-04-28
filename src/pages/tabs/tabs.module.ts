import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../app/shared/shared.module';
import { TabsPage } from './tabs';

@NgModule({
    declarations: [
		TabsPage
	],
    imports: [
		IonicPageModule.forChild(TabsPage),
		SharedModule
    ],
    entryComponents: [
		TabsPage
	]
})
export class TabsPageModule { }
