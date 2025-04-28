import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { ColorPopover } from './color-popover';

@NgModule({
    declarations: [
		ColorPopover
	],
    imports: [
		IonicPageModule.forChild(ColorPopover),
		SharedModule,
    ],
    entryComponents: [
		ColorPopover
	],
	exports: [
		ColorPopover
	]
})
export class ColorPopoverModule { }
