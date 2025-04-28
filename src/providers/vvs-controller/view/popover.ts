import { PopoverOptions } from "ionic-angular";
import { Logger } from "../util/logger";
import { VVSApp } from "../vvs-controller";

const logger = Logger.get("popover");

export const _presentPopover = (
	me: VVSApp,
	component: string,
	data: object,
	event: Event,
	options?: PopoverOptions,
	callback?: {
		onDidDismiss?:  (data: any, role: any) => void,
		onWillDismiss?: (data: any, role: any) => void,
	}
) => {
	// logger.info(JSON.stringify({component, options: options || {}}, null, 4));
	// let popoverOptions: IA.PopoverOptions = {} as IA.PopoverOptions;
	// popoverOptions.

	if (me.popovers[component]) {
		logger.info(me.popovers);
		alert(`${component} popover is already presenting`);
		return;
	}

	me.popovers[component] = me.popoverCtrl.create(component, data, options || {});

	me.popovers[component]
	.present({ ev: event })
	.then(() => me.dismissLoading('') )
	.catch(logger.e);

	me.popovers[component]
	.onDidDismiss( (didMissData, role) => {
		delete me.popovers[component];

		callback && callback.onDidDismiss && callback.onDidDismiss(didMissData, role);
	});

	me.popovers[component]
	.onWillDismiss( (willDismissData, role) => {
		delete me.popovers[component];

		callback && callback.onWillDismiss && callback.onWillDismiss(willDismissData, role);
	});

};
