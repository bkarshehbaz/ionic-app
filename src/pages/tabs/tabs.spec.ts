import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";
// import { ChatComponent } from '../chat/chat';
import { HomePage } from '../home/home';
import { LogsPage } from '../logs-page/logs-page';
import { MultiStepForm } from '../checkin-form/checkin-form';
import { TabsPage } from "./tabs";


jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('TabsPage Component  >>  ', () => {
    // let fixture;
    let fixture: ComponentFixture<TabsPage>;
    let component: TabsPage;
    let vvsApp: VVSApp;

    beforeEach(async(() => {

        const declarations = [
            TabsPage,
            HomePage,
            // ChatComponent,
            MultiStepForm,
            LogsPage
        ];
        CONFIGURE_TESTBEST(declarations);
    }));

    beforeEach( inject([VVSApp], ($vvsApp: VVSApp) => {
        fixture = TestBed.createComponent(TabsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        vvsApp = $vvsApp;
    }));


    describe("TabsPage >>  ", () => {
        it('basic', (done) => {

            // component.
            done();
        });
    });

});
