/*
    Ticket Type Interfaces
*/
export interface ITicketType {
    ticketTypeID: number;
    ticketTypeName: string;
    ticketPrice: number;
    isActive: number;
    isHotel: number;
    qrKey: number;
    createDate: string;
    modDate: string;
    enablePayment?: number;
}
