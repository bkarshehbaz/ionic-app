export interface IProperty {
    // propertyID: number;
    // areaManID: number;
    // cityID: number;
    // streetAddress: string;
    // propertyName: string;
    // timeZone: string;
    // createDate: Date;
    // modDate: Date;

    "userID": number; //1000000002,
    "propertyID": number; //1000000000,
    "companyID": number; //1000000000,
    "areaManagerID": number; //1000000010,
    "streetAddress": string; // "222 S. Caldwell st.",
    "city": string; // "Charlotte",
    "state": string; // "NC",
    "propertyName": string; // "Hyatt Place",
    "schemaName": string; // "ValetDB",
    "timeZone": string; // "US/Eastern",
    "momentTimeZone": string; // "America/New_York",
    "isActive": 1|0;
    "longitude": string; // "35.2225748",
    "latitude": string; // "-80.8432728",
    "createDate": null;
    "modDate": null;
    "zipcode": string; // "28202",
    "phone": string; // "7049425246",
    "email": string; // "hyatt@hyattplc.com",
    "twilioNumber": string; // "+17047035689",
    "compCode": string; // "test"
}
