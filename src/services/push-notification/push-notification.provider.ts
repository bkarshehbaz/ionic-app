/**
 * @author Lucas Estrella
 */
import { OSNotification, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { Logger } from "../../providers/vvs-controller/util/logger";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { get, isEmpty } from "lodash";
import * as TabsEnum from '../../enums/tabs.enum';
import { ICurrentTicket } from '../../lib/vvs-bridge';
import { Nav } from 'ionic-angular';
import { Delay, Attempt } from 'lodash-decorators';
import { to } from '../../util/to';
import { RollbarService } from '../rollbar';
import { IOneSignalAction } from '../../lib/vvs-bridge/api-return';

const logger = Logger.get("PushNotificationService");

interface IOneSignalText {
    en: string;
    es?: string;
}

/**
 * @see https://documentation.onesignal.com/docs/ionic-sdk-setup
 * 5.0 Open <project-root>/platform/ios/YourAppName.xcworkspace
 * 5.1 Select the root project and Under Capabilities Enable "Push Notifications".
 * 5.2 Next Enable "Background Modes" and check "Remote notifications".
 *
 * @see https://www.youtube.com/watch?v=RXENKe1Cvvg
 * Push Notifications with Ionic 3 using OneSignal
 */

let me: PushNotificationService;

export class PushNotificationService {

	public static instance: PushNotificationService;
	public static get(vvsApp: VVSApp) {
		return PushNotificationService.instance || (PushNotificationService.instance = new PushNotificationService(vvsApp));
	}

	constructor(private vvsApp: VVSApp) {
		me = this;
	}

	@Attempt()
    async init(stage: string, propertyID: number, oneSignalAppID: string) {
		if(!me.vvsApp.isNative()) {
            return;
		}

		await me.vvsApp.ready();

		// me.vvsApp.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});

		// (me.oneSignal as any).setEmail("lucas.estrella@vvs.org");

		me.vvsApp.oneSignal.startInit(oneSignalAppID);

		// NOTE: investigate the sendTag method to only subscribe to a desired channel({{staged}}:{{propertyID}})
		me.vvsApp.oneSignal.sendTag("propertyID", `${stage}:${propertyID}`);

		// don't show when app is running
		// me.vvsApp.oneSignal.inFocusDisplaying(me.vvsApp.oneSignal.OSInFocusDisplayOption.InAppAlert);
		me.vvsApp.oneSignal.inFocusDisplaying(me.vvsApp.oneSignal.OSInFocusDisplayOption.None);

		me.vvsApp.oneSignal.iOSSettings({
			kOSSettingsKeyAutoPrompt: true,
			kOSSettingsKeyInAppLaunchURL: false
		});

		me.vvsApp.oneSignal.handleNotificationReceived()
		.subscribe(
			(data: OSNotification) => {
				// do something when notification is received
				logger.info("notification", data);
			},
			logger.error
		);

        me.vvsApp.oneSignal.handleNotificationOpened()
		.subscribe(
			(result: OSNotificationOpenedResult) => me.onNotificationOpened(result),
			logger.error
		);

		// me.vvsApp.oneSignal.registerForPushNotifications();

        me.vvsApp.oneSignal.endInit();
    }

    // push(title: string = "", subtitle: string = "", message: string = "") {

    //     me.vvsApp.oneSignal
    //         .getIds()
    //         .then( (ids: { userId: string; pushToken: string; }) => {

    //             const osNotification = {} as OSNotification;
    //             osNotification.include_player_ids = [ ids.userId ];
    //             osNotification.headings = { en: "Hello headings"} as IOneSignalText;
    //             osNotification.contents = { en: "Hello content"} as IOneSignalText;

    //             return me.vvsApp.oneSignal.postNotification(osNotification)
	// 		})
	// 		.then(logger.info)
    //         .catch(logger.e);
	// }

	@Attempt()
	async onNotificationOpened(result: OSNotificationOpenedResult) {
		me.vvsApp.presentLoading("", 4000);
		// me.vvsApp.presentSingleAlert(JSON.stringify(notification || {}));
		// const action = result.action;
		const additionalData: {
			action: IOneSignalAction,
			id: number
		} = get(result, "notification.payload.additionalData");

		if (additionalData) {

			const [data, error] = await to(new Promise( (res, rej) => me.vvsApp.httpService.doSync(res, rej) ));

			if (error) {
				RollbarService.error(error);
			}

			const currentNav = me.vvsApp.app.getRootNavs() as Nav[];

			if (currentNav && currentNav[0] && currentNav[0].root !== "tabs") {
				me.vvsApp.dismissLoading('tabs');
				return;
			}

			const { action, id } = additionalData;
			if (isEmpty(action) ) {
				me.vvsApp.presentSingleAlert("Push Notification Action is undefined (testing)");
				return;
			}

			switch(action) {

				case "insert_chat":
					setTimeout( () => {
						if (me.vvsApp.tabsRef) {
							me.vvsApp.tabsRef.select(TabsEnum.CHAT)
							.catch(logger.error)
							.then( () => me.vvsApp.dismissLoading('insert-chat') );
						}
						me.vvsApp.dismissLoading('insert-chat2');
					}, 1500);
					break;

				case "checkin":
				case "checkout":
				case "rcheckin":
				case "pull":
				case "park":
				case "paycard":
				case "paycash":
				case "paycomp":
				case "payvoucher":
					me.vvsApp.lss.getCurrentTicketByID(id, PushNotificationService.name)
					.then( (ticket: ICurrentTicket) => me.vvsApp.openTicket(ticket) )
					.catch(RollbarService.error)
					.then( () => me.vvsApp.dismissLoading('park') );
					break;
			}

		}
	}

}
