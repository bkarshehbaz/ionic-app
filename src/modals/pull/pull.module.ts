import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { PullModal } from './pull';
import { CardNotesPhotosViewModule } from '../../components/card-notes-photos-map-view/cards-notes-photos-map-view.module';

@NgModule({
    declarations: [
		PullModal,
	],
    imports: [
		IonicPageModule.forChild(PullModal),
		SharedModule,
		CardNotesPhotosViewModule
    ],
    entryComponents: [
		PullModal
	]
})
export class PullModule { }
