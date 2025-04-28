import { forEach } from 'lodash';
import { IModel } from '../../../lib/vvs-bridge';
import { checkValue } from '../../../util/index';
import { SearchService } from '../search-service';

export const _initModelIndex = (me: SearchService, modelObject) => {
    return new Promise( (resolve) => {
        forEach(modelObject, (model: IModel, key: number) => {
            if (checkValue(model)) {
                me.modelIndex.addDoc({modelID: model.modelID, modelName: model.modelName});
            }
        });

        resolve();
    });
};
