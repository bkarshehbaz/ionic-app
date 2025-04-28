import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../../app/shared/shared.module';
import { RecentActivityFilterPage } from './recent-activity-filter';

@NgModule({
    declarations: [
		RecentActivityFilterPage
	],
    imports: [
		IonicPageModule.forChild(RecentActivityFilterPage),
		SharedModule,
    ],
    entryComponents: [
		RecentActivityFilterPage
	],
	exports: [
		RecentActivityFilterPage
	]
})
export class RecentActivityFilterModule { }
