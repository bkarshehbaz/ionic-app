import { sample, values } from "lodash";
import { colorIndexes } from "./color-indexes";

export class CarProvider {
    
    getTransmissionStyle() {

    }
    getYear() {

    }
    getVehicleName() {

    }
    getColor() {
        return sample(values(colorIndexes));
    }

}
