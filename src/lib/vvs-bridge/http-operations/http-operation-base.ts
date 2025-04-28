export interface IHttpOperationBase {
    operation?: string;
    currentTicketID: number;
    userID: number;

    pushPay?: {
        manual: number;
        ticketType: string;
        vehicle: string;
    };
}
