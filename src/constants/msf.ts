import { IStep } from '../lib/vvs-bridge';
import * as cf from './constant-fields';
import * as t from './constant-titles';

export const carnotes: IStep = {
	name: cf.carnotes,
	prevStatus: true ,
	nextStatus: true ,
	nextTitle: t.STAGE,
	displayTitle: "Add Notes & Photos",
	index: 2,
	next: {
		displayTitle: "Submit"
	} as any,
	$class: {
		customer: cf.active,
		car: cf.active,
		carnotes: cf.active
	}
};

export const car: IStep = {
    name: cf.car,
    prevStatus: true,
    nextStatus: false,
	nextTitle: t.NEXT,
	displayTitle: "Car Information ",
	index: 1,
	next: carnotes,
    $class: {
		customer: cf.active,
		car: cf.active,
		carnotes: ""
	}
};

export const customer: IStep = {
    name: cf.customer,
    prevStatus: false,
    nextStatus: false,
	nextTitle: t.NEXT,
	displayTitle: "Customer Information",
	index: 0,
	next: car,
    $class: {
		customer: cf.active,
		car: "",
		carnotes: ""
	}
};
