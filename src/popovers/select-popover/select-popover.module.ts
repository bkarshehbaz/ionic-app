import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../app/shared/shared.module';
import { SelectPopover } from './select-popover';

@NgModule({
    declarations: [
		SelectPopover
	],
    imports: [
		IonicPageModule.forChild(SelectPopover),
		SharedModule
    ],
    entryComponents: [
		SelectPopover
	],
	exports: [
		SelectPopover
	]
})
export class SelectPopoverModule { }
