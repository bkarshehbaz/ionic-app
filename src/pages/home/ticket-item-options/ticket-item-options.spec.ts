import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from '../../../providers/vvs-controller/vvs-controller';
import { CONFIGURE_TESTBEST } from '../../../providers/vvs-controller/vvs-controller.util.spec';

import {} from "jasmine";
import { TicketItemOptions } from './ticket-item-options';

describe('TicketItemOptions', function () {

    // let de: DebugElement;
    let comp: TicketItemOptions;
    let fixture: ComponentFixture<TicketItemOptions>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([TicketItemOptions])
        .then( (data) => {
            fixture = data.fixture;
            comp = data.component;
            vvsApp = data.vvsApp;
        });

    }));

    it('should create component', () => {
        expect(comp).toBeDefined();
    });

});
