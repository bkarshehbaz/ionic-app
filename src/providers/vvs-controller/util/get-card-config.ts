import { ICardNotesPhotosView } from './../../../components/card-notes-photos-map-view/card-notes-photos-map-view.options';
import { parseJSON } from './../../../util/parse-json';
import { IFullTicket } from './../../../util/process-full-ticket';
import { Logger } from '../../../providers/vvs-controller/util/logger';
import { checkValue } from './../../../util/index';
import { _getLocation } from './get-location';
import { VVSApp } from '../vvs-controller';
import { ITicketSequence, ICarPhoto } from '../../../lib/vvs-bridge';
import { getGMapUrl } from '../../../util/get-googlemap-url';
import { get } from 'lodash';

const logger = Logger.get(_getCardConfig.name);

export function _getCardConfig(fT: IFullTicket, vvsApp: VVSApp): ICardNotesPhotosView {
    const config: ICardNotesPhotosView = {
        currentTicketID: fT.currentTicketID
    };

	config.platform = vvsApp.platforms;

    config.propertyID = vvsApp.user.CurrentProperty.propertyID;

    config.notes = parseJSON((fT.TicketSequence || {} as ITicketSequence).notes) as any || [];
    logger.l({ notes: config.notes });

	config.recentActivityItems = fT.recentActivityItems;
    config.ticketNumber = fT.ticketNumber;

    const location = _getLocation((fT.TicketSequence || {} as ITicketSequence).ParkLocation);
    logger.w({ location });
    if (checkValue(location)) {

        config.location = location;

		config.mapUrl = getGMapUrl(location);

    } else {
        config.mapUrl = undefined;
    }

    config.images = parseJSON(fT.TicketSequence.images as any);

    config.isParked = fT.statusName == "IN" || fT.statusName == "PULL_REQUEST";
    
    config.ticket = fT;
    
    // fT.Payment = fT.Payment = {} as any;
    const uid = get(parseJSON<ICarPhoto>(fT.Payment.images as any), "[0].uid");
    // const uid = get(fT, "Payment.images[0].uid");
    if (uid) {
        config.voucherPhotoURL = `${vvsApp.propertyS3Path}/${fT.currentTicketID}/${uid}`;
    }

    return config;
}
