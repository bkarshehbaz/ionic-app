import { checkValue } from "../../../util/index";
import { ICoordinates } from "../../../lib/vvs-bridge";

export function _getLocation({ latitude, longitude } = {} as ICoordinates) {
    return checkValue(latitude, longitude) ? `${latitude},${longitude}` : undefined;
}
