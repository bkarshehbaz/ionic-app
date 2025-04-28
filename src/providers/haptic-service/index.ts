import { TapticEngine } from "@ionic-native/taptic-engine/ngx";
import { Logger } from "../vvs-controller/util/logger";

import { throttle } from "lodash";

const logger = Logger.get("Taptic");

export class Taptic {

	static light = throttle( () => {
		Taptic.haptic.impact({ style: "light" }).catch(logger.error);
	}, 250);

	static error = throttle( () => {
		Taptic.haptic.notification({ type: "error" }).catch(logger.error);
	}, 250);

	static warning = throttle( () => {
		Taptic.haptic.notification({ type: "warning" }).catch(logger.error);
	}, 250);

	static success = throttle( () => {
		Taptic.haptic.notification({ type: "success" }).catch(logger.error);
	}, 250);

	static selection = throttle( () => {
		Taptic.haptic.selection().catch(logger.error);
	}, 250);

	static setTaptic(haptic: TapticEngine) {
		Taptic.haptic = haptic;
	}

	private static haptic: TapticEngine;

}
