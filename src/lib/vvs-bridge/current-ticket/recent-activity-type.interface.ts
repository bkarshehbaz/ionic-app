export interface IRecentActivityType {
    recentActivityTypeID: number;
    recentActivityTypeName: string;
    color: string;
    recentActivityMessage: string;
    isActive: number;
    createDate: string;
    modDate: string;

    status?: boolean;

    recentActivityTypeNameWithCount?: string; // custom added sep 4, 2019

}
