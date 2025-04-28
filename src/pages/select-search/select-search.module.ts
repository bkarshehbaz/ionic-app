import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../app/shared/shared.module';
import { SelectSearchComponent } from './select-search';
import { VVSDebuggerModule } from '../vvs-debugger/vvs-debugger.module';

@NgModule({
    declarations: [
		SelectSearchComponent
	],
    imports: [
		IonicPageModule.forChild(SelectSearchComponent),
		SharedModule,
		VVSDebuggerModule
    ],
    entryComponents: [
		SelectSearchComponent
	]
})
export class SelectSearchModule { }
