import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { isArray, isNil} from 'lodash';
// import { IUser } from '../../lib/vvs-bridge';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";
import { LoginPage } from "./login-page";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

xdescribe('Signout Component  >>  ', () => {
    // let fixture;
    let fixture: ComponentFixture<LoginPage>;
    let component: LoginPage;
    // let de: DebugElement;
    // let initializeData: Initialize;
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([LoginPage])
            .then( (data) => {
                fixture = data.fixture;
                component = data.component;
                vvsApp = data.vvsApp;
            });

    }));

    describe("SIGN OUT >> ", () => {

          it("Should be ok", (done: DoneFn) => {

                setTimeout( () => {


                    vvsApp.httpService
                          .signOut()
                          .subscribe(
                               (data) => {
                                  // logger.debug(data);
                                  vvsApp.lss.clearLoginUser();
                                  vvsApp.lss.clearLocalStorage();
                                  done();
                               },
                               done.fail,
                               () => {

                               }
                          );
                }, 10000);

          });
    // });
    //
    // describe("SIGNOUT Completed", () => {
          it('Login User was cleared.', (done: DoneFn) => {

                vvsApp.lss
                      .getLoginUser()
                      .then( (loginUser: any) => {
                          expect(isNil(loginUser)).toEqual(true);
                          done();
                      })
                      .catch(done.fail);
          });

          it('LocalStorage was cleared', (done: DoneFn) => {

                vvsApp.lss
                      .getCurrentTicketData()
                      .then( (data: any) => {
                          expect(isNil(data)).toEqual(true);
                          vvsApp.lss
                                .getAllKeys()
                                .then( (keys: string[]) => {
                                    expect( (isArray(keys) && keys.length === 0) || isNil(keys) ).toEqual(true);
                                    done();
                                })
                                .catch(done.fail);
                      })
                      .catch(done.fail);

          });
    });



});
