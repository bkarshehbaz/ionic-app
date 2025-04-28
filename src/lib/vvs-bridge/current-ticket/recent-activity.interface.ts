/*
    Recent Activity Interfaces
*/
export interface IRecentActivity {
    recentActivityID: number;
    recentActivityTypeID: number;
    activityTypeID: number;
    userID: number;
    currentTicketID: number;
    activityTimeStamp: string;

    ticketNumber?: string;

    //
    message?: string;
    activityTimeStampFmt?: string;

    //
    color?: string;
}
