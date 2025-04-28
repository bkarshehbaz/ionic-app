import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from '../../../providers/vvs-controller/vvs-controller';
import { CONFIGURE_TESTBEST } from '../../../providers/vvs-controller/vvs-controller.util.spec';

import {} from "jasmine";
import { TicketItemView } from './ticket-item-view';

describe('TicketItemView', function () {

    // let de: DebugElement;
    let comp: TicketItemView;
    let fixture: ComponentFixture<TicketItemView>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([TicketItemView])
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
