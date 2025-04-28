/*
    Car Interfaces
*/
export interface ICar {
    carID: number;
    vinNumber: string;
    makeID: number;
    modelID: number;
    colorID: number;
    colorHex?: string;
    carYear: string;
    manual: number;
    createDate: string;
    modDate: string;
    licensePlate?: string;
}
