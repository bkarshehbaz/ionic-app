import { VVSApp } from "../vvs-controller";
import { ActionSheetButton } from "ionic-angular";
import { ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { Logger } from "../util/logger";
import * as t from '../../../constants/constant-titles';
import { orderBy, map as _map, isFunction, isNumber } from "lodash";

const logger = Logger.get("action-sheet");

export const _presentActionSheet = (
	me: VVSApp,
	title: string,
	buttons: ActionSheetButton[]
) => {
	// public presentActionSheet(title: string, buttons: []) {

	// alert(JSON.stringify(me.platforms, null, 3));
	if(!me.isNative()) {
		buttons.push({
			text: t.CANCEL,
			role: 'cancel',
			handler: () => {
				//logger.debug('Cancel clicked');
			}
		});

		const actionSheet = me.actionSheetCtrl.create({ title, buttons });

		actionSheet.onDidDismiss( () => me.dismissLoading("actionsheet") );

		me.dismissLoading("actionsheet_presented");

		return actionSheet.present().then().catch(logger.e);

	} else {
		buttons = orderBy( _map(buttons, (button: any, index) => {
			button.index = index;
			return button;
		}), "index");
		const buttonLabels = orderBy(_map(buttons, b => b.text), "index");
		const options: ActionSheetOptions = {
			title,
			subtitle: 'Choose an action',
			buttonLabels,
			addCancelButtonWithLabel: 'Cancel',
			// addDestructiveButtonWithLabel: 'Delete',
			// androidTheme: me.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
			// destructiveButtonLast: true
		};

		return me.actionSheet
		.show(options)
		.then( (_buttonIndex) => { // index of the button pressed (1 based, so 1, 2, 3, etc.)
			const index = _buttonIndex - 1;
			logger.assert(!isNumber(index) || index < 0, "Index must be greater or equal to zero", { _buttonIndex, index });
			const button = buttons[index];

			// alert("ActionSheetNative selected: " + index);
			// alert("ActionSheetNative selected: " + JSON.stringify(button.text, null, 3) );
			if (isFunction(button.handler)) {
				button.handler();
			} else {
				logger.error("handler is undefined");
			}
			me.dismissLoading("navitve_actionsheet_presented");
		})
		.catch( (error) => {
			me.dismissLoading("navitve_actionsheet_presented");
			logger.error(error);
		});
	}

	// actionSheetOptions.buttons;

};
