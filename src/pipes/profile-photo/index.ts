
import { Pipe, PipeTransform } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { IFullTicket } from '../../util';
import { IImage } from '../../lib/vvs-bridge';

@Pipe({
  name: 'profilePhoto',
})
export class ProfilePhotoPipe implements PipeTransform {

	constructor(private vvsApp: VVSApp) {

	}
	/**
	 * Takes a value and makes it lowercase.
	 */
	transform(value: IFullTicket, ...args) {
		if (!value || !value.currentTicketID || !value.TicketSequence) {
			return null;
		}
		return this.vvsApp.getProfilePhoto(value.currentTicketID, value.TicketSequence.images as IImage[]);
	}

}
