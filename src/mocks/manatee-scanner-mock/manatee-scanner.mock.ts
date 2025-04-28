// import { includes, keys, map, random, sample, toString, values, filter } from "lodash";
// import * as moment from 'moment';
// import { ILicenseFieldItem, ILicenseRawJSON, ICurrentTicket, NumericMap } from "../../lib/vvs-bridge";
// import * as importChance from "chance";

// // NOTE further improvements, we can go ahead and read 2016 Card Design Standard (3).pdf
// // SEE: page 62 from 2016CDS
// const licenseCodes: any = {
//     DAC:					"DAC",
//     DAD:					"DAD",
//     DAB:					"DAB",
//     DCS:          			"DCS",
//     DAQ:					"DAQ",
//     DBB:					"DBB",
//     DBC:					"DBC",
//     DAY:					"DAY",
//     DAZ:					"DAZ",
//     DAV:					"DAV",
//     DAL:					"DAL",
//     DAN:					"DAN",
//     // State:				"state",
//     DAP:					"DAP"
// };

// const colorsFromDTwenty = {
//     "AME": "Amethyst/Purple",
//     "DGR": "Dark Green",
//     "PLE": "Purple",
//     "BGE": "Beige",
//     "GLD": "Gold",
//     "PNK": "Pink",
//     "BLK": "Black",
//     "GRN": "Green",
//     "RED": "Red",
//     "BLU": "Blue",
//     "GRY": "Gray",
//     "SIL": "Silver/Aluminum",
//     "BRO": "Brown",
//     "LAV": "Lavender",
//     "TAN": "Tan",
//     "BRZ": "Bronze",
//     "LBL": "Light Blue",
//     "TEA": "Teal",
//     "CAM": "Camouflage",
//     "LGR": "Light Green",
//     "TPE": "Taupe/Brown",
//     "COM": "Chrome/Stainless Steel",
//     "MAR": "Maroon/Burgundy",
//     "TRQ": "Turquoise",
//     "CRP": "Copper",
//     "MUL": "Multi-colored",
//     "WHI": "White",
//     "CRM": "Cream",
//     "MVE": "Mauve",
//     "YEL": "Yellow",
//     "DBL": "Dark Blue",
//     "ONG": "Orange"
// };

// import { Logger } from "../../providers/vvs-controller/util/logger";
// import { LocalStorageService } from '../../providers/local-storage-service/local-storage-service';
// import { ManateeResponse, ManateeCode, scannedLicense, scannedTicket, scannedVIN, cleanManateeResponse } from "../../providers/manatee-scanner/manatee-scanner";
// import { CODE39, QR, PDF417 } from "../../constants/constant-fields";
// import { RollbarService } from "../../services/rollbar";
// // import { tagPlatePhoto } from './tag.mock';
// const logger = Logger.get("ManateeScannerMock");


// export class ManateeScannerMock {

// 	static lastClickedElementID: string;

// 	// startScanning() {
// 	// 	return this.scanner.startScanning()
// 	// 	.then(cleanManateeResponse)
// 	// }

//     scanner = {
//         startScanning: () => {
// 			console.log("startScanning", "scanner");
//             return new Promise( (resolve, reject) => {

//                 const bodyStyle = document.querySelector("body").style;
//                 bodyStyle.width = '0';
//                 bodyStyle.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png)";
//                 bodyStyle.backgroundSize = "375px 667px";


//                 bodyStyle.width = '100%';
//                 // bodyStyle.backgroundImage = "";
//                 setTimeout( () => {
//                     // logger.debug('includes(document.URL, "check-in")',includes(document.URL, "check-in"));
//                     // tslint:disable-next-line:no-console
// 					console.log( { lastClickedElementID: ManateeScannerMock.lastClickedElementID });

// 					let tmp = document.querySelector("body > ion-app > ion-modal > div > edit-component > ion-header > ion-navbar > div.toolbar-content.toolbar-content-ios > ion-title > div") as any;

// 					if (tmp) {
// 						tmp = (tmp.textContent || "").trim();
// 					}
//                     if (includes(document.URL, "check-in") || includes(document.URL, "tabs/keybox/home") || tmp == "Edit Car") {
// 						console.log("document.URL", document.URL);
//                         // logger.debug("this.lastClickedElementID",this.lastClickedElementID);
//                         if (ManateeScannerMock.lastClickedElementID) {
//                             switch (ManateeScannerMock.lastClickedElementID) {
//                                 case "scan-ticket":
//                                     resolve({type: QR, code: random(10000, 29999)});
//                                     break;

//                                 case "scan-id":
//                                     this.generateLicenseData(resolve);
//                                     break;

// 								case "scan-vin":
// 									// resolve({type: CODE39, code: "IJDB" });
// 									// resolve({type: CODE39, code: "JTDBT4K34CL011780" });
// 									// resolve({type: CODE39, code: "js3td62v1y4107898" });
// 									this.doAjax(resolve, CODE39);

// 									// Rolls Royce with no model (usecase)
// 									// resolve({ type:  CODE39, code: "SCA664S5XAUX48670" })
// 									break;

//                                 case "tab-t1-2":
//                                 case "tab-t0-2":
//                                 case "tab-t2-2":
//                                     this.existingORrandomCode(resolve);
//                                     break;
//                             }
//                         }
//                     } else {
//                         this.existingORrandomCode(resolve);
//                     }
//                 }, 1500);

// 			})
//         },
//         closeScanner: () => {
//             // logger.debug("closeScanner");
//         },
//         getConstants: () => {
//             return {};
//         },
//         setKey: () => Promise.resolve(),
//         loading: (setting) => Promise.resolve(),
//         setCallback: (result: any) => {},
//         loadSettings: () => new Promise(() => {})
//     } as any;


// 	mwInit: boolean;

//     constructor() {
//         // super(platform);
//         this.addEventListeners();
// 	}

// 	init() {

// 	}
// 	initManatee() {

// 	}

// 	config(setFunc: any) {

// 	}

//     addEventListeners() {
//         try {
//             // tslint:disable-next-line:no-this-assignment
//             const me = this;
//             document.querySelector("body")
//                     .addEventListener('click', function(e: any) {
// 						// logger.debug();
//                         const el = e.srcElement.offsetParent;
//                         ManateeScannerMock.lastClickedElementID = el && el.id ? el.id : undefined;
//                     });


//         } catch (err) {
//             this.addEventListeners();
//             // logger.debug(err);
//         }

//     }


//     existingORrandomCode(resolve: any) {
// 		// logger.debug();
//         const randomCodeIndex: number = random(0, 2);
//         const halfChance: number = random(0, 1);

//         // resolve({type: "QR", code: toString(random(10000, 29999)) });
//         //
//         // return;
// 		//
// 		const lss = LocalStorageService.get(null);

//         logger.info("existingORrandomCode", randomCodeIndex);
//         switch(randomCodeIndex) {
//             case 0:
//                 const currentTickets = lss.getRawValue("CurrentTicket");
                
// 				// .then( ( currentTickets) => {
// 					// logger.debug(map( currentTickets, "ticketNumber"));
//                 if (halfChance === 0) {
//                     resolve({type: QR, code: toString(random(10000,29999)) });
//                 } else {
//                     resolve({type: QR, code: sample(map( currentTickets, "ticketNumber"))});
//                 }
// 				// });
//             break;

//             case 1:
// 				const tickets = lss.getRawValue("CurrentTicket")
// 				// .then( ( tickets: NumericMap<ICurrentTicket>) => {
// 				// 	// logger.debug(map( tickets, ticket => ticket.Customer.customer ));

//                 if (halfChance === 0) {
//                     this.generateLicenseData(resolve);
//                 } else {
//                     const customer = sample(tickets).Customer;
//                     resolve({type: PDF417, code: {
//                         customerFirstName: customer.customerFirstName,
//                         customerLastName: customer.customerLastName,
//                     } });
//                 }
// 				// });
//             break;

// 			case 2:
// 				if (halfChance === 0) {
// 					// resolve({type: CODE39, code: null });
// 					this.doAjax(resolve, CODE39);
// 					return;
// 				}
// 				lss.vvsApp.storage.get("CurrentTicket")
// 				.then( ( tickets: NumericMap<ICurrentTicket>) => {

// 					const sampleTicket = sample(filter(tickets, x => x.Car && x.Car.makeID > 0));
// 					resolve({type: CODE39, code: sampleTicket.Car.vinNumber });

// 				});
//             break;
//         }

//     }

//     doAjax(resolve: any, type: any) {
//         const xttp = new XMLHttpRequest();
//         xttp.onreadystatechange = function() {
//             // logger.debug("this.readyState",this.readyState,"this.status",this.status);
//             if (this.readyState === 4 && this.status === 200) {
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(this.responseText, "text/html");
//                 const randomVinNumber: any = (doc.querySelector("input.input") as any).value;
//                 // logger.debug("randomVinNumber >> ", randomVinNumber);
//                 // logger.debug("vinDescription  >> ", doc.querySelector(".description").textContent);
//                 resolve({type, code: toString(randomVinNumber)});
//             }
//             // else{
//             //     resolve({type:type,code:'NA'});
//             // }

//         };
//         xttp.open("GET", "/vingenerator");
//         xttp.setRequestHeader("Access-Control-Allow-Origin", "*");
//         xttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
//         xttp.send();
//     }

//     public generateLicenseData(resolve: any) {
//         const chance = new importChance.Chance();
//         const licenseData = {} as ILicenseRawJSON;
//         licenseData.State = chance.state();
//         const fields: ILicenseFieldItem[] = [];
//         const familyORlastName = random(0, 1);
//         // logger.debug("familyORlastName",familyORlastName);

//         map(keys(licenseCodes), (key) => {

//             const gender = chance.gender();
//             const field: ILicenseFieldItem = {} as ILicenseFieldItem;
//             field.ID = key;
//             field.Type = "string";
//             switch (key) {
//                 case licenseCodes.DAC:
//                     field.Value = chance.first({gender} as any);
//                     break;

//                 case licenseCodes.DAD:
//                     field.Value = chance.last({gender} as any);
//                     break;

//                 case licenseCodes.DAB:
//                     field.Value = familyORlastName === 0 ? chance.last({gender} as any) : "NONE";
//                     break;

//                 case licenseCodes.DCS:
//                     field.Value = familyORlastName === 0 ? "NONE" : chance.last({gender} as any);
//                     break;

//                 case licenseCodes.DAQ:
//                     field.Value = toString(random(10000000, 99999999));
//                     break;

//                 case licenseCodes.DBB:
//                     field.Value = moment(chance.birthday()).format("YYYY-MM-DD");
//                     break;

//                 case licenseCodes.DBC:
//                     field.Value = chance.gender()[0];
//                     break;

//                 case licenseCodes.DAY:
//                     field.Value = random(0, 1) === 0 ? sample(keys(colorsFromDTwenty)) : sample(values(colorsFromDTwenty));
//                     break;

//                 case licenseCodes.DAZ:
//                     field.Value = random(0, 1) === 0 ? sample(keys(colorsFromDTwenty)) : sample(values(colorsFromDTwenty));
//                     break;

//                 case licenseCodes.DAV:
//                     field.Value = random(3, 8) + "-" + random(0, 11);
//                     break;

//                 case licenseCodes.DAL:
//                     field.Value = chance.address();
//                     break;

//                 case licenseCodes.DAN:
//                     field.Value = chance.city();
//                     break;

//                 case licenseCodes.DAP:
//                     field.Value = chance.zip();
//                     break;
//             }
//             fields.push(field);

//         });
//         licenseData.Fields = fields;
//         resolve({type: "PDF417", code: JSON.stringify(licenseData)});

//     }



// }





// // const licenseCodes: any = {
// //                               DAC:					"customerFirstName",
// //                               DAD:					"customerMiddleName",
// //                               DAB:					"customerLastName",
// //                               DCS:          "customerFamilyName",
// //                               DAQ:					"licenseNumber",
// //                               DBB:					"dob",
// //                               DBC:					"gender",
// //                               DAY:					"eyeColor",
// //                               DAZ:					"hairColor",
// //                               DAV:					"height",
// //                               DAL:					"streetAddress",
// //                               DAN:					"city",
// //                               // State:				"state",
// //                               DAP:					"zipcode"
// //                          };

