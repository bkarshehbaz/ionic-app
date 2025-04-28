import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { By } from "@angular/platform-browser";

// import { KeysPipe } from "../../pipes/keys/keys";
import { LogsPage } from "./logs-page";
import { RecentActivityItem } from "./recent-activity-item/recent-activity-item";

import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

import {} from "jasmine";
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('Logs Page Component  >>  ', () => {
    // let fixture;
    let fixture: ComponentFixture<LogsPage>;
    let component: LogsPage;
    let de: DebugElement;
    // let initializeData: Initialize;

    let vvsApp: VVSApp;
    beforeEach(async(() => {

        const declarations = [LogsPage, RecentActivityItem];
        CONFIGURE_TESTBEST(declarations);

    }));

    beforeEach( inject([VVSApp], ($vvsApp: VVSApp) => {
        fixture = TestBed.createComponent(LogsPage);
        fixture.detectChanges();
        component = fixture.componentInstance;

        vvsApp = $vvsApp;

    }));


    it( "should create component", () => {
        expect(component).toBeDefined();
    });

    it( "shoudl display recent activities", fakeAsync( () => {

        component.ionViewDidLoad();
        tick();
        // logger.debug("component",component);


        fixture.detectChanges();

        // logger.debug("fixture",fixture);
        de = fixture.debugElement.query(By.css("recent-activity-item ion-row"));

        // expect(de.children.length).toBeGreaterThan(2);

        // logger.debug(component,de);

        // expect(component.groups.length).toBeGreaterThan(0);

    }));

    // it('IDK', function(done:DoneFn) {
    //
    //     logger.debug(component);
    //     setTimeout( () => {
    //         expect(component.groups.length).toBeGreaterThan(0);
    //         done();
    //     }, 2000);
    //
    // });

});
