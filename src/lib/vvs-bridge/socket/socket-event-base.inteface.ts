import { IMySQLOperation } from '../mysql-sp/operations.type';

export interface ISocketEventBase {
    propertyID: number;
    userID: number;
    currentTicketID: number;
    operation?: IMySQLOperation;
    error?: "ok" | "bad" | "noresults";
    // error?: StatusType;
}
