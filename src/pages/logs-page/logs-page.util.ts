import { forEach, includes, isNil, toString } from 'lodash';
import { IRecentActivityType, NumericMap } from '../../lib/vvs-bridge';

export function _getVisible(isVisible, inactives: number[], value, toggleValue) {
    return !isNil(isVisible) ? isVisible
         : !isNil(inactives) ? !includes(inactives, value)
         : value == toggleValue;
}

export function getInactiveKeys(rATO: NumericMap<IRecentActivityType>): number[] {
    const inactiveKeys: number[] = [];

    forEach(rATO, (rAT: IRecentActivityType) => {
        rAT.status === false
        && isNil((rAT as any).type)
        && inactiveKeys.push(rAT.recentActivityTypeID);
    });

    return inactiveKeys;
}
