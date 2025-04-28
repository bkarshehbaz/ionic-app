import * as elasticlunr from 'elasticlunr';
import * as cf from "../../../constants/constant-fields";

const ticketRefs = [
	cf.currentTicketID,
	cf.ticketNumber,

	cf.colorName,
	cf.makeName,
	cf.modelName,
	cf.carYear,

	cf.customerFirstName,
	cf.customerMiddleName,
	cf.customerLastName,
	cf.ticketTypeName,
	cf.eventName,
	// cf.companyArrivalName,
	// cf.eventPartyName,
	cf.customerPhone,
];
// tslint:disable:no-invalid-this
export const _getTicketIndex = () =>
    elasticlunr(function () {
        this.setRef(cf.currentTicketID);
		ticketRefs.map( x => this.addField(x) );
    });
// tslint:enable:no-invalid-this
