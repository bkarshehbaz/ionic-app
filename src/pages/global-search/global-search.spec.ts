import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeStringPipe } from '../../pipes/decode-string/decode-string';
// import { CardNotesPhotosView } from "../ticket-view/card-notes-photos-map-view/card-notes-photos-map-view";
// import { RecentActivityExpanded } from "../ticket-view/card-notes-photos-map-view/recent-activity-expanded/recent-activity-expanded";
import { CompleteTicketView } from "../ticket-view/ticket-view";
import { TicketItemView } from "../home/ticket-item-view/ticket-item-view";
import { RecentActivityItem } from "../logs-page/recent-activity-item/recent-activity-item";

// import { TimeAgoPipe } from "../../pipes/hours-minutes-seconds";
// import { KeysPipe } from "../../pipes/keys/keys";
import { GlobalSearch } from "../global-search/global-search";




import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('Search Component  >>  ', () => {

    let fixture: ComponentFixture<CompleteTicketView>;
    let component: CompleteTicketView;
    // let de:DebugElement;
    // let initializeData:Initialize;

    // let vvsApp:VVSApp;

    beforeEach(async(() => {

        const declarations = [
            GlobalSearch,
            CompleteTicketView,
            // TimeAgoPipe,
            // KeysPipe,
            // CardNotesPhotosView,
            TicketItemView,
            RecentActivityItem,
            DecodeStringPipe,
            // RecentActivityExpanded
        ];

        CONFIGURE_TESTBEST(declarations)
        .then( (data) => {
            component = data.component;
            fixture = data.fixture;
        });

    }));

    // beforeEach( () => {
    //     fixture = TestBed.createComponent(CompleteTicketView);
    //     component = fixture.componentInstance;
    // });

    it( "should create component", () => {
        expect(component).toBeDefined();
    });

});
