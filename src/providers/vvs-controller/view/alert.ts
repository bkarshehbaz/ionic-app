import { AlertInputOptions, AlertButton } from "ionic-angular/umd/components/alert/alert-options";
import { Logger } from "../util/logger";
import { VVSApp } from "../vvs-controller";
import { toString } from "lodash";
import * as t from '../../../constants/constant-titles';
import * as cf from '../../../constants/constant-fields';

const logger = Logger.get("alert");

export interface IPresentConfirm {
	cssClass?: string;
	buttons?: AlertButton[];
	message: string;
	title: string;
	/**
	 * Cancel text is t.CANCEL
	 */
	cancelText?: string;
	cancelCB?: any;
	/**
	 * Default is t.YES
	 */
	submitText?: string;
	submitCB?: any;
}

const getButtons = (options: IPresentConfirm) => {
	const { cancelCB, cancelText, submitCB, submitText } = options;

	const buttons = [
		{
			text: cancelText || t.CANCEL,
			role: cf.cancel,
			// tslint:disable-next-line: object-literal-shorthand
			handler: function() {
				// tslint:disable-next-line: no-debugger
				// debugger;
				// console.log(this)
				// console.log(arguments)
				cancelCB && cancelCB();
				return;
			}
		},
		{
			text: submitText || t.YES, // t.ADD,
			handler: (data: any) => submitCB && submitCB(data)
		}
	];

	return buttons;
};

export const _presentConfirm = (me: VVSApp, options: IPresentConfirm) => {

	const buttons = options.buttons || getButtons(options);

	const alert = me.alertCtrl.create({
		title: toString(options.title),
		message: toString(options.message),
		buttons,
		cssClass: options.cssClass
	});

	alert.onDidDismiss( () => me.dismissLoading('did-dismiss-confirm') );

	return alert.present().then().catch(logger.e);
};

export const _presentAlertWithInput = (
	me: VVSApp,
	title: string,
	inputs: AlertInputOptions[],
	buttons: AlertButton[],
	defaultText = "",
	onDidDismiss?: any
) => {
	// if (this.platform.is("cordova")) {
	// 	return this.dialogs
	// 	.prompt("", title, _map(buttons, x => x.text), defaultText)
	// 	.then( (promptVal) => {
	// 		const index = promptVal.buttonIndex  - 1;
	// 		const input = promptVal.input1;
	// 		logger.assert(index >= 0, "Index must be greater or equal to zero");
	// 		const button =  buttons[index];

	// 		if (button.handler) {
	// 			const data: StringMap<string> = {};
	// 			logger.assert(inputs.length === 1, "Only one input is supported as of right now");
	// 			data[inputs[0].name] = input;
	// 			button.handler(data);
	// 		} else {
	// 			logger.error("button.handler must be a function", button);
	// 		}

	// 	});
	// }

	const alert = me.alertCtrl.create({ title, inputs, buttons });

	if (onDidDismiss) {
		alert.onDidDismiss( () => onDidDismiss && onDidDismiss() );
	}


	return alert.present().then().catch(logger.e);
};
