import * as Rollbar from "rollbar";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { ENV } from "../../environments";
// import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

// const logger = console; // Logger.get("RollbarService").get("RollbarService");

export class RollbarService {

	public static rollbar: Rollbar;
	public static app: any; // VVSApp;

	public static error(...args: any[]) {
		if (!RollbarService.app.isNative()) {
			return Logger.get("RollbarService").error(args);
		}

		RollbarService.init("RollbarService.error").error(args);
	}

	public static warn(...args: any[]) {
		if (!RollbarService.app.isNative()) {
			return Logger.get("RollbarService").warn(args);
		}

		RollbarService.init("RollbarService.warn").warn(args);
	}

	// static configuration = {} as Rollbar.Configuration;

	static configure(obj: Rollbar.Configuration) {
		// RollbarService.configuration = merge({}, RollbarService.configuration, obj);
		RollbarService.init("configure").configure(obj);
	}

	public static init(from: string) {

		if (RollbarService.rollbar) {
			// Logger.get("RollbarService").warn("Already configure", from);
			return RollbarService.rollbar;
		}

		RollbarService.rollbar = new Rollbar();

		const rollbarConfig: Rollbar.Configuration = {
			accessToken: ENV.ROLLBAR_ACCESS_TOKEN,
			captureUncaught: true,
			logLevel: RollbarService.app.isNative() ? "warning" : "debug",
			captureUnhandledRejections: true,
			scrubFields: ['creditCardNumber', 'password'],
			enabled: RollbarService.app.isNative(),
			autoInstrument: {
				log: RollbarService.app.isNative() // prevents rollbar from overriding console.*
			},
			version: ENV.git.short,
			codeVersion: ENV.git.tag,
			environment: ENV.VVS_ENV,
			ignoredMessages: [
				"ImageLoader Error:  http:native - Ably state is failed, so we don't proceed with the request",
			]
			// checkIgnore: (isUncaught: boolean, arg: Rollbar.LogArgument[]) => {

			// 	console.log("checkIgnore isUncaught", isUncaught);
			// 	console.log("checkIgnore arg", arg);

			// 	if (isUncaught) {

			// 	}

			// 	return true;

			// }
		};
		RollbarService.rollbar = new Rollbar(rollbarConfig);

		Logger.get("RollbarService").info("rollbar configured", RollbarService.rollbar);

		return RollbarService.rollbar;
	}
}
