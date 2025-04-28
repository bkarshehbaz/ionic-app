import { filter, values } from "lodash";
import { StringMap } from '../lib/vvs-bridge';
// tslint:disable-next-line:ordered-imports
import { valid } from '../constants/constants';

export const isAllValid = (data: StringMap<string>) => {
    const arr = values(data);
    return filter(arr, val => val === valid).length === arr.length;
};
