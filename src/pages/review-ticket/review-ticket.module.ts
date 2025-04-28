import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
import { ReviewTicketComponent } from './review-ticket';
// import { LogsPageModule } from '../../pages/logs-page/logs-page.module';

@NgModule({
    declarations: [
		ReviewTicketComponent
	],
    imports: [
		IonicPageModule.forChild(ReviewTicketComponent),
		SharedModule
    ],
    entryComponents: [
		ReviewTicketComponent
	],
	exports: [
		ReviewTicketComponent
	]
})
export class ReviewTicketModule { }
