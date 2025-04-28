import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { CONFIGURE_TESTBEST } from '../../providers/vvs-controller/vvs-controller.util.spec';

import {} from "jasmine";
import { SearchablePopover } from './searchable-popover';

describe('SearchablePopover', function () {

    // let de: DebugElement;
    let comp: SearchablePopover;
    let fixture: ComponentFixture<SearchablePopover>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([SearchablePopover])
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
