import { HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import * as _ from "lodash";
import { ICodeMessage, ILoginCredentials, ILoginSuccess, IUser } from '../../lib/vvs-bridge';
// import * as vvsBridge from '../../lib/vvs-bridge';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";
import { LoginPage } from "./login-page";


jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('Login Component  >>  ', () => {
    // let fixture;
    let fixture: ComponentFixture<LoginPage>;
    let component: LoginPage;
    // let de: DebugElement;
    // let initializeData: any; // Initialize;
    let vvsApp: VVSApp;
    let httpMock: HttpTestingController;
    beforeEach(async(() => {

        CONFIGURE_TESTBEST([LoginPage])
        .then( (data) => {
            fixture = data.fixture;
            component = data.component;
            vvsApp = data.vvsApp;
            httpMock = data.httpMock;
        });

    }));


    describe("LocalStorageService Login >>  ", () => {
        it('Login', ( (done: DoneFn) => {

            // arrange
            const loginCredentials: ILoginCredentials = {} as ILoginCredentials;
            loginCredentials.force = undefined;
            loginCredentials.username = "smooth";
            loginCredentials.password = "savestheday";

            const response = {} as ILoginSuccess;
            // response.

            // act
            const authenticateSubscription = vvsApp.httpService.authenticate(loginCredentials);

            // assert
            authenticateSubscription.subscribe(
                (loginInformation: ILoginSuccess|ICodeMessage) => {
                    // expect(quote).toEqual(mockQuote.value);
                    if (loginInformation.success === true) {
                        // expect(loginInformation.success).toBe(true);
                        expect((loginInformation as ILoginSuccess).user.Authorization).toEqual(jasmine.any(String));
                        expect((loginInformation as ILoginSuccess).user.username).toEqual("smooth");
                        expect(_.isNil((loginInformation as ILoginSuccess).user.password)).toBe(true);
                        // vvsApp.lss.initIH();

                    } else if (loginInformation.success === false) {

                        expect(false).toEqual(true);

                    } else {

                    }
                },
                done.fail
            );

            // flux
            httpMock.expectOne({}).flush(response);

            // assert

            // vvsApp.httpService
            //       .authenticate(loginCredentials)
            //       .subscribe(
            //           (loginInformation: ILoginSuccess|ICodeMessage) => {

            //               if (loginInformation.success === true) {
            //                   // expect(loginInformation.success).toBe(true);
            //                   expect((loginInformation as ILoginSuccess).user.Authorization).toEqual(jasmine.any(String));
            //                   expect((loginInformation as ILoginSuccess).user.username).toEqual("smooth");
            //                   expect(_.isNil((loginInformation as ILoginSuccess).user.password)).toBe(true);
            //                   vvsApp.lss.initIH();

            //               } else if (loginInformation.success === false) {

            //                   expect(false).toEqual(true);

            //               } else {

            //               }

            //               // expect(loginInformation.properties).toEqual(jasmine.any(Array));

            //           },
            //           (error: Error) => {
            //               expect(true).toEqual(false, "Error on Login");
            //               expect(false).toEqual(true);
            //             //   vvsApp.e(error);
            //               done.fail(error);
            //               // done();

            //           },
            //           () => {
            //               done();
            //           }
            //      );
        }));

        it("LoginUser should have been stored in localstorage", function(done: any) {

              vvsApp.lss
                    .getLoginUser()
                    .then( (loginUser: IUser) => {
                        // logger.debug("loginUser >> ",loginUser);
                        expect(loginUser.Authorization).toEqual(jasmine.any(String));
                        expect(loginUser.userID).toEqual(jasmine.any(Number));
                        done();
                    })
                    .catch( reason => done.fail(reason));

        });

    });

});
