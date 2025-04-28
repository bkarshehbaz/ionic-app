import { HttpService } from "../../providers/http-service/http-service";
// import * as initialize from "../../constants/initialize.json";
import * as vvsBridge from '../../lib/vvs-bridge';
import { Observable } from 'rxjs';
import * as CodeMessages from "../../constants/code-messages";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { ICheckOut, ILoginCredentials, ILoginSuccess, IPull, IUser, IProperty } from "../../lib/vvs-bridge";
import { init } from "../mock-data/json/initialize.mock.spec";
import { IPropertySignIn } from "../../lib/vvs-bridge/api-return";

const logger = Logger.get("HttpServiceMock");
let initialize;

// @Injectable()
export class HttpServiceMock extends HttpService {

    checkOut(data: ICheckOut): Observable<any> {
        logger.l(JSON.stringify(data, null, 2));
        return new Observable( (observer) => {
            return observer.next({status: 'ok'});
        });
    }

    park(data: ICheckOut): Observable<any> {
        logger.l(JSON.stringify(data, null, 2));
        return new Observable( (observer) => {
            return observer.next({status: 'ok'});
        });
    }

    pull(data: IPull): Observable<any> {
        logger.l(JSON.stringify(data, null, 2));
        return new Observable( (observer) => {
            return observer.next({status: 'ok'});
        });
    }

    loadImportantData() {
        // start.setHours(0,0,0,0);

        initialize = init;
    }

    initializeTickets() {
        // logger.l("initializeTickets",$init.init, this.lss);
        return this.lss.handleAllTicketData(init as any) as any;
    }

    authenticate(userToAuthenticate: vvsBridge.ILoginCredentials, renew = false): Observable<vvsBridge.ICodeMessage|vvsBridge.ILoginSuccess> {

        return new (Observable as any)( (observer: any) => {

            const _data: ILoginSuccess = {
                user: initialize.LoginUser,
                properties: initialize.Property, 
                ...CodeMessages.Success
            };

            logger.w(_data);
            if (_data && _data.code) {

                switch (_data.code) {

                    case CodeMessages.Success.code:
                        this.onLoginSuccess("http_mock", _data);
                        return _data;

                    case CodeMessages.AuthenticationFailed.code:
                        return CodeMessages.AuthenticationFailed;

                    case CodeMessages.UserAlreadySignedIn.code:
                        return CodeMessages.UserAlreadySignedIn;

					case CodeMessages.AuthenticationFailedUserNotFound.code:
						return CodeMessages.AuthenticationFailedUserNotFound;
                }

            } else {
                return CodeMessages.SomethingWentWrong;
            }



        });
    }

    public insertUserToProperty(property: IProperty, user: IUser): Observable<IPropertySignIn> {
        return new Observable( (observer) => {
            return observer.next("Mock Call");
        }) as any;
    }


    public removeUserFromProperty() {
        return new Observable( (observer) => {
            return observer.next("Mock Call");
        });
    }

    GetCompanies() {
        return new Observable( (observer) => {
            return observer.next("Mock Call");
        });
    }

    getChatData() {
        // logger.debug("GetChat");
        return new Observable( (observer) => {
            return observer.next("Mock Call");
        });
    }



}
