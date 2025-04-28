import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { HomePage } from './home';
import { TicketItemView } from './ticket-item-view/ticket-item-view';
import { TicketItemOptions } from './ticket-item-options/ticket-item-options';
import { ValeconsComponent } from './valecons/valecons.component';

@NgModule({
    declarations: [
		HomePage,
		TicketItemView,
		TicketItemOptions,
		ValeconsComponent
		// LegendComponent
	],
    imports: [
		IonicPageModule.forChild(HomePage),
		SharedModule
    ],
    entryComponents: [
		HomePage,
		TicketItemOptions
	],
	exports: [
		ValeconsComponent,
		TicketItemView
	],
	// schemas: [CUSTOM_ELEMENTS_SCHEMA] // add this line
})
export class HomePageModule { }
