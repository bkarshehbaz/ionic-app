import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';

import {} from "jasmine";
import { DecodeStringPipe } from '../../pipes/decode-string/decode-string';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { CONFIGURE_TESTBEST } from '../../providers/vvs-controller/vvs-controller.util.spec';
import { NotesRow } from './notes-row';

describe('NotesRow', function () {

    // let de: DebugElement;
    let comp: NotesRow;
    let fixture: ComponentFixture<NotesRow>;

    // tslint:disable-next-line:prefer-const
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        CONFIGURE_TESTBEST([NotesRow, DecodeStringPipe])
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
