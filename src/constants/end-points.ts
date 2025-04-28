export const CheckOut: END_POINT = "mainoperation/CheckOut";
export const Pull: END_POINT = "mainoperation/Pull";
export const Park: END_POINT = "mainoperation/Park";
export const CheckIn: END_POINT = "mainoperation/CheckIn";
export const SyncRoomNumber: END_POINT = "mainoperation/SyncRoomNumber";
export const roomNumberValidation: END_POINT = "mainoperation/roomNumberValidation";
export const getReservationNumberUsingRoomNumber: END_POINT = "mainoperation/getReservationNumberUsingRoomNumber";
export const getSummaryDetails: END_POINT = "mainoperation/getSummaryDetails";
export const RCheckIn: END_POINT = "mainoperation/ReturningCheckIn";
export const EditCar: END_POINT = "mainoperation/EditCar";
export const CompleteCheckIn: END_POINT = "mainoperation/CompleteCheckIn";

export const PayWithCard: END_POINT = "mainoperation/PayWithCard";
export const PayWithCash: END_POINT = "mainoperation/PayWithCash";
export const PayWithVoucher: END_POINT = "mainoperation/PayWithVoucher";
export const PayWithComp: END_POINT = "mainoperation/PayWithComp";
export const BillingTransaction: END_POINT = "mainoperation/BillingIntegration";
// export const GetBalance		    : END_POINT	= "mainoperation/GetBalance";

export const EditCustomer: END_POINT = "mainoperation/EditCustomer";
export const EditCarPhotos: END_POINT = "mainoperation/EditCarPhotos";
export const EditParkLocation: END_POINT = "mainoperation/EditParkLocation";
export const PullRequest: END_POINT = "mainoperation/PullRequest";
export const PickProperty: END_POINT = "mainoperation/PickProperty";
export const ChatInsert: END_POINT = "mainoperation/ChatInsert";
export const ChatRetrieve: END_POINT = "mainoperation/ChatRetrieve";

export const DoSync: END_POINT = "mainoperation/DoSync";

export const Authenticate: END_POINT = "auth/authenticate";
export const GetCompanies: END_POINT = "auth/companies";
export const SignOut: END_POINT = "auth/signout";

export const Initializer: END_POINT = "init";

// export const GetCurrentTicketByID: END_POINT = "GetCurrentTicketByID";
// export const GetAllColors: END_POINT = "GetAllColors";
// export const GetAllLocationByPlaceID: END_POINT = "GetAllLocationByPlaceID";
// export const GetAllLocations: END_POINT = "GetAllLocations";
// export const GetAllPlaces: END_POINT = "GetAllPlaces";
// export const GetMakesByKeyword: END_POINT = "GetMakesByKeyword";
// export const GetModelsByMakeID: END_POINT = "GetModelsByMakeID";
// export const GetModelsByKeyword: END_POINT = "GetModelsByKeyword";
// export const GetChat: END_POINT = "GetChat";
// export const GetCurrentTickets: END_POINT = "GetCurrentTickets";

export type END_POINT =
    "mainoperation/CheckOut" |
    "mainoperation/Pull" |
    "mainoperation/Park" |
    "mainoperation/CheckIn" |
    "mainoperation/SyncRoomNumber" |
    "mainoperation/getSummaryDetails" |
    "mainoperation/ReturningCheckIn" |
    "mainoperation/EditCar" |
    "mainoperation/CompleteCheckIn" |
    "mainoperation/PayWithCard" |
    "mainoperation/PayWithCash" |
    "mainoperation/PayWithComp" |
    "mainoperation/roomNumberValidation" |
    "mainoperation/getReservationNumberUsingRoomNumber" |
    "mainoperation/BillingIntegration" |
    "mainoperation/PayWithVoucher" |
    // "mainoperation/GetBalance" |
    "mainoperation/EditCustomer" |
    "mainoperation/EditCarPhotos" |
    "mainoperation/EditParkLocation" |
    "mainoperation/PullRequest" |
    "mainoperation/PickProperty" |
    "mainoperation/DoSync" |
    "mainoperation/ChatInsert" |
    "mainoperation/ChatRetrieve" |
    "auth/signout" |
    "auth/authenticate" |
    "auth/companies" |
    "init" |
    "GetCurrentTicketByID" |
    "GetAllColors" |
    "GetAllLocationByPlaceID" |
    "GetAllLocations" |
    "GetAllPlaces" |
    "GetMakesByKeyword" |
    "GetModelsByMakeID" |
    "GetModelsByKeyword" |
    // "signout" |
    "GetChat" |
    "GetCurrentTickets";
