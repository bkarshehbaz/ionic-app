import { Dictionary, List, /* ListIteratee, PropertyPath, ValueKeyIteratee */ } from 'lodash';
// import { Observable as $Observable } from 'rxjs';
import { NumericMap } from '../../lib/vvs-bridge';

type PropertyPath = any;
type ValueKeyIteratee<T> = any;
type ListIteratee<T> = any;

// declare module 'rxjs/Observable' {
//     interface Observable<T> {
//         debug: (...any: []) => $Observable<T>;
//         socket: (...any: []) => $Observable<T>;
//     }
// }

type PartialObject<T> = Partial<T>;
// tslint:disable-next-line:no-namespace
declare namespace _ {
     interface LoDashStatic {
        omit<T>(
            object: Dictionary<T>,
            ...paths: PropertyPath[]
        ): Dictionary<T> | NumericMap<T>;

        /**
         * @see _.omit
         */
        omit<T extends object>(
            object: T | null | undefined | any,
            ...paths: PropertyPath[]
        ): PartialObject<T> | NumericMap<T>;

        omitBy<T extends object>(
            object: T | null | undefined | any,
            predicate: ValueKeyIteratee<T[keyof T]> | any
        ): PartialObject<T>;

        maxBy<T>(
            collection: List<T> | null | undefined | any,
            iteratee?: ListIteratee<T> | any
        ): T | undefined;

     }
}
