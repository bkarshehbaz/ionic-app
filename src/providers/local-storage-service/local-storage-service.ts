/*
 * Copyright (c) 2017 VVS LLC
 *
 * Author: Lucas Estrella
 */
import { Optional } from "@angular/core";
import * as lssUtil from './util/index';
// import { VVSIDType } from '../../constants/ids';
// import * as cf from '../../constants/constant-fields';
// import * as ids from '../../constants/ids'; // tslint:disable-line:no-duplicate-imports
// import * as sK from '../../constants/storage-keys';
import * as CI from '../../lib/vvs-bridge/api-return';
import { cloneDeep, find, forEach, isEmpty, values, isNumber, memoize, orderBy, filter, differenceBy, set, toString, capitalize } from 'lodash';
import { checkValue, getCustomerFullName } from '../../util/index';

import * as vvsBridge from '../../lib/vvs-bridge';

// tslint:disable-next-line: no-duplicate-imports
import {
	IChat, IColor, ICommonMake, ICommonModel,
	/* ICompanyArrival, IEventParty,*/ IParkArea,
	IRecentActivity, IUser, NumericMap,
	StringMap, IMake, IModel, ILicenseID, ICalendarEvent, IPaymentType,
} from '../../lib/vvs-bridge';

import { VVSApp } from '../vvs-controller/vvs-controller';

import { merge as rxjs_merge, of, Observable, Subject  } from 'rxjs';
import { catchError, delay, map as rxjs_map } from 'rxjs/operators';
import { Logger } from "../vvs-controller/util/logger";
import { TokenInterceptor } from '../http-service/token.interceptor';
import { equalsIgnoreCase } from "../../util/equals-ignore-case";
import { RollbarService } from "../../services/rollbar";
import { LSSBase } from "./local-storage-service.base";
// import * as cf from "../../constants/constant-fields";
import { _processRecentActivityToDisplay } from "./util/index";

import * as moment from 'moment';
import { Memoize } from "lodash-decorators";
import { to } from "../../util/to";
import { EnvService } from "../env-service";
import { ENV } from "../../environments";
import { getBalance } from "../../util/get-balance";

const logger = Logger.get("local-storage-service");


let me: LocalStorageService;

export type IEnv = "prod" | "dev" | "local" | "qa" | "uat" | "unittesting";
export type IChannel = "Production" | "Master" | "Qa" | "Uat" | "Local";

export class LocalStorageService extends LSSBase {

	public static instance: LocalStorageService;
	public static get(vvsApp: VVSApp): LocalStorageService {
		return LocalStorageService.instance
		||
		( LocalStorageService.instance = new LocalStorageService(vvsApp) );
	}

	public static setLastSync(lastSync: string) {
		LocalStorageService.lastSync = lastSync;
	}
	public static getLastSync() {
		return LocalStorageService.lastSync;
	}
	public static getLastSyncSecondsAgo() {
		const secondsAgo = moment().diff(new Date(LocalStorageService.lastSync), "seconds");

		// logger.assert(!(isNumber(secondsAgo) && secondsAgo >= 0), "secondsAgo must be egreater than 0, secondsAgo: " + secondsAgo);
		// debugger;

		return secondsAgo;
	}
	public get lastSync() {
		return LocalStorageService.lastSync;
	}

    /* All the keys in the st are in the root of the st.
    ** So this means, st.set("colors",colors)... st.get("colors")*/
    constructor(@Optional() public vvsApp: VVSApp) {

		super(vvsApp);

		me = this;

        this.loadJson();

        this.init();
        // this.vvsApp.ready()
        // .then( () => this.getLastSync() )
		// .then( () => this.getPropertyUserData() )
		// // .then( () => this.getCompanyData() )
		// .then( () => this.getColorData() )
		// // .then( () => this.getPropertyData() )
		// .then( () => this.getTicketTypeData() )
		// .then( () => this.getCurrentTicketData() )
		// // .then( () => this.getParkLocationData() )
		// .then( () => this.getParkAreaData() );
    }
    
    async init() {
        await this.vvsApp.ready();
        const [ env ] = await to<IEnv>(this._getString("Environment", false) as any);
        EnvService._env = env || ENV.CURRENT_ENV as any;
        await this.getLastSync();
        await this.getPropertyUserData();
        await this.getColorData();
        await this.getTicketTypeData();
        await this.getCurrentTicketData();
        await this.getParkAreaData();
    }

	setLastSync(val: string) {
		return this._setString("LastSync", val)
		.then( () => LocalStorageService.lastSync = val);
	}
	getLastSync() {
		return this._getString("LastSync")
		.then( lastSync => LocalStorageService.lastSync = lastSync );
    }
    
    getVehicle(makeID, modelID) {
        const make = this._global_makes[makeID] || {} as IMake;
        const model = this._global_models[modelID] || {} as IModel;
        return `${make.makeName} ${model.modelName}`;
    }

    // tslint:disable-next-line:member-ordering
    set global_makes(val) {
        this._global_makes = val;
    }
    get global_makes(): StringMap<IMake> {
        return this._global_makes;
    }
    // tslint:disable-next-line:member-ordering
    public _global_models: StringMap<IModel>;
    set global_models(val) {
        this._global_models = val;
    }
    get global_models() {
        return this._global_models;
    }
    /*
     * Danger Zone
     */
    // tslint:disable-next-line:member-ordering

    /*
     * Danger Zone
     */

    loadJson() {
        rxjs_merge(this.loadMakes(), this.loadModels())
        .subscribe( () => {} );
    }

    loadMakes() {
        return this.vvsApp.http
		.get("assets/json/makes.json")
		.pipe(
			rxjs_map(
                (data: any) => {
					this.global_makes = data;

					of(null)
					.pipe( delay(2000) )
					.subscribe(
						() => {
							this.vvsApp.searchService.initMakeIndex(this.global_makes);
						}
					);
                }
            ),
            catchError( (error) => of(error))
        );
    }

    loadModels(): Observable<any> {
        return this.vvsApp.http
            .get("assets/json/models.json")
            .pipe(
                rxjs_map( (data: any) => {
                    this.global_models = data;
                }),
                catchError( (error) => of(error))
            );
    }

	getMake(makeID: number) {
		return this.global_makes[makeID];
	}

	getModel(modelID: number) {
		return this.global_models[modelID];
	}

    getMakes(): Promise<NumericMap<vvsBridge.IMake>> {
        if (!isEmpty(this.global_makes)) {
            return new Promise<NumericMap<vvsBridge.IMake>>( (resolve, reject) => {
                resolve(this.global_makes);
            });
        } else {
            return this.loadMakes().toPromise();
        }
    }

    getModels(): Promise<NumericMap<vvsBridge.IModel>> {
		if (!isEmpty(this.global_models)) {
            return new Promise<NumericMap<vvsBridge.IModel>>( (resolve, reject) => resolve(this.global_models) );
        } else {
            this.loadModels().toPromise();
        }
    }

	getModelsByMakeID($makeID: number): Promise<vvsBridge.IModel[]> {
        if (checkValue(this.global_models)) {
            return new Promise<any>( (resolve, reject) => {
                resolve( filter(this.global_models, ($model: vvsBridge.IModel) => $model.makeID == $makeID ) );
                // resolve( values(this.global_models).filter( ($model: vvsBridge.IModel) => $model.makeID == $makeID ) );
            });
        } else {
            this.vvsApp.presentSingleAlert("models isNil");
            logger.error("models isNil");
        }
    }

    /******************************************************************
    * Observables Closes
    *******************************************************************/



    /* key:
    ** parameter:
    ** return st keyset*/
    getAllKeys(): Promise<void | string[]> {
        return this.vvsApp.storage.keys().catch(logger.e);
    }


    // /******************************************************************
    // * Reminders
    // * Set and get reminders
    // * key: reminders
    // *******************************************************************/
    // // $reminders: Reminder[];
    // setReminders(v: any[]): void {
    //     // this.set("Reminder,v).catch(logger.e);
    // }
    // getReminders(): Promise<any[]> {
    //     return Promise.resolve([]);
    // }

    handleAllTicketData = (data: CI.IInitialize) =>
        lssUtil._handleAllTicketData(this, data)


    setCurrentTicketData = (v: vvsBridge.ICurrentTicket[]) => this._setKeyBy("CurrentTicket", v, "currentTicketID");
    // getCurrentTicketData = (): Promise<NumericMap<vvsBridge.ICurrentTicket>> => this._get("CurrentTicket");
    getCurrentTicketData = async (): Promise<NumericMap<vvsBridge.ICurrentTicket>> => {

        // const tickets = await this._get("CurrentTicket");
        // const colors = await this.getColorData()

        return Promise.all([
            this._get("CurrentTicket"),
            this.vvsApp.lss.getTicketTypeData(),
            this.getColorData()
        ])
        .then( ([ tickets, ticketTyppes, colors]) => {
            forEach(tickets, (ticket: vvsBridge.ICurrentTicket) => {
                ticket.balance = getBalance(ticket); // 14.99;
                ticket.customerFullName = ticket.customerFullName || getCustomerFullName(ticket.Customer);
                if (ticket.Car) {
                    ticket.Car.colorHex = (colors[ticket.Car.colorID] || {} as any).colorName;
                }
                ticket.TicketType = ticketTyppes[ticket.ticketTypeID];
            });

            return tickets;
        });
    }

    updateCurrentTicketData = (event: string, ...currentTickets: vvsBridge.ICurrentTicket[]) =>
        this._update("CurrentTicket", currentTickets, "currentTicketID", event)

    getCurrentTicketByID = (currentTicketID: number, from: string): Promise<vvsBridge.ICurrentTicket> => {
        return this.getCurrentTicketData()
		.then( (currentTicketData: any) => {

            if (isEmpty(currentTicketData[currentTicketID])) {
                throw new Error(`Ticket not found! { currentTicketID: ${currentTicketID}}, from : ${from}`);
                // logger.assert(isEmpty(currentTicketData[currentTicketID]), "If we have the currentTicketID, it means the ticket must exists(not empty)", currentTicketData[currentTicketID]);
            }
			return currentTicketData[currentTicketID] || {} as any;
		});
		// .catch(logger.e);
    }
    getCurrentTicketsByIDs = (...IDs: number[]): Promise<void | NumericMap<vvsBridge.ICurrentTicket>> => {
        const tickets = {} as NumericMap<vvsBridge.ICurrentTicket>;

        return this.getCurrentTicketData()
		.then( (ticketObj) => {

			forEach(IDs, (id) => {
				if (ticketObj[id]) {
					tickets[id] = ticketObj[id];
				} else {
					logger.error("currentTicketID is not found", id);
				}
			});

			return tickets;
		})
		.catch(RollbarService.error);
	}
	getCurrentTicketsByVIN = (vin: string): Promise<vvsBridge.ICurrentTicket> => {
        return this.getCurrentTicketData()
		.then( (obj) =>
			find(obj, (x: vvsBridge.ICurrentTicket) => x.Car.vinNumber == vin ) as any
		)
		.catch(RollbarService.error);
    }

    // getCurrentTicketDataAsync = (): NumericMap<vvsBridge.ICurrentTicket> => {
    //     return this.getRawValue("CurrentTicket");
    // }

    // getCurrentTicketByIDAsync = (id: number): vvsBridge.ICurrentTicket => {
    //     logger.assert(isEmpty((this.getRawValue("CurrentTicket") || [])[id]), "If we have the id, it means the ticket must exists(not empty)");

    //     return cloneDeep(this.getRawValue("CurrentTicket")[id]);
    // }
    getCurrentTicketByTicketNumber(ticketNumber: string) {
        return this.getCurrentTicketData()
                   .then( (currentTicketData) => find(currentTicketData, ticket => ticket && ticket.ticketNumber == ticketNumber) )
				   .catch(RollbarService.error);
	}

	getCurrentTicketByCustomer(license: ILicenseID) {
		return this.getCurrentTicketData()
		.then( (currentTicketData) => {
			return find(currentTicketData, ticket => {
				const customer = ticket.Customer;

				return customer.licenseNumber == license.licenseNumber || (
					equalsIgnoreCase(customer.customerFirstName, license.customerFirstName) &&
					(
						equalsIgnoreCase(customer.customerLastName, license.customerLastName)
						// ||
						// equalsIgnoreCase(customer.customerLastName, license.customerFamilyName)
					)
				);
			});
		})
		.catch(RollbarService.error);
	}


    // //TODO replace key
    // clearCurrentTicketData(): void {
    //     this._remove("CurrentTicket").catch(logger.e);
    //     // this.getCurrentTicketToDisplayIn('home');
    // }


    setTicketTypeData = (v: vvsBridge.ITicketType[]) => this._setKeyBy("TicketType", v, "ticketTypeID");
    getTicketTypeData = (): Promise<NumericMap<vvsBridge.ITicketType>> => this._get("TicketType");
	// getAsyncTicketType = (): NumericMap<vvsBridge.ITicketType> => {
    //     this.getTicketTypeData();
    //     return this.getRawValue("TicketType");
    // }


    setParkAreaData = (v: IParkArea[]) => this._setKeyBy("ParkArea", v, "parkAreaID");
    getParkAreaData = () => this._get("ParkArea") as Promise<NumericMap<IParkArea>>;
    // getParkAreaDataAsync = (): NumericMap<vvsBridge.IParkArea> => {
    //     this.getParkAreaData();
    //     return this.getRawValue("ParkArea");
    // }


    setCalendarEventData = (v: ICalendarEvent[]) => this._setKeyBy("CalendarEvent", v, "eventID");
    getCalendarEventData = () => this._get("CalendarEvent") as Promise<NumericMap<ICalendarEvent>>;

    // setCompanyArrivalData = (v: ICompanyArrival[]) => this._setKeyBy("CompanyArrival", v, "companyArrivalID");
    // getCompanyArrivalData = () => this._get("CompanyArrival") as Promise<NumericMap<ICompanyArrival>>;

    // setEventPartyData = (v: IEventParty[]) => this._setKeyBy("EventParty", v, "eventPartyID");
    // getEventPartyData = () => this._get("EventParty") as Promise<NumericMap<IEventParty>>;

    // setPropertyData = (v: IProperty[]) => this._setKeyBy("Property", v, "propertyID);
    // getPropertyData = () => this._get("Property) as Promise<NumericMap<IProperty>>;

    setColorData = (v: IColor[]) => this._setKeyBy("Color", v, "colorID");
    getColorData = () => this._get("Color") as Promise<NumericMap<IColor>>;
    getColorDataAsync = (): NumericMap<IColor> => {
        this.getColorData();
        return this.getRawValue("Color");
    }

    setCommonMakeData = (data: ICommonMake[]) => this._setKeyBy("CommonMake", data, "makeID");
    getCommonMakeData = () => this._get("CommonMake") as Promise<NumericMap<ICommonMake>>;

    setCommonModelData = (data: ICommonModel[]) => this._setKeyBy("CommonModel", data, "modelID");
	getCommonModelData = () => this._get("CommonModel") as Promise<NumericMap<ICommonModel>>;

	// tslint:disable-next-line: member-ordering
	makesWithCommon: IMake[];
	async getMakesWithCommon() {
		if (this.makesWithCommon) {
			return this.makesWithCommon;
		}

		const [common_makes_object] = await to<NumericMap<ICommonMake>>(this.getCommonMakeData());

		let common_makes = orderBy(common_makes_object, ["makePercent"], ["desc"]) as IMake[];

		const [all_makes_object] = await to<NumericMap<IMake>>(this.getMakes());

		if (all_makes_object) {
			const all_makes = values(all_makes_object);
			common_makes = [...common_makes, ...differenceBy(all_makes, common_makes, "makeID")];
		}

		// debugger;

		return this.makesWithCommon = common_makes;
	}

	@Memoize()
	async getModelWithCommon(makeID: number) {
		const [ common_models_object ] = await to<NumericMap<ICommonModel>>(this.getCommonModelData());

		let common_models = orderBy(common_models_object, ["modelPercent"], ["desc"]) as IModel[];

		const [ all_models_object ] = await to<IModel[]>(this.getModelsByMakeID(makeID));

		let all_models: IModel[]; // IModel[]|ICommonModel[];
		if (all_models_object) {
			all_models = filter(all_models_object, model => model.makeID == makeID);
		}

		common_models = [...common_models, ...differenceBy(all_models, common_models, "modelID")];
		// debugger;

		return common_models;
	}

    setChatData = (data: IChat[], fromInitialize?: boolean) => this._setKeyBy("Chat", data, "uuid");
    getChatData = () => this._get("Chat") as Promise<NumericMap<IChat>>;
    updateChatData = (...chats: IChat[]) => this._update("Chat", chats, "uuid",);

	insertChat(newMessage: vvsBridge.IChat) {

		logger.assert(isEmpty(newMessage.uuid), "chat.uuid must never be empty", { chat: newMessage });
		// logger.assert(isEmpty(newMessage.msgContent), "chat.msgContent must never be empty", { chat: newMessage })

        return this.getChatData()
            .then( (messages: NumericMap<vvsBridge.IChat>) => {
                messages = checkValue(messages) ? messages : {};
                messages[newMessage.uuid] = newMessage;
                this.setChatData(values(messages));
			})
			.catch(RollbarService.error);
    }

	/**
	 * current signed in users
	 */
    setCurrentUserData = (currentUsers: {userID: number}[]) => this._setKeyBy("CurrentUser", currentUsers, "userID");
    getCurrentUserData = (): Promise<NumericMap<{userID: number}>> => this._get("CurrentUser");


	/**
	 * all users that can work on the selected property
	 */
    setPropertyUserData = (propertyUsers: IUser[]) => this._setKeyBy("PropertyUser", propertyUsers, "userID");
    getPropertyUserData = (): Promise<NumericMap<IUser>> => this._get("PropertyUser");
	// getPropertyUserDataAsync = (): NumericMap<IUser> => {
    //     this.getPropertyUserData();
    //     return this.getRawValue("PropertyUser");
    // }


    setPaymentTypeData = (paymentTypes: IPaymentType[]) => this._setKeyBy("PaymentType", paymentTypes, "paymentTypeID");
    getPaymentTypeData = (): Promise<NumericMap<IPaymentType>> => this._get("PaymentType");


    setRecentActivityData = (recentActivities: IRecentActivity[]) => this._setKeyBy("RecentActivity", recentActivities, "recentActivityID");
    getRecentActivityData = (): Promise<NumericMap<IRecentActivity>> => this._get("RecentActivity");
    updateRecentActivityData = (...recentActivities: IRecentActivity[]) => this._update("RecentActivity", recentActivities, "recentActivityID");
	getRecentActivityRequiredData = () => {
		return Promise.all([
			me.getRecentActivityData(),
			me.getRecentActivityTypeData(),
			me.getPropertyUserData(),
			me.getCurrentTicketData()
		]);
	}


    setRecentActivityTypeData = (v: vvsBridge.IRecentActivityType[]) => this._setKeyBy("RecentActivityType", v, "recentActivityTypeID");
    getRecentActivityTypeData = (): Promise<NumericMap<vvsBridge.IRecentActivityType>> => this._get("RecentActivityType");
	// getRecentActivityTypeDataAsync = (): NumericMap<vvsBridge.IRecentActivityType> => {
    //     this.getRecentActivityTypeData();
    //     return this.getRawValue("RecentActivityType");
    // }

    // recentActivityToDisplay: vvsBridge.IRecentActivityObservableData;

	async getRecentActivityToDisplayTo(where: string): Promise<any>  {
		const [[recentActivities], error] = await to(this.getRecentActivityRequiredData());

		if (recentActivities) {
			return this._getRecentActivityToDisplayTo(values(recentActivities).length, where);
		} else {
			return {} as any;
		}
	}

    setAuthorization(token: string, ablyToken: string, oneSignalAppID) {
		TokenInterceptor.setToken(token);

		this.getLoginUser()
            .then( (loginUser: vvsBridge.IUser) => {
				loginUser.Authorization = token;
				if (ablyToken) {
					loginUser.AblyToken = ablyToken;
				}
				if (oneSignalAppID) {
					loginUser.ONE_SIGNAL_APP_ID = oneSignalAppID;
				}
                return this.setLoginUser(loginUser);
            })
            .catch(RollbarService.error);
    }

    setCurrentProperty(currentProperty: vvsBridge.IProperty) {
        return this.getLoginUser()
            .then( (loginUser: vvsBridge.IUser) => {
                loginUser.CurrentProperty = currentProperty;
                return this.setLoginUser(loginUser);
            })
            .catch(logger.e);
    }

    /* key: loginUser
    ** parameter: user
    ** return undefined*/
    setLoginUser = (loginUser: vvsBridge.IUser) => {
		this.vvsApp.__user = loginUser;
		return this._set("LoginUser", loginUser);
	}
    getLoginUser = (): Promise<vvsBridge.IUser> => this._get("LoginUser"); // lssUtil._getLoginUser(this);
    // getAsyncLoginUser = (): vvsBridge.IUser => {
    //     this.getLoginUser();
    //     return this.getRawValue("LoginUser");
    // }

    clearLoginUser() {
        return this._remove("LoginUser")
		.then( () => TokenInterceptor.setToken(undefined) )
		.then( () => delete this.vvsApp.__user )
		.catch(RollbarService.error);
		// .then( () => this.vvsApp.imgLC.httpHeaders.set("Authorization", TokenInterceptor.getToken()) );
	}

    /*
    * Socket Events Closed
    */




    // /**
    //  * [groupChatToDisplayInSearch description]
    //  * @return {[type]} [description]
    //  */
    // // tslint:disable-next-line:member-ordering
    // chatItems: NumericMap<vvsBridge.IChat> = {};
    // groupChatToDisplayInSearch = (chatsSubject: Subject<NumericMap<vvsBridge.IChat>>) =>
    // 	lssUtil._groupChatToDisplayInSearch(this, chatsSubject)
    
    private static lastSync: string;

    private _global_makes: StringMap<IMake>;
    
    	// @Memoize( (len: number, where: string) => len + where )
	// tslint:disable-next-line: member-ordering
	private _getRecentActivityToDisplayTo = memoize(
		(rALength: number, where: string): Promise<any> => {
			logger.info("_getRecentActivityToDisplayTo(?, ?)", rALength, where);

			return this.getRecentActivityRequiredData()
			.then( ([recentActivities, recentActivityTypes, users, currentTickets]) => {
                this.transformRecentActivities(recentActivities, recentActivityTypes, users, currentTickets);
				return _processRecentActivityToDisplay(
					{
						recentActivities,
						recentActivityTypes
					}
				)
            })
			.catch( error => {
				RollbarService.error(error);
				const tmp: any = {} as any;

				return tmp;
			});

		},
		(rALength: number, where: string) => rALength + where
	);

    transformRecentActivities(
        recentActivities: vvsBridge.NumericMap<vvsBridge.IRecentActivity>,
        recentActivityTypes: vvsBridge.NumericMap<vvsBridge.IRecentActivityType>,
        users: vvsBridge.NumericMap<vvsBridge.IUser>,
        tickets: vvsBridge.NumericMap<vvsBridge.ICurrentTicket>,
    ) {

        forEach(recentActivities, recentActivity => {
            recentActivity.message = this.getRaMessage(recentActivity, recentActivityTypes, users, tickets);
            recentActivity.activityTimeStampFmt = moment(recentActivity.activityTimeStamp).format("LT");
            recentActivity.color = recentActivityTypes[recentActivity.recentActivityTypeID].color;
        })

    }

    getRaMessage(
        ra: vvsBridge.IRecentActivity,
        recentActivityTypes: vvsBridge.NumericMap<vvsBridge.IRecentActivityType>,
        users: vvsBridge.NumericMap<vvsBridge.IUser>,
        tickets: vvsBridge.NumericMap<vvsBridge.ICurrentTicket>,
    ) {
		
        const aType = recentActivityTypes[ra.recentActivityTypeID];

        let fName: string;
        let lName: string;

        if (ra.userID) {
            const yourID = this.vvsApp.userID;
            if (yourID == ra.userID) {
                fName = "you";
            } else {
                // const [users] = await to<NumericMap<IUser>>(this.vvsApp.lss.getPropertyUserData());

                if (users && users[ra.userID]) {
                    fName = users[ra.userID].userFirstName;
                    lName = users[ra.userID].userLastName;
                }
                // let user = this.vvsApp.lss.getPropertyUserDataAsync()[ra.userID] || {} as any;
            }
        } else if (ra.currentTicketID) {

            // const [tickets] = await to<NumericMap<ICurrentTicket>>(this.vvsApp.lss.getCurrentTicketData());

            if (tickets && tickets[ra.currentTicketID]) {
                const customer = tickets[ra.currentTicketID].Customer || {} as any;
                fName = customer.customerFirstName;
                lName = customer.customerLastName + " customer";
            }
        }
        let message = aType.recentActivityMessage
        .replace("#{userFirstName}", toString(fName))
        .replace("#{userLastName}" , toString(lName))
        .replace("#{ticketNumber}" , "");

        if (fName == "you") {
            message = capitalize(message).replace("has", "have");
        }

        return message;
    }

}

// tslint:enable:no-redundant-jsdoc
