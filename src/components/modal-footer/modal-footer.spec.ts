import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

import { ModalFooter } from "./modal-footer";
import * as modalFooterOptions from './modal-footer.options';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('ModalFooter Component  >>  ', () => {

    let fixture: ComponentFixture<ModalFooter>;
    let component: ModalFooter;
    // let de: DebugElement;
    // let initializeData: Initialize;

    // let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([ModalFooter])
        .then( (data) => {
            fixture = data.fixture;
            component = data.component;
        })
        .catch(console.error);

    }));

    it( "should create component", () => {
        expect(component).toBeDefined();
    });

    it("onSubmitClick", (done: DoneFn) => {

        // arrange
        component.presentConfirm = true;

        // assert
        component.submit
                 .subscribe(
                     (data: boolean) => {
                          expect(data).toBe(true);
                          expect(modalFooterOptions.submit).toBe(true);
                     },
                     done.fail
                 );

        // act
        component.onSubmitClick();

        done();



    });

    it("onCancelClick", (done: DoneFn) => {

        // arrange

        // act

        // assert

        done();

    });

});
