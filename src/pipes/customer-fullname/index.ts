import { getCustomerFullName, fullnames } from './../../util/get-customer-full-name';
import { Pipe, PipeTransform } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { ICustomer } from '../../lib/vvs-bridge';

@Pipe({
    name: 'customerFullname'
})
export class CustomerFullnamePipe implements PipeTransform {

	constructor(private vvsApp: VVSApp) {}

    /**
     * @param object and it must contain a recentActivityID
     * @return array
     */
    transform(value: any, ...args: string[]): Promise<string> {

		if (fullnames[value]) {
			return Promise.resolve(fullnames[value]);
		}

		return this.vvsApp.lss.getCurrentTicketData()
		.then( (tickets) => {
			const user: ICustomer = !isNaN(value) ? (tickets ? tickets[value].Customer : undefined) : value;
	
			if (!user) {
				return "";
			}
	
			return getCustomerFullName(user);
			// return values(orderBy(value, [cf.recentActivityID], [cf.desc]));
		});
    }

}
