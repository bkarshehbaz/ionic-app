import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePopover } from './update-popover';
import { SharedModule } from '../../app/shared/shared.module';

@NgModule({
    declarations: [
		UpdatePopover
	],
    imports: [
		IonicPageModule.forChild(UpdatePopover),
		SharedModule
    ],
    entryComponents: [
		UpdatePopover
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
	],
})
export class UpdatePopoverModule { }
