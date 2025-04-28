import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from "@angular/platform-browser";

// import { TimeAgoPipe }            from "../../pipes/hours-minutes-seconds";
import { HomePage } from "./home";
import { TicketItemOptions } from "./ticket-item-options/ticket-item-options";
import { TicketItemView } from "./ticket-item-view/ticket-item-view";

import { DebugElement } from '@angular/core';
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

import {} from "jasmine";
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


describe('Home Component  >>  ', () => {
    // let fixture;
    let fixture: ComponentFixture<HomePage>;
    let component: HomePage;
    let de: DebugElement;
    // let initializeData: Initialize;

    // let vvsApp: VVSApp;

    beforeEach(async(() => {

        const declarations = [HomePage, TicketItemView, TicketItemOptions];

        CONFIGURE_TESTBEST(declarations)
        .then( (data) => {
            fixture = data.fixture;
            component = data.component;
            de = fixture.debugElement;
        });

        // TestBed.configureTestingModule({
        //   declarations: [HomePage,TicketItemView,TimeAgoPipe,...DEFAULT_ENTRY_COMPONENT],
        //   imports: GET_IMPORTS(HomePage),
        //   providers: PROVIDERS
        // })
        // .overrideModule($BrowserDynamicTestingModule, ENTRY_COMPONENTS_SET);
    }));

    it( "should create component", () => {
        expect(component).toBeDefined();
    });

    it('initialises with a title of My Page', () => {
        expect(component.title).toEqual('Keybox');
    });

    it('has 4 tabs', () => {
        const tabs: DebugElement[] = fixture.debugElement.queryAll(By.css("ion-segment-button"));
        expect(tabs.length).toBe(4);
        // expect(_.isNil(tabs[0].query(By.css('segment-activated')))).toBe(false);
        // expect(_.isNil(tabs[1].query(By.css('segment-activated')))).toBe(true);
    });


});
