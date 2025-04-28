import { Pipe, PipeTransform } from '@angular/core';
import { toString } from "lodash";
import { Memoize } from 'lodash-decorators';
/**
 * Generated class for the DecodeStringPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: "decodeString",
})
export class DecodeStringPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
	@Memoize()
    transform(value: string, ...args: string[]) {
		const data = decodeURI(toString(value));
		return data == "undefined" || data == "null" ? "" : data;
    }
}
