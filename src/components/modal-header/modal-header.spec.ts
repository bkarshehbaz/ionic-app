import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";


import { ModalsHeader } from "./modal-header";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('ModalsHeader  >>  ', () => {

    let fixture: ComponentFixture<ModalsHeader>;
    let component: ModalsHeader;
    // let de: DebugElement;
    // let initializeData: Initialize;

    // let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([ModalsHeader])
        .then( (data) => {
            fixture = data.fixture;
            component = data.component;
        });

    }));


    it( "should create component", () => {
        expect(component).toBeDefined();
    });

    it("editTicketHelper", (done: DoneFn) => {

        // assert
        component.editTicket
                 .subscribe(
                     () => {
                         done();
                     },
                     done.fail
                 );

        // act
        component.editTicketHelper();

    });


});
