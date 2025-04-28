export * from "./car/index";
export * from "./chat/index";
export * from "./current-ticket/index";
export * from "./socket/index";
export * from "./user/index";
export * from "./ionic/index";
export * from "./property/index";
export * from "./express/index";
export * from "./helper/index";
export * from "./mysql-sp/index";
export * from "./http-operations/index";

import { ISocketEventBase } from "./socket/socket-event-base.inteface";
// export { ISocketEventBase } from "./socket/socket-event-base.inteface";

export {
       //    IAddCompanyArrival,
       //    IAddEventParty,
          IAddMonthlyGoal,
          IAddParkArea,
          IAddUser,
       //    ISelectCompanyArrival,
       //    ISelectEventParty,
          ISelectMonthlyGoal,
          ISelectParkArea,
          ISelectUser,
       } from "./return-interfaces";

export {
         IParkInit as $IParkInit,
         IParkCancel as $IParkCancel,
         IPark as $IPark,

         IPullInit as $IPullInit,
         IPullCancel as $IPullCancel,
         IPull as $IPull,

         ICheckOutInit as $ICheckOutInit,
         ICheckOutCancel as $ICheckOutCancel,
         ICheckOut as $ICheckOut,

         ICheckInInit as $ICheckInInit,
         ICheckInCancel as $ICheckInCancel,
         ICheckIn as $ICheckIn,

         IInitialize,
         IInitializeMap

       } from "./api-return/index";

import { IOperationApiReturn  } from "./api-return/operation-api-return";

export interface IStatusType {
       ok: StatusType;
       bad: StatusType;
       notfound: StatusType;
       tobedone: StatusType;
       noresults: StatusType;
}
export type StatusType = string;

export type IMysqlResults<T> = T[];

interface VVSMysqlReturnArg<T> {
       error?: boolean;
       name?: string;
       results?: IMysqlResults<T>;
       status?: StatusType;
       message?: string;
       code?: number;
}

export type IReturnType = VVSMysqlReturnArg<any>&{result?: IOperationApiReturn};

export type IOperationCallback = (data: IReturnType) => void;
// export type IOperationCallback = (
//        data: VVSMysqlReturnArg<any>&{result?: IOperationApiReturn}
//        // {
//        //        error?: { name: "BadRequest", code: 400} | { name: "Unprocessable Entity", code: "422" },
//        //        status?: string,
//        //        result?: IOperationApiReturn
//        // }
// ) => void;
export type IOperationHandler  = ( data: ISocketEventBase, callback: IOperationCallback, options?: any ) => void;
