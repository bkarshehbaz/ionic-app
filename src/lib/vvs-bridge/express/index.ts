// import * as express from "express";

export interface IRequest {
    params?: {
        propertyID?: string;
    };
    body?: {
        userID?: number;
        propertyID?: number;
        Authorization?: string;
        authorization?: string;
        ticket?: any;
        currentTicketID?: number;
        isDeparting?: 0 | 1;
        ticketNumber?: string|number;

        parkAreaID?: number;
        parkLocationName?: string;
        latitude?: string;
        longitude?: string;

        transactionAmount?: number;

        // photos?: Array<{ uid: string, data: string }>;
        // photosToS3?: Array<{ uid: string, data: string }>;

        roomNumber?: string;
    };
}
