import { NgModule } from '@angular/core';

import { IonicModule, IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../../app/shared/shared.module';
import { SummaryComponent } from './summary';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		SummaryComponent
	],
	imports: [
		IonicPageModule.forChild(SummaryComponent),
		SharedModule,
		IonicModule,
		HttpClientModule
	],
	entryComponents: [
		SummaryComponent
	],
	exports: [
		SummaryComponent
	]
})
export class SummaryModule { }
