import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
import { RecentActivityExpanded } from './recent-activity-expanded';
import { LogsPageModule } from '../../pages/logs-page/logs-page.module';

@NgModule({
    declarations: [
		RecentActivityExpanded
	],
    imports: [
		IonicPageModule.forChild(RecentActivityExpanded),
		SharedModule,
		LogsPageModule
    ],
    entryComponents: [
		RecentActivityExpanded
	],
	exports: [
		RecentActivityExpanded
	]
})
export class RecentActivityExpandedModule { }
