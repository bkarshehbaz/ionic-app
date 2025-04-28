
// import { CarStepModel } from '../../models/car-step-model';
// import { CustomerStepModel } from '../../models/customer-step-model';
// import { CarPhoto } from '../../models/car-photo';
// import * as Home_Segments from '../../enums/home-segments.enum';

// export interface IEditing {
//     editing: boolean;
//     option: string;
//     title: string;
// }

// export interface LicenseRawJSON {
// 		State: string;
// 		Fields: LicenseFieldItem[];
// }
// export interface LicenseFieldItem {
// 		Value: string;
// 		ID: string;
// 		Type: string;
// }

// export interface CodeMessage {
// 		code: number;
// 		success: boolean;
// 		message: string;
// }

// export interface LoginSuccess extends CodeMessage {
// 		user	 	  : User;
// 		properties: Property[];
// }

// export interface User {
// 	userID							: number;
// 	areaManID						: number;
// 	accountTypeID				: number;
// 	username						: string;
// 	userFirstName				: string;
// 	userLastName				: string;
// 	userEmail						: string;
// 	userPhone						: string;
// 	isActive						: number;
// 	payPrivilege				: number;
// 	manual							: number;

// 	currentPropertyID   : number;

// 	createDate					: string; // 2017-03-31T08:25:32.000Z,
// 	modDate							: string; // 2017-03-31T08:25:32.000Z


// 	Authorization				: string;
// 	CurrentProperty		 ?: Property;

// 	password					 ?: string;
// }

// export interface NewTicket {
// 	 CurrentTicket : CurrentTicket[];
// 			Car : Car[];
// 		Customer : Customer[];
//   TicketSequence : TicketSequence[];
// 	  ParkLocation : ParkLocation[];
// 	   Transaction : Transaction[];
// }

// export interface AllData {
// 	 CurrentTicket : CurrentTicket[];
// 	 			Customer : Customer[];
// 						 Car : Car[];
// 					 Color : Color[];
// 			TicketType : TicketType[];
// 	TicketSequence : TicketSequence[];
// 		ParkLocation : ParkLocation[];
// 			 NewTicket : NewTicket[];
// 		  EventParty : NewTicket[];
// 		 Transaction : Transaction[];
// }

// /* HttpService */
// /**
//  * @description userID, propertyID, Authorization, clientSecret
//  */
// export interface ImportantHeaders {
//     userID							: number;
//     propertyID					: number;
// 	Authorization				: string;
// 	clientSecret				: string;
// }
// // tslint:disable-next-line:no-empty-interface
// export interface SCheckIn {

// }
// /* HttpService closes */


// // export interface Item {
// //     id									: number;
// //     name								: string;
// // }

// export interface SearchObject {
//     ref									: string;
//     score								: number;
// }

// // export interface ItemWithType {
// //     id									: number;
// //     name								: string;
// // 		type								: string;
// // }

// export interface SelectPopoperItem {
// 		name: string;
// 		id: number;
// 		data?: ;
// 		icon?: ;
// }

// export interface StepClass {
//     customer						: string;
//     car									: string;
//     carnotes						: string;
// }
// export interface Step {
//     name								: string;
//     prevStatus					: boolean;
//     nextTitle						: string;
// 		index								: number;
//     $class 							: StepClass;
// }


// export interface ObservableData {
// 		category: string;
// 		data		: ;
// }

// export interface CommonMake {
// 		makeID: number;
// 		makeName: string;
// 		makePercent: number;
// }

// export interface CommonModel {
// 		modelID: number;
// 		modelName: string;
// 		modelPercent: number;
// 		makeID: number;
// }


// export interface Note {
// 		data: string;
// 		userID: number;
// 		timestamp: string;
// 		fullName?: string;
// }

// export interface Image {
// 		uid: string;
// 		index: number;
// }

// export interface TaskBase {
// 		operation?: string;
// 		currentTicketID: number;
// 		userID: number;
// }
// export interface Park extends TaskBase {
// 		parkAreaID: number;
// 		parkLocationName: string;
// 		latitude: string;
// 		longitude: string;
// 		// images?:Image[];
// 		// notes?:Note[];
// }

// // tslint:disable-next-line:no-empty-interface
// export interface Pull extends TaskBase {

// }
// export interface CheckOut extends TaskBase {
// 		isDeparting: number;
// 		roomNumber: string;
// }

// export interface Pay extends TaskBase {
// 		transactionType: string;
// 		transactionAmount: number;
// }

// //  export interface IndexCar {
// //  		carID								: number;
// //  		makeName						: string;
// //  		modelName						: string;
// //  		carYear							: string;
// //  		colorName						: string;
// //  }
// //
// //  export interface IndexCustomer {
// //  		customerID					: number;
// //  		customerFirstName		: string;
// //  		customerMiddleName	: string;
// //  		customerLastName		: string;
// //  		companyArrivalName	: string;
// //  		eventPartyName			: string;
// //  		customerPhone				: string;
// //  }

// //  export interface CarPhoto {
// //      data: string;
// //      title: string;
// //      index: number;
// //      added:boolean;
// //  }









// // export interface NewTicket {
// // 	 CurrentTicket : CurrentTicket[];
// // 		  			 Car : Car[];
// // 	 		  Customer : Customer[];
// //   TicketSequence : TicketSequence[];
// // 	  ParkLocation : ParkLocation[];
// // 		 Transaction : Transaction[];
// //   RecentActivity : RecentActivity[];
// // }

// // export interface AllData {
// // 	 CurrentTicket : CurrentTicket[];
// // 	 			Customer : Customer[];
// // 						 Car : Car[];
// // 					 Color : Color[];
// // 			TicketType : TicketType[];
// // 	TicketSequence : TicketSequence[];
// // 		ParkLocation : ParkLocation[];
// // 			 NewTicket : NewTicket[];
// // 		  EventParty : NewTicket[];
// // 		 Transaction : Transaction[];
// // 	 RecentActivity: RecentActivity[];
// // }

// export interface CurrentTicketQueue {
// 		ticketCombined: ;
// 		photosToS3: ;
// }





// export interface CurrentStep {
// 		formstep: Step;
// 		timestamp: number;
// }

// // tslint:disable-next-line:no-empty-interface
// export interface MultiFormNotify {

// }


// import { ComponentRef } from "@angular/core";
// import { TicketItemOptions } from "../../pages/home/ticket-item-options/ticket-item-options";












// //  export interface IndexCar {
// //  		carID								: number;
// //  		makeName						: string;
// //  		modelName						: string;
// //  		carYear							: string;
// //  		colorName						: string;
// //  }
// //
// //  export interface IndexCustomer {
// //  		customerID					: number;
// //  		customerFirstName		: string;
// //  		customerMiddleName	: string;
// //  		customerLastName		: string;
// //  		companyArrivalName	: string;
// //  		eventPartyName			: string;
// //  		customerPhone				: string;
// //  }

// //  export interface CarPhoto {
// //      data: string;
// //      title: string;
// //      index: number;
// //      added:boolean;
// //  }
