// tslint:disable
import { forEach, isFunction } from "lodash";
import { Logger } from "../providers/vvs-controller/util/logger";
import { ENV } from "../environments";

const arr: any[] = [];
let index: number = 0;

const logger = Logger.get("debugMe");

const DISABLE_DEBUG = true;


export const debugUs = (...funcs: Function[]) => {
	if (ENV.isNative || DISABLE_DEBUG) {
		return;
	}

	const activate = true;
	if (activate) {
		funcs.map( x => debugMe(x, x.name) );
	}
};

// tslint:disable-next-line: ban-types
export const debugMe = (func: Function, label = "") => {
	if (ENV.isNative || DISABLE_DEBUG) {
		return;
	}

	Object.keys(func.prototype).forEach( key => {
		// tslint:disable-next-line: no-console
		console.log("debugMe: " + label, key);
		try {
			if (isFunction(func.prototype[key])) {
				const a = func.prototype[key];
				func.prototype[key] = function () {
					JSONstringify(
						`${index++} - [DEBUGGER] Call ${label} ${func.name}/${key}`,
						Array.from(arguments),
					);
					// logger.info(`${index++} - [DEBUGGER] Call ${label} ${func.name}/${key}`, JSONstringify( Array.from(arguments) ) );
					return a.apply(this, arguments);
				};
			}
		} catch (e) {
			console.warn("lol", e);
		}
	});
};

function JSONstringify(info, json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, '\t');
    }

    let
        arr = [],
        _string = 'color:green',
        _number = 'color:darkorange',
        _boolean = 'color:blue',
        _null = 'color:magenta',
        _key = 'color:red';

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let style = _number;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                style = _key;
            } else {
                style = _string;
            }
        } else if (/true|false/.test(match)) {
            style = _boolean;
        } else if (/null/.test(match)) {
            style = _null;
        }
        arr.push(style);
        arr.push('');
        return '%c' + match + '%c';
    });

    arr.unshift(json);

	// console.group();
    console.log.call(console, info);
	console.log.apply(console, arr);
	// console.groupEnd();
}
// tslint:enable
