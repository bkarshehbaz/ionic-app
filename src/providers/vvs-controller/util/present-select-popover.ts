import { forEach } from 'lodash';
// import * as Comp from '../../../constants/component-names';
import * as FO from '../../../enums/filter-option.enum';
import { ISelectPopoperItem } from '../../../lib/vvs-bridge';
import { VVSApp } from '../vvs-controller';
import { Empty_Popover_Item, selectPopoperItems } from './../../../constants/constants';
import { IRecentActivityItemClick } from './../../../pages/logs-page/recent-activity-item/recent-activity-item.options';
import { Logger } from './logger';
import { pages } from '../../../pages';
import { Taptic } from '../../haptic-service';

const logger = Logger.get("_presentSelectPopover");

export function _presentSelectPopover(
	navCtrl: { push: (what: string, body: object) => Promise<object> },
	me: VVSApp,
	{ ev, rAI}: IRecentActivityItemClick,
	cb: (v: number) => void = (v: number) => {},
	title = "",
	allOptions: boolean = false,
	from: "search"
) {

	Taptic.light();

    logger.i("I'm here at line 18 at _presentSelectPopover");
    if (!ev || !rAI) {
        logger.error("presentSelectPopover@vvsApp@757 undefined"); return;
    }
    // if (!$ev) { this.e("presentSelectPopover@vvsApp@757 undefined"); return; }
    // const { ev, rAI } = $ev;

    const items: ISelectPopoperItem[] = [];
    forEach(selectPopoperItems, (selectPopoverItem: ISelectPopoperItem) => {
        if (allOptions === false) {
            selectPopoverItem.id === FO.OPEN_TICKET
            && rAI.currentTicketID
            && items.push(selectPopoverItem);

        } else {
            switch (selectPopoverItem.id) {
                case FO.OPEN_TICKET:
                    rAI.currentTicketID && items.push(selectPopoverItem);
                    break;

                case FO.FILTER_BY_TICKET_NUMBER:
                    rAI.currentTicketID && items.push(selectPopoverItem);
                    break;

                case FO.FILTER_BY_USER:
                    rAI.userID && items.push(selectPopoverItem);
                    break;
            }
        }

    });

    const callback = (_data: ISelectPopoperItem) => {

        switch (_data.id) {
			case FO.OPEN_TICKET:
                // throw new Error("Not Implemented!");
                me.lss
                .getCurrentTicketByID(rAI.currentTicketID, _presentSelectPopover.name)
                .then( ticket => navCtrl.push(pages.ticketdetails, { ticket, from }) )
                .catch((error) => {
                    logger.error(error);
                    me.presentSingleAlert(error.message);
                });
                // me.lss
                //     .getFullCurrentTicketByTicketID(rAI.currentTicketID, (ticket) => {
                //         // me.pushPage(pages.ticketdetails, {ticket});
                //         navCtrl.push(pages.ticketdetails, {ticket});
                //     });
                break;

            case FO.FILTER_BY_TICKET_NUMBER:
            case FO.FILTER_BY_USER:
                cb(_data.id);
                break;

        }

	};

	items.length === 0 && items.push(Empty_Popover_Item);

    me.presentPopover(pages.SelectPopover,
                    {
                        items,
                        title,
                        callback
                    },
                    ev,
                    {cssClass: "log-page-options"});

}
