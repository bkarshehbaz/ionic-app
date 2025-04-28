import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
import { LogsPage } from './logs-page';
import { RecentActivityItem } from './recent-activity-item/recent-activity-item';
// import { PullRequestsComponent } from './pull-requests/pull-requests';
import { HomePageModule } from '../home/home.module';
// import { debugUs } from '../../debug';

// const declarations = [
// 	LogsPage,
// 	RecentActivityItem,
// 	PullRequestsComponent
// ];

// debugUs(...declarations);

@NgModule({
    declarations: [
		LogsPage,
		RecentActivityItem,
		// PullRequestsComponent
	],
    imports: [
		IonicPageModule.forChild(LogsPage),
		SharedModule,
		// HomePageModule
    ],
    entryComponents: [
		// LogsPage,
	],
	exports: [
		RecentActivityItem
	]
})
export class LogsPageModule { }
