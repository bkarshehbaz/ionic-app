/*
    Park Area & Location Interfaces
*/
export interface IParkArea {
    parkAreaID: number;
    propertyID: number;
    parkAreaName: string;
    isActive: number;
    isNumbered: number;
    createDate: string;
    modDate: string;
}
