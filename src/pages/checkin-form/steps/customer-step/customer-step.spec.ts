import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from "../../../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../../../providers/vvs-controller/vvs-controller.util.spec";
import { CustomerStep } from "./customer-step";

describe('CustomerStep component', function () {

    let de: DebugElement;
    let comp: CustomerStep;
    let fixture: ComponentFixture<CustomerStep>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        const declarations = [CustomerStep];
        CONFIGURE_TESTBEST(declarations)
        .then( data => {
            fixture = data.fixture;
            comp = data.component;
            vvsApp = data.vvsApp;
        });

    }));


    it('should create component', () => {
        expect(comp).toBeDefined();
    });

    it('should ', () => {

        comp.ticket.ticketNumber = "23923";

        fixture.detectChanges();

    });

});
