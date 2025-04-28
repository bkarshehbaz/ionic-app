import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from "../../../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../../../providers/vvs-controller/vvs-controller.util.spec";
import { CarPhotosStep }          from './car-photos-step';

describe('CarPhotosStep', function () {

    // let de: DebugElement;
    let comp: CarPhotosStep;
    let fixture: ComponentFixture<CarPhotosStep>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([CarPhotosStep])
        .then( (data) => {
            fixture = data.fixture;
            comp = data.component;
            vvsApp = data.vvsApp;
        });

    }));

    // beforeEach( inject([VVSApp], ($vvsApp: VVSApp)  => {
    //    fixture = TestBed.createComponent(CarPhotosStep);
    //    comp = fixture.componentInstance;
    //    de = fixture.debugElement.query(By.css('h3'));

    //    $vvsApp = vvsApp;
    // }));

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
