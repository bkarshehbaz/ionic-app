import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import {CONFIGURE_TESTBEST} from '../../providers/vvs-controller/vvs-controller.util.spec';
import { VVSApp } from './../../providers/vvs-controller/vvs-controller';
import { SelectPopover } from './select-popover';

import {} from "jasmine";

describe('SelectPopover component', function () {

    // let de: DebugElement;
    let comp: SelectPopover;
    let fixture: ComponentFixture<SelectPopover>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([SelectPopover])
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
