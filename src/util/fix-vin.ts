import { toString } from "lodash";

export const fixBarCode = (barcode: string): string => {
	barcode = toString(barcode);
	if (barcode && barcode.length > 17) {
		barcode = barcode.substr( (barcode.length - 17), barcode.length );
	}
	return barcode;
};
