import { Pipe, PipeTransform } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { IRecentActivity, IRecentActivityType, NumericMap, IUser, ICurrentTicket } from '../../lib/vvs-bridge';
import { toString, capitalize, memoize } from "lodash";
// import { memoize } from 'lodash';
import { to } from '../../util/to';

@Pipe({
    name: 'activityType'
})
export class ActivityTypePipe implements PipeTransform {

	constructor(private vvsApp: VVSApp) {}

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform = memoize(
		async (
			ra: IRecentActivity,
			field: "recentActivityMessage" | "color"
		): Promise<string|IRecentActivityType> => {

			if (!ra) {
				return;
			}
			// const tmp = moment(createDate).calendar();

			const [activityType] = await to<NumericMap<IRecentActivityType>>(this.vvsApp.lss.getRecentActivityTypeData());

			const aType = activityType[ra.recentActivityTypeID];
			if (aType && field) {
				if (field == "recentActivityMessage") {

					let fName: string;
					let lName: string;
					if (ra.userID) {
						const yourID = this.vvsApp.userID;
						if (yourID == ra.userID) {
							fName = "you";
						} else {
							const [users] = await to<NumericMap<IUser>>(this.vvsApp.lss.getPropertyUserData());

							if (users && users[ra.userID]) {
								fName = users[ra.userID].userFirstName;
								lName = users[ra.userID].userLastName;
							}
							// let user = this.vvsApp.lss.getPropertyUserDataAsync()[ra.userID] || {} as any;
						}
					} else if (ra.currentTicketID) {

						const [tickets] = await to<NumericMap<ICurrentTicket>>(this.vvsApp.lss.getCurrentTicketData());

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
				return aType[field];
			}

			return aType;
		},
		(ra: IRecentActivity, field: "recentActivityMessage" | "color"): any =>
			ra ? ra.recentActivityID + field : null
	);

}
