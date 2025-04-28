import * as elasticlunr from 'elasticlunr';
import * as cf from "../../../constants/constant-fields";

// tslint:disable:no-invalid-this
export const _getRecentActivityIndex = () =>
    elasticlunr(function () {
		this.setRef(cf.recentActivityID);
		[
			cf.type,
			cf.ticketNumber,
			cf.userFirstName,
			cf.userLastName
		]
		.map( x => this.addField(x) );
    });
// tslint:enable:no-invalid-this
