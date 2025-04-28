import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
// import { RecentActivityExpanded } from './recent-activity-expanded/recent-activity-expanded';
import { PayComponent } from './pay';

@NgModule({
    declarations: [
		PayComponent,
	],
    imports: [
		IonicPageModule.forChild(PayComponent),
		SharedModule
    ],
    entryComponents: [
		PayComponent
	]
})
export class PayModule { }
