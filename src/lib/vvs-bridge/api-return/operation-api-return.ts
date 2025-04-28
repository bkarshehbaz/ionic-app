import {
    ICheckInCancelNew,
    ICheckInInitNew,

    ICheckOutCancelNew,
    ICheckOutInitNew,

    IParkCancelNew,
    IParkInitNew,
    
    // IPayCancelNew,
    // IPayInitNew,

    // IPropertyCancelNew,
    // IPropertyInitNew,
    
    IPullCancelNew,
    IPullInitNew,

    ICheckInReturningCancelNew,
    ICheckinInitReturningNew
} from "./index";

export type IOperationApiReturn =
ICheckInCancelNew|
ICheckInInitNew|

ICheckOutCancelNew|
ICheckOutInitNew|

IParkCancelNew|
IParkInitNew|

// IPayCancelNew|
// IPayInitNew|

// IPropertyCancelNew|
// IPropertyInitNew|

IPullCancelNew|
IPullInitNew|

ICheckInReturningCancelNew|
ICheckinInitReturningNew;
