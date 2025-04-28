import { Pipe, PipeTransform } from '@angular/core';
import { startCase } from 'lodash';

@Pipe({
    name: 'startCase'
})
export class StartCasePipe implements PipeTransform {

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(str: string, ...args: string[]): string {
		return startCase(str);
	}

}
