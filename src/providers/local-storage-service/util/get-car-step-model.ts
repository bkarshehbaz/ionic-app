import { toString } from "lodash";
import * as cf from "../../../constants/constant-fields";
import { ICarStepModel, NumericMap, IColor } from '../../../lib/vvs-bridge';
import { IFullTicket } from '../../../util/process-full-ticket';
import { VVSApp } from '../../vvs-controller/vvs-controller';
import { to } from "../../../util/to";

export const getCarStepModel = async(v: IFullTicket, vvsApp: VVSApp): Promise<ICarStepModel> => {
    const cS: ICarStepModel = {} as ICarStepModel;
    cS.currentTicketID = v.currentTicketID;

    if (v.Car && v.Car.makeID) {

        cS.licensePlate = v.Car.licensePlate;
        cS.vinNumber = v.Car.vinNumber;
        cS.manual = v.Car.manual;

        const make = vvsApp.lss.getMake(v.Car.makeID);
        cS.makeID = v.Car.makeID;
        cS.makeName = make.makeName;

        const model = vvsApp.lss.getModel(v.Car.modelID);
        cS.modelID = v.Car.modelID;
        cS.modelName = model.modelName;

        // cS.apiMakeID = v.make.apiMakeID;
        // cS.apiModelID = v.car.apiModelID;
        cS.carYear = toString(v.Car.carYear);

        const [colors] = await to<NumericMap<IColor>>(vvsApp.lss.getColorData());

        if (colors && colors[v.Car.colorID]) {
            cS.colorName = colors[v.Car.colorID].colorName;
        }

        cS.colorID = v.Car.colorID;

        cS.status = cf.editing;
        
        return cS;

    }

    cS.status = cf.adding;

    return cS;
};
