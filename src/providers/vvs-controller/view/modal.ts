import { ModalOptions, Nav } from "ionic-angular";
import { Logger } from "../util/logger";
import { VVSApp } from "../vvs-controller";
import { isBoolean } from "lodash";
import { pages } from "../../../pages";
import * as TabsEnum from '../../../enums/tabs.enum';

const logger = Logger.get("modal");

export const _presentModal = (
	me: VVSApp,
	component?: string,
	data?: object,
	onDidDismiss?: (d: boolean) => void,
	options = {} as ModalOptions,
	id = ""
) => {

	const modalKey = component + id;

	if (me.modals[modalKey]) {
		logger.info(me.modals);
		alert(`${component} modal is already presenting`);
		return;
	}

	me.modals[modalKey] = me.modalCtrl.create(component, data, options);

	onDidDismiss = onDidDismiss || function() { logger.l("arguments", arguments); };

	me.modals[modalKey].onDidDismiss( (val: boolean) => {
		// logger.assert(!isBoolean(val), "dismiss value must be a boolean", val);
		if ( component === "recent-activity-filter" ) {

		} else if ( !isBoolean(val) ) {
			logger.warn("dismiss value must be a boolean", val);
		}
		// me.modals[modalKey] = undefined;
		delete me.modals[modalKey];
		onDidDismiss(val);

		if ( (me.getActiveNav() as Nav).root === pages.tabs ) {
			logger.assert(me.tabsRef._tabs.length !== 5, "We must have 5 tabs");
			if(me.tabsRef._tabs[TabsEnum.HOME].isSelected === true) {
				me.homeInOut.next(1);
			}
		}
		// logger.i("presentModal", me.getActiveNav());
	});
	me.modals[modalKey]
		.onWillDismiss( (val: any) => {
			delete me.modals[modalKey];
			onDidDismiss(val);
		});

	return me.modals[modalKey]
		.present({
			id: modalKey
		})
		.then(function(e) {
			// console.log(this);
			// debugger;
			// logger.info(e);
			// logger.info(me.getActiveNav());
			if ( (me.getActiveNav() as Nav).root === pages.tabs ) {
				logger.i("presentModal", me.tabsRef);
				logger.assert(me.tabsRef._tabs.length !== 5, "We must have 5 tabs");
				if(me.tabsRef._tabs[TabsEnum.HOME].isSelected === true) {
					me.homeInOut.next(0);
				}
			}
		})
		.then( () => me.dismissLoading('_present-modal') )
		.catch(logger.e);
};
