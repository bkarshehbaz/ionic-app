import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { CheckInModal } from './checkin';
import { CardNotesPhotosViewModule } from '../../components/card-notes-photos-map-view/cards-notes-photos-map-view.module';
import { MultiStepFormModule } from '../../pages/checkin-form/checkin-form.module';

@NgModule({
    declarations: [
		CheckInModal,
	],
    imports: [
		IonicPageModule.forChild(CheckInModal),
		SharedModule,
		CardNotesPhotosViewModule,
		MultiStepFormModule
	],
    entryComponents: [
		CheckInModal
	]
})
export class CheckInModule { }
