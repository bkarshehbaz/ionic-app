import { filter } from 'lodash';
import { valid } from '../constants/constants';

export function isValid(...args: string[]) {
    return filter(args, val => val === valid).length === args.length;
}
