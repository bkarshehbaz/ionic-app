import * as elasticlunr from 'elasticlunr';
import * as cf from "../../../constants/constant-fields";

// tslint:disable:no-invalid-this
export const _getMakeIndex = () =>
    elasticlunr(function () {
        this.setRef(cf.makeID);
        this.addField(cf.makeName);
    });
// tslint:enable:no-invalid-this
