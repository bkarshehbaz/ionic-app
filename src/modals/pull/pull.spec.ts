// import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';





// // import * as Interface from '../../lib/vvs-bridge';






// import { VVSApp } from "../../providers/vvs-controller/vvs-controller";

// import { IonCardPayOptions } from "../ion-card-pay-options/ion-card-pay-options";
// import { PullComponent } from "./pull-component";

// import { RecentActivityItem } from "../../../logs-page/recent-activity-item/recent-activity-item";
// import { CardNotesPhotosView } from "../../card-notes-photos-map-view/card-notes-photos-map-view";
// import { RecentActivityExpanded } from "../../card-notes-photos-map-view/recent-activity-expanded/recent-activity-expanded";
// import { ModalFooter } from "../../modal-footer/modal-footer";
// import { ModalsHeader } from "../../modal-header/modal-header";

// import { DecodeStringPipe } from "../../pipes/decode-string/decode-string";
// import { KeysPipe } from "../../pipes/keys/keys";

// import { PhotosRow } from "../../components/photos-row/photos-row";

// import { TicketItemOptions } from "../../../home/ticket-item-options/ticket-item-options";


// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";


// describe('Pull Component  >>  ', () => {

//     let fixture: ComponentFixture<PullComponent>;
//     let component: PullComponent;
//     // let de: DebugElement;
//     // let initializeData: Initialize;

//     let vvsApp: VVSApp;

//     beforeEach(async(() => {
//         const declarations = [
//             PullComponent,
//             ModalsHeader,
//             ModalFooter,
//             IonCardPayOptions,
//             CardNotesPhotosView,

//             DecodeStringPipe,
//             KeysPipe,

//             RecentActivityExpanded,
//             RecentActivityItem,
//             PhotosRow,
//             TicketItemOptions
//         ];

//         CONFIGURE_TESTBEST(declarations);

//     }));

//     beforeEach( inject( [VVSApp], ($vvsApp: VVSApp) => {

//         const loginCredentials: any = {}; //Interface.ILoginCredentials = {} as Interface.ILoginCredentials;
//         loginCredentials.force = undefined;
//         loginCredentials.username = "smooth";
//         loginCredentials.password = "savestheday";

//         vvsApp = $vvsApp;

//         // vvsApp.lss.initObservers();
//         //
//         // vvsApp.httpService.authenticate(loginCredentials);
//         //
//         // vvsApp.httpService.initializeTickets();

//         fixture = TestBed.createComponent(PullComponent);
//         component = fixture.componentInstance;

//     }));

//     it( "should create component", (done: DoneFn) => {
//         expect(component).toBeDefined();

//         done();
//     });

// });
