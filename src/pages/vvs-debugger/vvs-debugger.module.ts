import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../app/shared/shared.module';
import { VVSDebuggerComponent } from './vvs-debugger';

@NgModule({
    declarations: [
		VVSDebuggerComponent
	],
    imports: [
		IonicPageModule.forChild(VVSDebuggerComponent),
		SharedModule
    ],
    entryComponents: [
		VVSDebuggerComponent
	],
	exports: [
		VVSDebuggerComponent
	]
})
export class VVSDebuggerModule { }
