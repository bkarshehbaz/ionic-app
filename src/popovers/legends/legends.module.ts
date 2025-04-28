import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { LegendsComponent } from './legends';

@NgModule({
    declarations: [
		LegendsComponent
	],
    imports: [
		IonicPageModule.forChild(LegendsComponent),
		SharedModule
    ],
    entryComponents: [
		LegendsComponent,
	],
	exports: [
		LegendsComponent
	]
})
export class LegendsModule { }
