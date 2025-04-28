
import { toStringTrim } from "../../../../../util";
// import { AbstractControl } from "@angular/forms";

export const validatePhone = (cP = "") => /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(toStringTrim(cP));

// export class PhoneValidator {

// 	static validPhoneNumber(control: AbstractControl) {
// 		const phoneNumber = unmaskPhoneNumber(control.value);

// 		if (!validatePhone(phoneNumber)) {
// 			return { invalidPhoneNumber: "phone number is invalid" };
// 		}
// 		return null;
// 	}

// }
