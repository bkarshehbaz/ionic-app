import { IHttpOperationBase } from '../http-operation-base';
import { ICarPhoto, INote } from '../../ionic';
/*
    Check Out Interface
*/
export interface ICheckOut extends IHttpOperationBase {
    isDeparting: number;
    roomNumber: string;

    notes: INote[];

    compCode?: any;
    // images: ICarPhoto[];
    paymentTypeID?: number;
    paymentTypeShortName?: any;
    isHotel: number; // only to validate
}
