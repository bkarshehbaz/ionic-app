import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonCardPayOptions } from "./ion-card-pay-options";

import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('IonCardPayOptions Component  >>  ', () => {

    let fixture: ComponentFixture<IonCardPayOptions>;
    let component: IonCardPayOptions;

    beforeEach(async(() => {

        const declarations = [
            IonCardPayOptions
        ];
        CONFIGURE_TESTBEST(declarations);

    }));

    beforeEach( () => {
        fixture = TestBed.createComponent(IonCardPayOptions);
        component = fixture.componentInstance;
    });

    it( "should create component", () => {
        expect(component).toBeDefined();
    });

});
