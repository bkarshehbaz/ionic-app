import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
// import { RecentActivityExpanded } from './recent-activity-expanded/recent-activity-expanded';
import { ParkModal } from './park';
import { CardNotesPhotosViewModule } from '../../components/card-notes-photos-map-view/cards-notes-photos-map-view.module';

@NgModule({
    declarations: [
		ParkModal,
	],
	imports: [
		IonicPageModule.forChild(ParkModal),
		SharedModule,
		CardNotesPhotosViewModule
	],
	entryComponents: [
		ParkModal
	]
})
export class ParkModule { }
