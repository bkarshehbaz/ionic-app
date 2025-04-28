import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from "../../../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../../../providers/vvs-controller/vvs-controller.util.spec";
import { CarStep }          from './car-step';

import {} from "jasmine";

describe('CarStep component', function () {

    // let de: DebugElement;
    let comp: CarStep;
    let fixture: ComponentFixture<CarStep>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([CarStep])
        .then( (data) => {
            fixture = data.fixture;
            comp = data.component;
            vvsApp = data.vvsApp;
        });

    }));

    it('should create component', () => {
        expect(comp).toBeDefined();
    });

    // it('should ', () => {

    // });

    // it('should have expected <h3> text', () => {
    //   fixture.detectChanges();
    //   // const h3 = de.nativeElement;
    //   // expect(h3.innerText).toMatch(/ionic/i,
    //   //   '<h3> should say something about "Ionic"');
    // });

});
