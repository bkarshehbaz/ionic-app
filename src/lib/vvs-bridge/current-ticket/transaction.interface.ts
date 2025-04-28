import { ICarPhoto } from "../ionic";

export interface IPayment {
    paymentID: number;
    propertyID: number;
    paymentTypeID: number;
    userID: number;
    // balance: number;
    complete: number;
    paymentTimeStamp: any;
    createDate: any;
    modDate: any;
    images: ICarPhoto[];
}

export interface IPaymentType {
    paymentTypeID: number;
    paymentTypeName: string;
    isActive: number;
    createDate: any;

    overnight: 0|1;

    paymentTypeShortName: "COMP"|"VALIDATION"|"CARD";
}

// /*
//     Transaction Interfaces
// */
// export interface ITransaction {
//     transactionID: number;
//     transactionTypeID: number;
//     currentTicketID: number;
//     transactionAmount: number;
//     cardID: number;
//     transactionComplete: number;
//     payUserID: number;
//     payInit: string;
//     payTimeStamp: string;
//     images: string;
//     notes: string;
//     createDate: string;
//     modDate: string;
// }
