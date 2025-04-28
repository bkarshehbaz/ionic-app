import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { CONFIGURE_TESTBEST } from '../../providers/vvs-controller/vvs-controller.util.spec';

import {} from "jasmine";
import { RecentActivityExpanded } from './recent-activity-expanded';

describe('RecentActivityExpanded', function () {

    // let de: DebugElement;
    let comp: RecentActivityExpanded;
    let fixture: ComponentFixture<RecentActivityExpanded>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([RecentActivityExpanded])
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
