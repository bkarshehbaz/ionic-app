
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(date: string, format: string): string {
		return moment(date).format(format || "LT");
		// return startCase(str);
	}

}
