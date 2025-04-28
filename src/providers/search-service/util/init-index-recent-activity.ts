import { forEach } from 'lodash';
import { IRecentActivity } from '../../../lib/vvs-bridge';
import { SearchService } from '../search-service';

// TODO: to finish this
export const _initIndexRecentActivity = (me: SearchService, cb: any): void => {

    Promise.all([
                me.lss.getRecentActivityData(),
                me.lss.getRecentActivityTypeData(),
                me.lss.getPropertyUserData(),
                me.lss.getCurrentTicketData()
            ])
            .then( ([recentActivities, recentActivityTypes, propertyUsers, currentTickets]) => {

                forEach(recentActivities, (rA: IRecentActivity) => {
                    if (rA && rA.recentActivityID) {
                        const rAII: any = {}; // recentActivityIndexItem
                        rAII.recentActivityID = rA.recentActivityID;
                        rAII.type = recentActivityTypes[rA.recentActivityTypeID].recentActivityTypeName;

                        rAII.ticketNumber = rA.ticketNumber;
        
                        // if (rA.currentTicketID && currentTickets[rA.currentTicketID]) {
                        //     rAII.ticketNumber = currentTickets[rA.currentTicketID].ticketNumber;
                        // }

						const user = propertyUsers[rA.userID];
						if (user) {
							rAII.userFirstName = user.userFirstName;
							rAII.userLastName = user.userLastName;
						}

                        rA.message = rA.message || me.lss.getRaMessage(rA, recentActivityTypes, propertyUsers, currentTickets);

                        me.recentActivityIndex.addDoc(rAII);
                    }
                });

                cb();
            });
};
