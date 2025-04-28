import { IProperty } from '../property/property.interface';

export interface IUser {
    userID: number;
    areaManID: number;
    accountTypeID: number;
    username: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string;
    isActive: number;
    payPrivilege: number;
    manual: number;
    // currentPropertyID: number;
    createDate: string;
    modDate: string;
    password: string;
    Authorization: string;
    CurrentProperty: IProperty;
	AblyToken: string;
	ONE_SIGNAL_APP_ID: string;


    /**
     * Token Fields
     */
    propertyID?: number;


	stage: "prod" | "dev" | "qa" | "uat";

	properties: IProperty[];


    /**
     * JWT Fields
     */
    exp: number; // 1542579247;
    iat: number; // 1542568447;
}
