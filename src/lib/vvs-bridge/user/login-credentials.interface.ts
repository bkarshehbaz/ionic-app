export interface ILoginCredentials {
    username: string;
    password: string;
    force?: 0|1;

    propertyID?: number;
    refresh?: 0|1;
}
