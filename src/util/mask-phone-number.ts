import * as masker from 'vanilla-masker';

export const maskPhoneNumber = (phoneNumber: string) =>
	masker.toPattern(phoneNumber, "(999) 999-9999");
