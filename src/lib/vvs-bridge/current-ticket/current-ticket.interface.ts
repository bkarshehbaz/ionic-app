import { ITicketSequence, ICar, ICustomer, ITicketType, IParkLocation, IPayment } from "./index";
import { Observable } from "rxjs";
import { IImage } from "../ionic/image.interface";
import { ICurrentTicketStatusType } from "./current-ticket-status-type";

/*
    Current Ticket Interfaces
*/
export interface ICurrentTicket extends ICurrentTicketStatusType {
    customerFullName: string;
    currentTicketID: number;
    confirmation_number: string;
    postingAccountID: string;
    ticketNumber: string;
    carID: number;
    ticketTypeID: number;
    customerID: number;
    roomNumber: string;

    eventID: number;

    staged: number;
    pullStaged: number;
    parkProgress: number;
    pullProgress: number;
    isIn: number;
    isDeparting: number;
    isDeparted: number;
    departedTimeStamp: string;
    currentTicketStatusID: number;
    checkOutDate: string;
    pullRequest: number;
    createDate: string;
    modDate: string;

    balance?: number;

    timerTimeStamp?: string;
    timer: Observable<string>;
    // parseImages: IImage[];

    SHOW_IN?: boolean[];
    TicketSequence?: ITicketSequence;
    // ParkLocation?: IParkLocation;
    Car?: ICar;
    Customer?: ICustomer;
    Payment?: IPayment;
    // Transaction?: ITransaction[];
    TicketType?: ITicketType;

    uuid?: string;
}
