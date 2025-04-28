import { VVSApp } from "../vvs-controller/vvs-controller";
import { Optional } from "@angular/core";
import { NumericMap } from "../../lib/vvs-bridge";
import { isEmpty, cloneDeep, merge, sample, forEach, keyBy } from "lodash";
import { RollbarService } from "../../services/rollbar";
import { checkValue } from "../../util";
// import { VVSIDType } from "../../constants/ids";
import { Logger } from "../vvs-controller/util/logger";

import { ENV } from "../../environments";

const logger = Logger.get("LSSBase");


export type VVSIDType = "currentTicketID" |
"ticketSequenceID" |
"ticketTypeID" |
"propertyID" |
"userID" |
"parkAreaID" |
"colorID" |
"eventID" |
// "eventPartyID" |
"makeID" |
"modelID" |
"chatID" |
"recentActivityTypeID" |
"recentActivityID" |
"customerID" |
"carID" |
// "transactionID" |
"paymentTypeID" |
// "companyArrivalID" |
"uuid";

export type StorageKey = "CurrentTicket" |
"BUSY_MODE" |
"TicketType" |
"ParkArea" |
"Property"|
// "CompanyArrival" |
// "EventParty" |
"CalendarEvent" |
"Color" |
"Chat" |
"LoginUser" |
"Make" |
"Model" |
"CommonMake" |
"CommonModel" |
"PropertyUser" |
"CurrentUser" |
"RecentActivityType" |
"RecentActivity" |
"Environment" |
"DevMode" |
"CHANNEL" |
"RecentActivityBadge" |
"ChatBadge" |

"PaymentType" | 
"Payment" |

"LastSync";

const ignorePrefix: StorageKey[] = [
	"DevMode", "CHANNEL", "Environment"
];

// declare global {
// 	interface String {
// 		prefixEnv(): any;
// 	}
// }

// String.prototype.prefixEnv = function() {
//     // tslint:disable-next-line: no-invalid-this
// 	// return `${ENV.CURRENT_ENV}_${this.split("_").pop()}`;
// 	return this; // tslint:disable-line: no-invalid-this
// };

export class LSSBase {

	constructor(@Optional() public vvsApp: VVSApp) {

		const _set = this.vvsApp.storage.set;
		const _get = this.vvsApp.storage.get;

		this.vvsApp.storage.set = function(key: string, value: any) {
			if (!ignorePrefix.includes(key as StorageKey)) {
				key = `${ENV.CURRENT_ENV}_${key}`;
			}
			return _set.apply(this, [key, value]);
		};

		this.vvsApp.storage.get = function(key: string) {
			if (!ignorePrefix.includes(key as StorageKey)) {
				key = `${ENV.CURRENT_ENV}_${key}`;
			}
			return _get.apply(this, [key]);
		};

	}

    clearLocalStorage = () => {
		this.storageMap = {} as any;

		// const DevMode = this.getRawValue("DevMode");
		// const Environment = this.getRawValue("Environment");

		this.vvsApp
		.storage.clear()
		// .then( () => {
		// 	this._setString("DevMode", DevMode);
		// 	this._setString("Environment", Environment);
		// })
		.catch( (error) => {
			RollbarService.error(error);
		});
	}

	getRawValue(key: StorageKey) {
		// key = key.prefixEnv();

		return this.storageMap[key];
	}

	public _get(key: StorageKey) {
		// key = key.prefixEnv();

        if (!isEmpty(this.storageMap[key])) {
            return this._resolve(cloneDeep(this.storageMap[key]));
        } else {
            return this.vvsApp.storage.get(key)
			.then( (value) => cloneDeep(this._returnValue(key, value)) )
			.catch( (error) => {
				RollbarService.error(error);
			});
        }
	}

	public _set = (key: StorageKey, v: object) => {
		// key = key.prefixEnv();

        this.storageMap[key] = merge({}, this.storageMap[key], v); // {...{}, ...this.storageMap[k], ...v};
		return this.vvsApp.storage.set(key, this.storageMap[key]).then()
		.catch( (error: Error) => {
			RollbarService.error({ msg:"error when setting key", key, error });
			throw error; // resignal
		});
	}

	public _setString = (k: StorageKey, v: string, prefixMe = true) => {
		// if (prefixMe) {
		// 	k = k.prefixEnv();
		// }

        this.storageMap[k] = v; // {...{}, ...this.storageMap[k], ...v};
		return this.vvsApp.storage.set(k, this.storageMap[k]).then()
		.catch( (error: Error) => {
			RollbarService.error({ msg:"error when setting string key", key: k, error });
			throw error; // resignal
		});
	}

	protected _returnValue = (k: StorageKey, v: any) => {
		// k = k.prefixEnv();

		return this.storageMap[k] = checkValue(v) ? v : {};
	}

    // protected _getArray = (k: sK.StorageKey) => this._get(k).then( (v) => isEmpty(v) ? [] : isArray(v) ? v : values(v) ).catch(logger.e);

	// tslint:disable-next-line: member-ordering
	public _getString = (k: StorageKey, prefixMe = true): Promise<string> => {

		// if (prefixMe) {
		// 	k = k.prefixEnv();
		// }

		return this.vvsApp.storage.get(k)
		.then( v => this.storageMap[k] = isEmpty(v) ? undefined : v )
		.catch( (error: Error) => {
			RollbarService.error({ msg:"error when getting string key", key: k, error });
			throw error; // resignal
		});
	}

	// tslint:disable-next-line: member-ordering
	remove(key: StorageKey) {
		// key = key.prefixEnv();
		return this._remove(key);
	}

	protected _setKeyBy = (k: StorageKey, v: any, _by: VVSIDType) => {
		// k = k.prefixEnv();

		return this._set(k, keyBy(v, _by)).catch(logger.e);
	}

	protected _resolve = (v: any) =>
		Promise.resolve(v).catch(logger.e)

    protected _remove(key: StorageKey) {
		// key = key.prefixEnv();

        this.storageMap[key] = undefined;
		return this.vvsApp.storage.remove(key).then()
		.catch( (error) => {
			RollbarService.error(error);
		});
    }

    protected _update(key: StorageKey, $values: object[] = [], _by: VVSIDType, event?: string) {
		// key = key.prefixEnv();

		logger.info("_update", key, $values, _by);
		logger.assert(!(sample($values) || {})[_by], `any value in $values must contain the _by: ${_by} provided. Event: ${event}`);

		if (!(sample($values) || {})[_by]) {
			return Promise.resolve();
		}

        return this._get(key)
            .then((ignoreMap: NumericMap<any> = {}) => {
                forEach($values, ($value: any) => {
					// logger.info("_update pre", JSON.stringify({ $values, ticket: this.storageMap[key][$value[_by]] }, null, 4) );
					// debugger;
					this.storageMap[key][$value[_by]] = merge({}, this.storageMap[key][$value[_by]], $value);
					// logger.info("_update post", JSON.stringify({ $values, ticket: this.storageMap[key][$value[_by]] }, null, 4) );
					// debugger;
				});
                return this._set(key, this.storageMap[key])
                    .then( (val) => {
                        logger.i(`${this.storageMap[key]} updated by ${_by}`, { keyValue: this.storageMap[key], _by, key, $values, val });
                    })
                    .catch( (error: Error) => RollbarService.error({ msg:"error when updating value", key, error }));
            })
            .catch( (error: Error) => RollbarService.error({ msg:"error when updating value", key, error }));
	}

	private storageMap = {} as any;

}
