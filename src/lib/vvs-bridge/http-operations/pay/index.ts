import { IHttpOperationBase } from '../http-operation-base';

export interface IPay extends IHttpOperationBase {
    transactionType: string;
    transactionAmount: number;
}
