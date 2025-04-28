import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
// import { RecentActivityExpanded } from './recent-activity-expanded/recent-activity-expanded';
import { PaymentCardConfirmComponent } from './pay-card-confirm';

@NgModule({
    declarations: [
		PaymentCardConfirmComponent,
	],
    imports: [
		IonicPageModule.forChild(PaymentCardConfirmComponent),
		SharedModule
    ],
    entryComponents: [
		PaymentCardConfirmComponent
	],
	// exports: [
	// 	PaymentCardConfirmComponent
	// ]
})
export class PaymentCardConfirmModule { }
