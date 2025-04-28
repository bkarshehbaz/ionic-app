// declare var mwbScanner: ManateeScannerApi;

// import { ILogger, Logger } from "../../providers/vvs-controller/util/logger";
// import { ManateeScannerApi } from "./manatee-api.interface";
// import { IManateeConstants } from "./manatee-constants.interface";
// import { isEmpty, includes, snakeCase, camelCase } from "lodash";
// import { ENV } from "../../environments";

// import { QR, PDF417, CODE39, AAMVA } from '../../constants/constant-fields';

// // import { toStringTrim } from './index';
// import { RollbarService } from "../../services/rollbar";
// import { toStringTrim } from "../../util/to-string-trim";

// const logger: ILogger = Logger.get("ManateeService");

// export interface ManateeResponse {
// 	type: string;
// 	code: any;
// }

// export const scannedLicense = (type) =>
// 	includes(toStringTrim(type), PDF417) || includes(toStringTrim(type), AAMVA);

// export const scannedTicket = (type) =>
// 	type === QR || includes(type, QR);

// export const scannedVIN = (type: string) =>
// 	camelCase(type) == "code39" || type === CODE39 || includes(type, CODE39) || snakeCase(type) == "code_39";


// export enum ManateeCode {
// 	qr = 0,
// 	license,
// 	vin,
// }

// export const cleanManateeResponse = (response = {} as ManateeResponse) => {

// 	logger.info("cleanManateeResponse", response);

// 	const { type, code } = response;

// 	let _type: ManateeCode;

// 	if (type == "Cancel") {
// 		logger.info("cancel scan");
// 		throw new Error("Scan Cancel");
// 	} else if (scannedLicense(type)) {
// 		_type = ManateeCode.license;
// 	} else if (scannedTicket(type)) {
// 		_type = ManateeCode.qr;
// 	} else if (scannedVIN(type)) {
// 		_type = ManateeCode.vin;
// 	} else {
// 		RollbarService.warn("Scanned unknown type: " + type);
// 	}

// 	return {
// 		type: _type,
// 		code
// 	}

// }

// // @Injectable()
// export class ManateeService {

// 	public static instance: ManateeService;
// 	public static get() {
// 		return ManateeService.instance || (ManateeService.instance = new ManateeService());
// 	}

// 	// startScanning() {
// 	// 	return this.scanner.startScanning()
// 	// 	.then(cleanManateeResponse);
// 	// }

// 	mwInit: boolean;
//     public scanner: ManateeScannerApi;

//     // constructor() {

//     // }

//     init() {
//         if (typeof mwbScanner !== 'undefined') {
//             this.scanner = mwbScanner;
//         } else {

// 			RollbarService.warn("Manatee is not available");

//             (this.scanner as any) = {
//                 setCallback: () => {},
//                 getConstants: () => new Object(),
//                 setKey : (key: string) => Promise.resolve(true),
//                 loadSettings: (settings) => Promise.resolve(true),
//                 startScanning: () => Promise.resolve(true)
//             };
// 		}
// 		this.initManatee();
//     }

//     config(setFunc: any) {
//         setFunc(true);
//         this.mwInit = true;
//     }

//     initManatee() {

//         this.config(
//             () => {
//                 try {
//                     this.scanner.setCallback((result: any) => {});

//                     const cc: IManateeConstants = this.scanner.getConstants();
//                     const setting = [
// 						{
// 							method: "MWBsetActiveCodes",
// 							value : [cc.MWB_CODE_MASK_QR | cc.MWB_CODE_MASK_PDF | cc.MWB_CODE_MASK_39]
// 						},
// 						{
// 							method: "MWBsetActiveParser",
// 							value : [cc.MWP_PARSER_MASK_AAMVA | cc.MWP_PARSER_MASK_AUTO]
// 						}
// 					];

// 					logger.assert(isEmpty(ENV.MANATEE_IOS_KEY), "MANATEE_IOS_KEY must not be empty");

//                      return this.scanner
// 					.setKey(ENV.MANATEE_IOS_KEY)
// 					.then( (response: boolean) => this.scanner.loadSettings(setting) )
// 					.then( () => {} )
// 					.catch( (error) => {
// 						RollbarService.error(error);
// 					});
//                 } catch ( reason ) {
// 					RollbarService.error(reason);
//                 }

//             }
//         );
//     }

// }
