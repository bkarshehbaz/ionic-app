import { IParkLocation } from "./park-location.interface";
import { IImage } from "../ionic/image.interface";

/*
    Ticket Sequence Interfaces
*/
export interface ITicketSequence {
    ticketSequenceID: number;
    currentTicketID: number;
    parkLocationID: number;
    checkInUserID: number;
    checkInInit: string;
    checkInTimeStamp: string;
    parkUserID: number;
    parkInit: string;
    parkTimeStamp: string;
    checkOutUserID: number;
    checkOutInit: string;
    checkOutTimeStamp: string;
    pullUserID: number;
    pullInit: string;
    pullTimeStamp: string;
    images: IImage[]|string;// string|any;
    notes: string|any;
    pullRequestTime: string;
    createDate: string;
    modDate: string;

    ParkLocation: IParkLocation;
}
