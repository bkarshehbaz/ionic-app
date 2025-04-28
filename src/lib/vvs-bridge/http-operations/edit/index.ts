import { ICar, ICurrentTicket, ICustomer } from '../../current-ticket/index';
import { ICarPhoto } from '../../ionic/car-photo.interface';
import { ICarStepModel } from '../../ionic/car-step-model.interface';
import { ICustomerStepModel } from '../../ionic/customer-step-model.interface';
import { INote } from '../../ionic/misc.interfaces';
import { IPark } from '..';
import { IPushPay } from '../../../../util/get-push-pay';

export type EditWithChanges = ICarStepModel|ICustomerStepModel| {notes: INote[], carPhotos: ICarPhoto[]};

export interface IEditParkLocation {
	ticketNumber?: string;
	currentTicketID: number;
	ParkLocation: IPark;
}

export interface IEditCar {
	ticketNumber?: string;
	currentTicketID: number;
	Car: ICar;
    pushPay?: IPushPay;
}
export interface IEditCustomer {
	ticketNumber?: string;
	currentTicketID: number;
	CurrentTicket: ICurrentTicket;
	Customer: ICustomer;
	pushPay?: IPushPay;
}

export type IEditWithChanges = ICarStepModel|ICustomerStepModel|{notes: INote, carPhotos: ICarPhoto[]};
