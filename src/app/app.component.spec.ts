import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { VVSApp } from "../providers/vvs-controller/vvs-controller";
import { AppComponent } from './app.component';

import { CONFIGURE_TESTBEST } from "../providers/vvs-controller/vvs-controller.util.spec";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('AppComponent >> ', () => {
    // let fixture;
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let vvsApp: VVSApp;

    beforeEach(async(() => {
        CONFIGURE_TESTBEST([AppComponent])
            .then( (data) => {
                fixture = data.fixture;
                vvsApp = data.vvsApp;
                component = data.component;
            });
    }));

    // beforeEach( inject([VVSApp], ($vvsApp: VVSApp) => {
    //     fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     component = fixture.componentInstance;
    //     vvsApp = $vvsApp;
    // }));

    it('should be created', (done) => {
        // logger.debug(Platform.is('android'));
        expect(component instanceof AppComponent).toBe(true);


        done();
    });
    //
    // LocalStorageServiceSpec.runLocalStorageServiceSpec(true);
    // CompleteTicketViewSpec.runCompleteTicketViewSpec(true);


});
