import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../app/shared/shared.module';
import { VoucherComponent } from './pay-voucher';

@NgModule({
    declarations: [
		VoucherComponent,
	],
    imports: [
		IonicPageModule.forChild(VoucherComponent),
		SharedModule
    ],
    entryComponents: [
		VoucherComponent
	],
	exports: [
		VoucherComponent
	]
})
export class VoucherComponentModule { }
