import { IHttpOperationBase } from '../http-operation-base';

export interface IPark extends IHttpOperationBase {
    parkAreaID: number;
    parkLocationName: string;
    latitude: string;
    longitude: string;

    // needed to edit park location
    parkLocationID?: number;
}
