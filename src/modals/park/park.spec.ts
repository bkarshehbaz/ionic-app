// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { DecodeStringPipe } from '../../pipes/decode-string/decode-string';
// import { TicketItemView } from "../../pages/home/ticket-item-view/ticket-item-view";
// import { RecentActivityItem } from "../../pages/logs-page/recent-activity-item/recent-activity-item";
// import { ModalFooter } from "../../components/modal-footer/modal-footer";
// import { ModalsHeader } from "../../components/modal-header/modal-header";
// import { CardNotesPhotosView } from "../../components/card-notes-photos-map-view/card-notes-photos-map-view";
// import { RecentActivityExpanded } from "./../../card-notes-photos-map-view/recent-activity-expanded/recent-activity-expanded";
// import { ParkModal } from "./park-component";

// // import { TimeAgoPipe } from "../../pipes/hours-minutes-seconds";
// import { KeysPipe } from "../../pipes/keys/keys";
// import { GlobalSearch } from "../../../global-search/global-search";

// import * as cf from '../../constants/constant-fields';
// import { NavParamsMock } from '../../mocks/navparams-mock/navparams.mock';
// import { CONFIGURE_TESTBEST } from "../../providers/vvs-controller/vvs-controller.util.spec";

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// describe('Park Component  >>  ', () => {

//     let fixture: ComponentFixture<ParkModal>;
//     let component: ParkModal;
//     // let de: DebugElement;
//     // let initializeData: Initialize;

//     // let vvsApp: VVSApp;

//     beforeEach(async(() => {

//         const declarations = [
//           ParkModal,
//           GlobalSearch,
//         //   TimeAgoPipe,
//           CardNotesPhotosView,
//           TicketItemView,
//           RecentActivityItem,
//           DecodeStringPipe,
//           RecentActivityExpanded,
//           ModalFooter,
//           ModalsHeader,
//           KeysPipe
//         ];

//         NavParamsMock.setParams(cf.ticket, {
//             ticket: {
//                 }
//             },
//             car: {},
//             loginUser: {},
//             ticketType: {},
//             make: {},
//             model: {}
//         });
//         NavParamsMock.setParams(cf.cardViewConfig, {

//         });

//         CONFIGURE_TESTBEST(declarations);

//     }));

//     beforeEach( () => {
//         fixture = TestBed.createComponent(ParkModal);
//         component = fixture.componentInstance;
//     });

//     it( "should create component", () => {
//         expect(component).toBeDefined();
//     });


// });
