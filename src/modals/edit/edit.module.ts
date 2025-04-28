import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { EditComponent } from './edit';
import { MultiStepFormModule } from '../../pages/checkin-form/checkin-form.module';

@NgModule({
    declarations: [
		EditComponent,
	],
    imports: [
		IonicPageModule.forChild(EditComponent),
		SharedModule,
		MultiStepFormModule
    ],
    entryComponents: [
		EditComponent
	]
})
export class EditModule { }
