/*
 * source: https://gist.github.com/solendil/412d09202cea7b4544dcc57114c1151a
 * Copyright 2016, Matthieu Dumas
 * This work is licensed under the Creative Commons Attribution 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
 */

/* Usage :
 * var log = Logger.get("myModule") // .level(Logger.ALL) implicit
 * log.info("always a string as first argument", then, other, stuff)
 * log.level(Logger.WARN) // or ALL, DEBUG, INFO, WARN, ERROR, OFF
 * log.debug("does not show")
 * log("but this does because direct call on logger is not filtered by level")
 */
import { noop } from "lodash";
import { StringMap } from "../../../lib/vvs-bridge";
import { RollbarService } from "../../../services/rollbar";

export interface ILogger {
    i(...args: any[]): void; info(...args: any[]): void;
    w(...args: any[]): void; warn(...args: any[]): void;
    l(...args: any[]): void; log(...args: any[]): void;
	e(...args: any[]): void; error(...args: any[]): void;
    d(): void; debug(): void;
	level($level: ILevel): ILogger;
	/**
	 * @param actual -- if actual is true, then it print error
	 * @param reason -- if actual is true, then print the reason
	 */
    a(actual: any, reason: string, ...args: any[]): void; assert(actual: any, reason: string, ...args: any[]): void;
    // group();
    // groupEnd();
}

type ILevel = -100|100|200|300|400|500;
export interface ILevels {
	DEBUGGER: -100;
    ALL:100;
    DEBUG:100;
    INFO:200;
    WARN:300;
    ERROR:400;
    OFF:500;
}

export const levels: ILevels = {
	DEBUGGER: -100,
    ALL:100,
    DEBUG:100,
    INFO:200,
    WARN:300,
    ERROR:400,
    OFF:500
};

function _debugger() {
    // debugger; // tslint:disable-line:no-debugger
}

export class Logger {

	// public static vvsApp: VVSApp;

    public static setProductionMode(val: boolean = true) {
        Logger.logLevel = val ? levels.WARN : levels.ALL;
	}

	public static setDebuggerMode(val: boolean = true) {
		Logger.logLevel = val ? levels.DEBUGGER : Logger.logLevel;
	}

    public static get(id): ILogger {
        let res: ILogger = Logger.loggerCache[id];
        if (!res) {
            const ctx: any = { id, level: Logger.level }; // create a context
			ctx.level(Logger.logLevel); // apply level

            res = ctx.l || {}; // extract the log function, copy context to it and returns it

            for (const prop in ctx) { // tslint:disable-line:forin
                res[prop] = ctx[prop];
            }
            Logger.loggerCache[id] = res;
        }
        return res;
	}

	private static loggerCache:StringMap<ILogger> = {};

    private static logLevel:ILevel  = levels.ALL;

    private static level = function($level: ILevel): ILogger {
        // tslint:disable: no-console
        this.e = this.error = $level<=levels.ERROR ? console.error.bind(console, "["+this.id+"] - ERROR -") : noop;
        // this.error = $level<=levels.ERROR ? console.error.bind(console, "["+this.id+"] - ERROR -") : noop;
        this.w = this.warn = $level<=levels.WARN ? console.warn.bind(console, "["+this.id+"] - WARN -") : noop;
        this.i = this.info = $level<=levels.INFO ? console.info.bind(console, "["+this.id+"] - INFO -") : noop;
		this.l = this.log = $level<=levels.DEBUG ? console.log.bind(console, "["+this.id+"] - DEBUG -") : noop;
        // tslint:enable: no-console
        this.d = this.debug = $level<=levels.DEBUG ? _debugger : noop;
        // this.group = this.debug = $level<levels.DEBUG ? console.group.bind(console) : noop;
		// this.groupEnd = this.debug = $level<levels.DEBUG ? console.group.bind(console) : noop;
		const me = this;
        this.assert = function(actual: any, reason: string, ...args: any[]) {
            if (actual) {
				// this.warn/* error */('[IGNORING FOR NOW] VVS ASSERT: ', reason, ...args);
				if (Logger.logLevel === levels.DEBUGGER) {
					debugger; // tslint:disable-line:no-debugger
				}

				Array.prototype.shift.call(arguments);
				// Array.prototype.shift.call(arguments);
				Array.prototype.unshift.call(arguments, "["+me.id+"] - DEBUG -");
				// Array.prototype.unshift.call(arguments, { actual, reason });

				RollbarService.error([].slice.call(arguments));
            }
        };
        return this;
    };

}
