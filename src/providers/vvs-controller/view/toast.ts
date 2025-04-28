import { ToastOptions, Toast, ToastCmp } from "ionic-angular";
import { VVSApp } from "../vvs-controller";
import { Logger } from "../util/logger";
import { StringMap } from "../../../lib/vvs-bridge";

const logger = Logger.get("toast");

let overridden = -1;

// hack: unhandled removed view
const override = () => {
	ToastCmp.prototype.dismiss = function(role) {
		clearTimeout(this.dismissTimeout); // tslint:disable-line: no-invalid-this
		this.dismissTimeout = undefined; // tslint:disable-line: no-invalid-this
		return this._viewCtrl.dismiss(null, role, { disableApp: false }).catch(logger.error); // tslint:disable-line: no-invalid-this
	} as any;

	overridden = 1;
};


const toasts: StringMap<Toast> = {};
/**
 * toast: wrapper to create toast
 * @method presetToast
 * @param  {string}    message  message to show in the toast
 * @param  {number}    duration the time the toast will last
 * @param  {string}    position [description]
 * @return {[type]}             [description]
 */
export const _toast = (
	me: VVSApp,
	message: string,
	duration: number = 1000,
	position: "top" | "middle" | "bottom" = "top"
) => {

	if (overridden == -1) {
		override();
	}

	if (!message || toasts[message]) {
		return Promise.resolve();
	}



	const toastOptions: ToastOptions = {
		message,
		duration: duration + 1500,
		position,
		dismissOnPageChange: true
	};

	toasts[message] = me.toastCtrl.create(toastOptions);

	// hack
	setTimeout( () => {
		toasts[message].dismiss().then( () => delete toasts[message] )
		.catch((error) => {
			delete toasts[message];
			logger.error(error);
		});
	}, duration);

	toasts[message].present().then().catch(logger.error);

	// return me.toastCtrl
	// .create(toastOptions)

};
