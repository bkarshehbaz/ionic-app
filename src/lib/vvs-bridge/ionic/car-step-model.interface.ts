export interface ICarStepModel {
    currentTicketID?: number;
    vinNumber: string;
    licensePlate?: string;
    manual: number;
    electric: number;
    // fueltype         :  number;

    makeName: string;
    makeID: number;
    apiMakeID: string;

    modelName: string;
    modelID: number;
    apiModelID: string;

    carYear: string;

    colorName: string;
    colorID?: number;

    status: string;

    // custom
    lastMakeFilterKeyword?: string;
    lastModelFilterKeyword?: string;
    ticketNumber?: string; 3
}

export interface ICarStepControl<T> {
    currentTicketID?: T; // number;
    vinNumber: T; //  string;
    licensePlate?: T;

    manual: T; //  number;
    electric: T; //  number;
    // fueltype         : T; //  number;

    makeName: T; //  string;
    makeID: T; //  number;
    apiMakeID: T; //  string;

    modelName: T; //	string;
    modelID: T; //	number;
    apiModelID: T; //  string;

    carYear: T; //	string;

    colorName: T; //	string;
    colorID?: T; // 	number;

    status: T; // string;

    // custom
    lastMakeFilterKeyword?: T; //string;
    lastModelFilterKeyword?: T; //string;
}
