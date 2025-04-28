// import {
// 	CardIO,
// 	CardIOOptions,
// 	CardIOResponse,
// } from "@ionic-native/card-io/ngx";
// import { Logger } from "../vvs-controller/util/logger";

// const logger = Logger.get("card-io.service");

// export class CardIOService {
// 	constructor(private cardIO: CardIO) {}

// 	/**
// 	 * @member requireExpiry?: boolean; --> Set to true to require expiry date
// 	 * @member requireCVV?: boolean; --> 	The user will be prompted for the card CVV \n
// 	 * @member requirePostalCode?: boolean; --> The user will be prompted for the card billing postal code.
// 	 * @member supressManual?: boolean; --> 	Removes the keyboard button from the scan screen.
// 	 * @member restrictPostalCodeToNumericOnly?: boolean; --> The postal code will only collect numeric input. Set this if you know the expected country's postal code has only numeric postal codes.
// 	 * @member keepApplicationTheme?: boolean; --> The theme for the card.io Activity's will be set to the theme of the application.
// 	 * @member requireCardholderName?: boolean; --> The user will be prompted for the cardholder name
// 	 * @member scanInstructions?: string; --> Used to display instructions to the user while they are scanning their card.
// 	 * @member noCamera?: boolean; --> 	If set, the card will not be scanned with the camera.
// 	 * @member scanExpiry?: boolean; --> If scanExpiry is true, an attempt to extract the expiry from the card image will be made.
// 	 * @member languageOrLocale?: string; --> The preferred language for all strings appearing in the user interface. If not set, or if set to null, defaults to the device's current language setting.
// 	 * @member guideColor?: string; --> Changes the color of the guide overlay on the camera. The color is provided in hexadecimal format (e.g. `#FFFFFF`)
// 	 * @member supressConfirmation?: boolean; --> The user will not be prompted to confirm their card number after processing.
// 	 * @member hideCardIOLogo?: boolean; --> The card.io logo will not be shown overlaid on the camera.
// 	 * @member useCardIOLogo?: boolean; --> The card.io logo will be shown instead of the PayPal logo.
// 	 * @member supressScan?: boolean; --> Once a card image has been captured but before it has been processed, this value will determine whether to continue processing as usual.
// 	 */
// 	scanCard(): Promise<CardIOResponse> {
// 		return this.cardIO
// 			.canScan()
// 			.then((res: boolean) => {
// 				if (res) {
// 					// let options = {
// 					//   requireExpiry: true,
// 					//   requireCCV: false,
// 					//   requirePostalCode: false
// 					// };
// 					const options: CardIOOptions = {};
// 					options.hideCardIOLogo = true;
// 					options.useCardIOLogo = false;
// 					options.scanExpiry = true;
// 					options.keepApplicationTheme = true;
// 					options.requireCVV = true;
// 					options.requireCardholderName = true;
// 					options.requireExpiry = true;
// 					//   options.requirePostalCode = false;
// 					options.restrictPostalCodeToNumericOnly = true;
					
// 					return this.cardIO.scan(options);
// 				} else {
// 					// handle
// 					return undefined as any;
// 				}
// 			})
// 			.catch(logger.e);
// 	}
// }
