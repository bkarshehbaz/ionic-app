import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { TicketDetailsPage } from './ticket-details';
import { LogsPageModule } from '../logs-page/logs-page.module';
import { CardNotesPhotosViewModule } from '../../components/card-notes-photos-map-view/cards-notes-photos-map-view.module';
import { debugUs } from '../../debug';
import { HomePageModule } from '../home/home.module';

// debugUs(TicketDetailsPage);

@NgModule({
	declarations: [
		TicketDetailsPage
	],
	imports: [
		IonicPageModule.forChild(TicketDetailsPage),
		// IonicModule,
		SharedModule,
		CardNotesPhotosViewModule,
		LogsPageModule,
		HomePageModule,
	],
	entryComponents: [
		TicketDetailsPage
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class TicketDetailsPageModule { }
