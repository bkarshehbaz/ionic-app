import * as elasticlunr from 'elasticlunr';
import * as cf from "../../../constants/constant-fields";

// tslint:disable:no-invalid-this
export const _getModelIndex = () =>
    elasticlunr(function () {
        this.setRef(cf.modelID);
        this.addField(cf.modelName);
    });
// tslint:enable:no-invalid-this
