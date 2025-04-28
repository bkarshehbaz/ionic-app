import * as elasticlunr from 'elasticlunr';
import * as cf from "../../../constants/constant-fields";

// tslint:disable:no-invalid-this
export const _getChatIndex = () =>
    elasticlunr(function() {
		this.setRef(cf.chatID);
		[cf.msgContent, cf.userFirstName, cf.userLastName]
		.map( x => this.addField(x) );
    });
// tslint:enable:no-invalid-this
