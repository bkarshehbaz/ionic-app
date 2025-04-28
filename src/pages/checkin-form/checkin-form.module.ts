import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultiStepForm } from "./checkin-form";
import { CarPhotosStep } from "./steps/car-photos-step/car-photos-step";
import { CarStep } from "./steps/car-step/car-step";
import { CustomerStep } from "./steps/customer-step/customer-step";
import { SharedModule } from '../../app/shared/shared.module';
import { MaskDirective } from '../../directives/mask/mask.directive';

// import { ElasticModule } from "ng-elastic";

import { RoundProgressModule } from 'angular-svg-round-progressbar';

// import { debugUs } from '../../debug';
// import { VVSApp } from '../../providers/vvs-controller/vvs-controller';


// const declarations = [
// 	MultiStepForm,
// 	MaskDirective,

// 	CustomerStep,
// 	CarStep,
// 	CarPhotosStep
// ];

// debugUs(...declarations);

@NgModule({
    declarations: [
		MultiStepForm,
		MaskDirective,

		CustomerStep,
		CarStep,
		CarPhotosStep,
	],
    imports: [
		IonicPageModule.forChild(MultiStepForm),
		SharedModule,
		// ElasticModule,
		RoundProgressModule
    ],
    entryComponents: [
		MultiStepForm,
	],
	exports: [
		CustomerStep,
		CarStep,
		CarPhotosStep
	]
})
export class MultiStepFormModule { }
