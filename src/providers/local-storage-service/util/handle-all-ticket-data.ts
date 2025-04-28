// import * as cf from "../../../constants/constant-fields";
import { IInitialize } from "../../../lib/vvs-bridge";
import { LocalStorageService } from "../local-storage-service";

import { Logger } from '../../vvs-controller/util/logger';
import { RollbarService } from "../../../services/rollbar";
import { map } from "lodash";
import { StorageKey } from "../local-storage-service.base";
// const logger = Logger.get("handle-all-ticket-data");

/**
 * handles http initialize
 * @param me
 * @param data
 */
export async function _handleAllTicketData(me: LocalStorageService, data: IInitialize) {

	try {
		await Promise.all(
			// tslint:disable-next-line: no-angle-bracket-type-assertion
			map(<StorageKey[]>[
					"CurrentTicket",
					"CommonMake",
					"CommonModel",
					"TicketType",
					"ParkArea",
					"CalendarEvent",
					// "EventParty",
					"CurrentUser",
					"PropertyUser",
					"RecentActivity",
					"Chat",
					"LastSync"
				],
				x => me.vvsApp.lss.remove(x)
			)
		);

		await Promise.all([
			me.setCurrentTicketData(data.CurrentTicket),

			me.setCommonMakeData(data.CommonMake),
			me.setCommonModelData(data.CommonModel),

			me.setTicketTypeData(data.TicketType),


			me.setParkAreaData(data.ParkArea),

			// me.setCompanyArrivalData (data.CompanyArrival),

			// me.setEventPartyData     (data.EventParty),
			me.setCalendarEventData(data.CalendarEvent),

			me.setColorData(data.Color),

			me.setCurrentUserData(data.CurrentUser),
			me.setPropertyUserData(data.PropertyUser),

			me.setRecentActivityTypeData(data.RecentActivityType),
			me.setRecentActivityData(data.RecentActivity),

			me.setPaymentTypeData(data.PaymentType),

			me.setChatData(data.Chat, true),

			me.setLastSync(data.lastSync)
		]);

		await me.vvsApp.refreshData();

	} catch(error) {
		RollbarService.error(error);
	}

}
