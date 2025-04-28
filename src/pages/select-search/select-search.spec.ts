import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { IProperty, IUser, NumericMap } from '../../lib/vvs-bridge';

// import { LoginPage } from "../login-page";
import { SelectSearchComponent } from "./select-search";

// import * as MOCKS from '../../app/app.providers.mock';

import * as _ from 'lodash';

import { VvsControllerProviderMock } from '../../mocks/vvs-controller-mock/vvs-controller.mock';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";
import { TokenInterceptor } from '../../providers/http-service/token.interceptor';



declare var Promise: any;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

xdescribe('SelectSearchComponent  >>  ', () => {
    // let fixture;
    let fixture: ComponentFixture<SelectSearchComponent>;
    let component: SelectSearchComponent;
    // let de: DebugElement;
    // let initializeData:Initialize;

    let vvsApp: VVSApp;

    beforeEach( ( (done: DoneFn) => {

        CONFIGURE_TESTBEST([SelectSearchComponent])
        .then( ( data: { component: any, fixture: any, vvsApp: any } ) => {
            vvsApp = data.vvsApp;
            component = data.component;
            fixture = data.fixture;

            done();
        })
        .catch(done.fail);

    }));

    // beforeEach( inject([VVSApp], ($vvsApp: VVSApp) => {
    //     vvsApp = $vvsApp;

    //     fixture = TestBed.createComponent(SelectSearchComponent);
    //     component = fixture.componentInstance;
    // }));


    describe("Choosing Property", function() {
        it('Choose property', ( function(done: any) {

              Promise.all([
                  vvsApp.lss.getPropertyData(),
                  vvsApp.lss.getLoginUser()
              ])
              .then( (vals) => {

                  const properties: NumericMap<IProperty> = vals[0];
                  const loginUser: IUser = vals[1] as any;
                  const propertyToChoose: IProperty = _.sample(_.values(properties));

                  TokenInterceptor.token = loginUser.Authorization;
                  vvsApp.httpService
                        .insertUserToProperty(propertyToChoose, loginUser)
                        .subscribe(
                            (data) => {
                                // expect(data).toEqual(jasmine.any(Object));
                                // logger.debug(data);
                                expect(_.isNil(data)).toEqual(false);
                                // expect(_.isNil(data.)).toEqual(false);
                                // expect(data.status).toEqual("ok");
                                vvsApp.lss.setCurrentProperty(propertyToChoose);
                                done();
                            },
                            (error) => {
                                expect(false).toThrowError("Choose Property error!"); //;toEqual(true,"Choose Proerty error: " + error);
                                expect(false).toEqual(true);
                                // logger.debug(error);
                                // done.fail(error);
                                done.fail(error);
                            },
                            () => {

                            }
                        );
              })
              .catch( reason => {
                  // logger.debug(reason);

                  done.fail(reason);
              });
        }));
    });

});
