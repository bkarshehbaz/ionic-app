import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { CheckOutModal } from './checkout';
import { CardNotesPhotosViewModule } from '../../components/card-notes-photos-map-view';

@NgModule({
    declarations: [
		CheckOutModal,
	],
    imports: [
		IonicPageModule.forChild(CheckOutModal),
		CardNotesPhotosViewModule,
		SharedModule
    ],
    entryComponents: [
		CheckOutModal
	]
})
export class CheckOutModule { }
