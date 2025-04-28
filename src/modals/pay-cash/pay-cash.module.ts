import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
// import { RecentActivityExpanded } from './recent-activity-expanded/recent-activity-expanded';
import { PayCashComponent } from './pay-cash';
import { IonDigitKeyboard } from './ion-digit-keyboard/ion-digit-keyboard';
import { CurrencyPipe } from '@angular/common';

@NgModule({
    declarations: [
		PayCashComponent,
		IonDigitKeyboard
	],
    imports: [
		IonicPageModule.forChild(PayCashComponent),
		SharedModule
    ],
    entryComponents: [
		PayCashComponent
	],
	providers: [
		CurrencyPipe
	]
})
export class PayCashModule { }
