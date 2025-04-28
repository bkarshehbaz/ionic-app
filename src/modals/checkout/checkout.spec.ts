// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import * as cf from  "../../constants/constant-fields";
// import { DecodeStringPipe } from '../../pipes/decode-string/decode-string';
// import { TicketItemView } from "../../../home/ticket-item-view/ticket-item-view";
// import { RecentActivityItem } from "../../../logs-page/recent-activity-item/recent-activity-item";
// // import { ModalFooter } from "../../modal-footer/modal-footer";
// // import { ModalsHeader } from "../../modal-header/modal-header";
// import { CardNotesPhotosView } from "./../../card-notes-photos-map-view/card-notes-photos-map-view";
// import { RecentActivityExpanded } from "./../../card-notes-photos-map-view/recent-activity-expanded/recent-activity-expanded";
// import { CheckOutComponent } from "./checkout-component";
// import { KeysPipe } from "../../pipes/keys/keys";
// import { GlobalSearch } from "../../../global-search/global-search";
// import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// describe('CheckOutModal Component  >>  ', () => {

//     let fixture: ComponentFixture<CheckOutComponent>;
//     let component: CheckOutComponent;
//     // let de: DebugElement;
//     // let initializeData: Initialize;

//     // let vvsApp: VVSApp;

//     beforeEach(async(() => {

//         const declarations = [
//             CheckOutComponent,
//             GlobalSearch,
//             // TimeAgoPipe,
//             CardNotesPhotosView,
//             TicketItemView,
//             RecentActivityItem,
//             DecodeStringPipe,
//             RecentActivityExpanded,
//             // ModalFooter,
//             // ModalsHeader,
//             KeysPipe
//         ];

//         const params: any = {
//             key: cf.ticket,
//             value: {
//                 loginUser: { },
//                 ticket: { },
//                 ticketType: { }
//             }
//         };

//         CONFIGURE_TESTBEST(declarations, params)
//         .then( (data) => {
//             fixture = TestBed.createComponent(CheckOutComponent);
//             component = fixture.componentInstance;
//         });

//     }));

//     it( "should create component", () => {
//         expect(component).toBeDefined();
//     });


// });
