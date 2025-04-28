import { IFullTicket } from "./process-full-ticket";
import { VVSApp } from "../providers/vvs-controller/vvs-controller";
import { ICar } from "../lib/vvs-bridge";

export interface IPushPay {
    manual: number;
    ticketType: string;
    vehicle: string;
}

export const getPushPay = (vvsApp: VVSApp, ticket: IFullTicket): IPushPay => {

    const car = ticket.Car || {} as ICar;
    return {
        manual: car.manual,
        ticketType: ticket.TicketType.ticketTypeName,
        vehicle: car ? vvsApp.lss.getVehicle(car.makeID, car.modelID) : ""
    };

};
