import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: "momentFormat"
})
export class MomentFormatPipe implements PipeTransform {

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(createDate: any, format: "fromNow"): string {

		if (format == "fromNow") {
			return moment(createDate).fromNow();
		}

		const tmp = moment(createDate).calendar();
		return tmp;
	}

}
