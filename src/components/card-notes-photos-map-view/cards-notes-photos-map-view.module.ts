import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { CardNotesPhotosView } from './card-notes-photos-map-view';
import { RecentActivityExpandedModule } from "../../popovers/recent-activity-expanded/recent-activity-expanded.module";

@NgModule({
    declarations: [
		CardNotesPhotosView
	],
    imports: [
		IonicPageModule.forChild(CardNotesPhotosView),
		SharedModule,
		RecentActivityExpandedModule
    ],
    entryComponents: [
		CardNotesPhotosView
	],
	exports: [
		CardNotesPhotosView
	]
})
export class CardNotesPhotosViewModule { }
