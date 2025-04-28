import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
// import { ReviewTicketComponent } from './review-ticket/review-ticket.component';

import { MultiStepForm } from './checkin-form';

// import { ColorPopover }       from './color-popover/color-popover';
// import { SearchablePopover }      from './searchable-popover/searchable-popover';
// import { SelectPopover }        from './select-popover/select-popover';
import { CarPhotosStep }          from './steps/car-photos-step/car-photos-step';
import { CarStep }                from './steps/car-step/car-step';
import { CustomerStep }           from './steps/customer-step/customer-step';

import { DebugElement } from '@angular/core';
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

describe('MultiStepForm', function () {

    // let de: DebugElement;
    let comp: MultiStepForm;
    let fixture: ComponentFixture<MultiStepForm>;

    beforeEach(async(() => {

        const declarations = [
            MultiStepForm,
            CustomerStep,
            CarStep,
            CarPhotosStep,
            // SelectPopover,
            // ColorPopover,
            // SearchablePopover,
            // ReviewTicketComponent
        ];
        CONFIGURE_TESTBEST(declarations);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiStepForm);
        comp = fixture.componentInstance;
        // de = fixture.debugElement.query(By.css('h3'));
    });

    it('should create component', () => expect(comp).toBeDefined() );

    // it('should have expected <h3> text', () => {
    //   fixture.detectChanges();
    //   // const h3 = de.nativeElement;
    //   // expect(h3.innerText).toMatch(/ionic/i,
    //   //   '<h3> should say something about "Ionic"');
    // });

});
