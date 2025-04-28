import { forEach, isEmpty, isNil } from "lodash";

// tslint:disable-next-line:array-type
export function checkValue(...$values: Array<{}>): boolean {

    let r = true;
    forEach($values, (v) => {

        // isNil checks if value is 'null' or 'undefineds'
        if (isNil(v)) { // || isEmpty(v)) {
            r = false;

            // NOTE: return false means break;
            return false;
        }
    });
    return r;
    // return $values.filter(val => isNil(val)).length === 0;
    // let isN = find($values, v => isNil(v));
    // logger.l("isN", isN);
    // return !isNil(isN);
}
