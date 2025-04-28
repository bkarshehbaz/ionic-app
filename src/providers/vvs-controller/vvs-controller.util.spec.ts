// import { AppComponent } from '../../app/app.component';
// // import { AppLinks } from '../../app/app.links';
// import { ENV } from "../../environments/index";

// import { ElasticModule } from 'angular2-elastic';
// // import { TextMaskModule } from 'angular2-text-mask';

// // import * as Comp from "../../constants/component-names";

// // import { IonDigitKeyboard }       from "../../components/ion-digit-keyboard/ion-digit-keyboard";

// import { HomePage }               from "../../pages/home/home";
// import { LegendsComponent }        from "../../popovers/legends/legends";
// import { TicketItemOptions }      from "../../pages/home/ticket-item-options/ticket-item-options";
// import { TicketItemView }         from "../../pages/home/ticket-item-view/ticket-item-view";

// import { GlobalSearch }           from "../../pages/global-search/global-search";

// import { TabsPage }               from "../../pages/tabs/tabs";

// import { CompleteTicketView }     from "../../pages/ticket-view/ticket-view";
// import { ImageViewer }            from "../../components/image-viewer/image-viewer";
// import { CheckOutComponent }      from "../../modals/checkout/checkout";
// import { EditComponent }          from "../../modals/edit/edit";
// import { ParkComponent }          from "../../modals/park/park";
// import { PullComponent }          from "../../modals/pull/pull";

// // import { PayCardComponent }       from "../../pages/ticket-view/modals/pay-card-component/pay-card-component";
// // import { IonCardPayOptions }      from "../../pages/ticket-view/modals/ion-card-pay-options/ion-card-pay-options";
// // import { PayCashComponent }       from "../../pages/ticket-view/modals/pay-cash-component/pay-cash-component";
// // import { PayComponent }           from "../../pages/ticket-view/modals/pay-component/pay-component";

// // import { CardNotesPhotosView }    from "../../pages/ticket-view/card-notes-photos-map-view/card-notes-photos-map-view";
// // import { RecentActivityExpanded } from "../../pages/ticket-view/card-notes-photos-map-view/recent-activity-expanded/recent-activity-expanded";


// import { ModalFooter }            from "../../components/modal-footer/modal-footer";
// import { ModalsHeader }           from "../../components/modal-header/modal-header";


// import { ChatBubbleComponent }    from "../../pages/chat/bubble/bubble";
// import { ChatComponent }          from "../../pages/chat/chat";


// // import { ColorPopover }       from "../../pages/checkin-form/color-popover/color-popover";
// import { MultiStepForm }          from "../../pages/checkin-form/checkin-form";
// // import { SearchablePopover }      from "../../pages/checkin-form/searchable-popover/searchable-popover";
// // import { SelectPopover }        from "../../pages/checkin-form/select-popover/select-popover";
// import { CarPhotosStep }          from "../../pages/checkin-form/steps/car-photos-step/car-photos-step";
// import { CarStep }                from "../../pages/checkin-form/steps/car-step/car-step";
// import { CustomerStep }           from "../../pages/checkin-form/steps/customer-step/customer-step";


// // import { AddModifyReminder }      from "../../pages/reminder/add-modify-reminder/add-modify-reminder";
// // import { Reminders }              from "../../pages/reminder/reminders";

// import { LoginPage }              from "../../pages/login-page/login-page";
// import { SelectSearchComponent }  from "../../pages/select-search/select-search";

// import { LogsPage }               from "../../pages/logs-page/logs-page";
// import { RecentActivityItem }     from "../../pages/logs-page/recent-activity-item/recent-activity-item";

// // import { TimeAgoPipe }            from "../../pipes/hours-minutes-seconds";

// // import { KeyboardAttachDirective } from '../../directives/keyboard-attach-directive/keyboard-attach-directive';

// import { PhotosRow } from '../../components/photos-row/photos-row';
// // import { keyboardFix } from '../../directives/keyboard-fix/keyboard-fix';

// import { DecodeStringPipe } from '../../pipes/decode-string/decode-string';
// import { HighlightPipe } from '../../pipes/highlight/highlight';
// // import { KeysPipe } from '../../pipes/keys/keys';

// import {} from "jasmine";



// import * as IM from 'ionic-mocks';

// const all_declarations = [
//         AppComponent,
//         HomePage,
//         TabsPage,
//         // ColorPopover,
//         CompleteTicketView,
//         ChatComponent,
//         MultiStepForm,
//         // Reminders,
//         // AddModifyReminder,
//         LoginPage,
//         CustomerStep,
//         CarStep,
//         CarPhotosStep,
//         SelectSearchComponent,
//         ImageViewer,
//         TicketItemView,
//         TicketItemOptions,
//         SearchablePopover,
//         SelectPopover,
//         LogsPage,
//         // TimeAgoPipe,
//         ParkComponent,
//         PullComponent,
//         GlobalSearch,
//         CheckOutComponent,
//         // PayComponent,
//         // PayCashComponent,
//         // PayCardComponent,
//         IonCardPayOptions,
//         CardNotesPhotosView,
//         LegendsComponent,
//         ModalsHeader,
//         ModalFooter,
//         ChatBubbleComponent,
//         // KeyboardAttachDirective,
//         // keyboardFix,
//         DecodeStringPipe,
//         EditComponent,
//         RecentActivityItem,
//         RecentActivityExpanded,
//         // KeysPipe,
//         HighlightPipe,
//         PhotosRow,
//         // IonDigitKeyboard
//       ];



















// import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
// import {Config, DomController, Form, IonicModule, Keyboard, Menu, SelectPopover } from 'ionic-angular';

// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

// import { ComponentFactory, ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';

// import { IonicStorageModule, Storage } from '@ionic/storage';

// import { HttpModule } from "@angular/http";



// import { ViewControllerMock } from '../../mocks/ionic-mock/angular/view-controller-mock/view-controller.mock';

// // tslint:disable-next-line:no-duplicate-imports
// import { ActionSheetController,
//          AlertController,
//          App,
//          DeepLinker,
//          LoadingController,
//          MenuController,
//          ModalController,
//          NavController,
//          NavParams,
//          Platform,
//          PopoverController,
//          ToastController,
//          ViewController } from "ionic-angular";



// import { LoadingControllerMock } from "../../mocks/ionic-mock/angular/loading-controller-mock/loading-controller.mock";
// // import { DeepLinkerMock } from "../../mocks/ionic-mock/angular/nav-controller-mock/nav-controller.mock";
// import { PlatformMock } from "../../mocks/ionic-mock/angular/platform-mock/platform.mock";
// import { NavParamsMock } from "../../mocks/navparams-mock/navparams.mock";


// import { AppMock } from "../../mocks/ionic-mock/angular/app-mock/app.mock";



// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


// export class DeepLinkerMock {
//   public static instance(): any {
//       const instance = jasmine.createSpyObj('DeepLinker', ['getComponentFromName', 'getSegmentByNavIdOrName', 'resolveComponent']);
//       instance.getComponentFromName.and.returnValue(Promise.resolve());
//       instance.getSegmentByNavIdOrName.and.returnValue(Promise.resolve());
//       instance.resolveComponent.and.returnValue( {
//         create: () => {

//         }
//       });


//       return instance;
//   }
// }

// // tslint:disable-next-line:max-classes-per-file
// export class ComponentFactoryResolverMock {
//   public static instance(): any {
//       const instance = jasmine.createSpyObj('ComponentFactoryResolver', ['resolveComponentFactory']);
//       instance.resolveComponentFactory.and.returnValue(Promise.resolve({
//         create: () => {

//         },
//         selector: "any-selector"
//       }));

//       return instance;
//   }
// }

// // tslint:disable-next-line:max-classes-per-file
// export class VVSKeyboardMock {
//   public static instance(): any {
//       const instance = jasmine.createSpyObj('ComponentFactoryResolver', ['resolveComponentFactory']);
//       instance.willShow = new EventEmitter<number>();
//       instance.willHide = new EventEmitter<void>();
//       instance.didShow = new EventEmitter<number>();
//       instance.didHide = new EventEmitter<void>();

//       return instance;
//   }
// }
// // // tslint:disable-next-line:max-classes-per-file
// // export class VVSMenuMock extends IM.MenuMock {
// //   public static instance(): any {
// //       const instance = super.instance();
// //       return instance;
// //   }
// // }
// // // tslint:disable-next-line:max-classes-per-file
// // export class VVSMenuControllerMock extends IM.MenuControllerMock {
// //   public static instance(menu?: IM.MenuMock): any {
// //       const m = menu || IM.MenuMock.instance();

// //       // tslint:disable-next-line:max-line-length
// // tslint:disable-next-line:max-line-length
// //       const instance = jasmine.createSpyObj('MenuController', ['_canOpen', 'getSegmentByNavIdOrName', '_setActiveMenu', '_register', 'close', 'enable', 'get', 'getMenus', 'getOpen', 'isEnabled', 'isOpen', 'open', 'swipeEnable', 'toggle']);
// //       instance._canOpen.and.returnValue(Promise.resolve());
// //       instance.getSegmentByNavIdOrName.and.returnValue(Promise.resolve());
// //       instance._register.and.returnValue(Promise.resolve());
// //       instance._setActiveMenu.and.returnValue(Promise.resolve());
// //       instance.close.and.returnValue(Promise.resolve());
// //       instance.enable.and.returnValue(m);
// //       instance.get.and.returnValue(m);
// //       instance.getMenus.and.returnValue([m]);
// //       instance.getOpen.and.returnValue(m);
// //       instance.isEnabled.and.returnValue(true);
// //       instance.isOpen.and.returnValue(false);
// //       instance.open.and.returnValue(Promise.resolve());
// //       instance.swipeEnable.and.returnValue(m);
// //       instance.toggle.and.returnValue(Promise.resolve());
// //       return instance;
// //   }
// // }


// // function mockNavController(): Nav {
// //   const nav = new Nav() as any;
// //   nav.el = mockElement('ion-nav') as HTMLElement;
// //   nav.ionNavDidChange = {emit: function() { return; } };
// //   nav.ionNavWillChange = {emit: function() { return; } };

// //   nav.animationCtrl = new AnimationControllerImpl() as any;
// //   nav.config = createConfigController({animate: false}, []);
// //   nav._viewInit = function (enteringView: ViewController) {
// //     if (!enteringView.element) {
// //       console.log(enteringView.component);
// //       enteringView.element = (typeof enteringView.component === 'string')
// //         ? mockElement(enteringView.component) as HTMLElement
// //         : enteringView.element = enteringView.component as HTMLElement;
// //     }
// //     enteringView.state = ViewState.Attached;
// //   };
// //   return nav;
// // }
// // const nav = mockProviders.mockNavController();
// // const app = mockProviders.mockApp();
// import { Observable } from 'rxjs';
// // import { ViewControllerMock } from './view-controller';



// // tslint:disable-next-line:max-classes-per-file
// export class VVSPlatformMock {
//   public static instance(): any {

//       const instance = jasmine.createSpyObj('Platform', [
//           'dir',
//           'getQueryParam',
//           'height',
//           'is',
//           'isLandscape',
//           'isPortrait',
//           'isRTL',
//           'lang',
//           'pause',
//           'platforms',
//           'ready',
//           'registerBackButtonAction',
//           'resize',
//           'resume',
//           'setDir',
//           'setLang',
//           'testUserAgent',
//           'url',
//           'version',
//           'width',
//           'doc',
//           'registerListener',
//           'win',
//           'getActiveElement',
//           'raf',
//           'hasFocus',
//           'getElementComputedStyle',
//           'timeout'
//       ]);

//       instance.dir.and.returnValue('');
//       instance.getQueryParam.and.returnValue('');
//       instance.height.and.returnValue(0);
//       instance.is.and.returnValue(true);
//       instance.isLandscape.and.returnValue(false);
//       instance.isRTL.and.returnValue(true);
//       instance.lang.and.returnValue('en');
//       instance.platforms.and.returnValue([]);
//       instance.ready.and.returnValue(Promise.resolve());
//       instance.registerBackButtonAction.and.returnValue(() => {});
//       instance.registerListener.and.returnValue(() => {});
//       instance.url.and.returnValue('');
//       instance.version.and.returnValue([]);
//       instance.width.and.returnValue(0);
//       instance.doc.and.returnValue(document);
//       instance.win.and.returnValue(window);
//       instance.getActiveElement.and.returnValue(document['activeElement']);
//       instance.raf.and.returnValue(1);
//       instance.hasFocus.and.returnValue(true);
//       instance.getElementComputedStyle.and.returnValue({
//           paddingLeft: '10',
//           paddingTop: '10',
//           paddingRight: '10',
//           paddingBottom: '10'
//       });
//       instance.timeout.and.returnValue((callback: any, timer: number) => setTimeout(callback, timer));

//       instance.resize = of({});
//       return instance;
//   }
// }

// import {mockApp, mockConfig, mockDeepLinkConfig, mockDeepLinker, mockNavController, mockPlatform, mockView } from "ionic-angular/util/mock-providers";

// const IONIC_PROVIDERS = [
//                           // App,
//                           App, Form,
//                           // Keyboard,
//                           { provide: Keyboard, useFactory: () => VVSKeyboardMock.instance() },
//                           DomController, MenuController,
//                           // NavController,

//                           { provide: Platform, useClass: PlatformMock },

//                           // { provide: Platform, useFactory: () => VVSPlatformMock.instance() },
//                           // { provide: Platform, useFactory: () => VVSPlatformMock.instance() },
//                           // { provide: Config, useFactory: () => IM.ConfigMock.instance()},

//                           // { provide: DeepLinker, useFactory: () => IM.ConfigMock.instance()},

//                           // { provide: Storage, useFactory: () => IM.StorageMock.instance() },
//                           { provide: NavController, useValue: mockNavController() }, // useFactory: () => IM.NavControllerMock.instance() },
//                           // { provide: NavParams, useFactory: () => IM.NavParamsMock.instance() },

//                           // { provide: DeepLinker, useValue: mockDeepLinker(AppLinks) }, // DeepLinkerMock.instance() },

//                           { provide: ActionSheetController, useFactory: () => IM.ActionSheetControllerMock.instance() },
//                           { provide: ToastController, useFactory: () => IM.ToastControllerMock.instance() },
//                           { provide: PopoverController, useFactory: () => IM.PopoverControllerMock.instance() },
//                           { provide: LoadingController, useFactory: () => IM.LoadingControllerMock.instance() },
//                           { provide: AlertController, useFactory: () => IM.AlertControllerMock.instance() },
//                           // { provide: Menu, useFactory: () => IM.MenuMock.instance() },
//                           // { provide: MenuController, useFactory: () => VVSMenuControllerMock.instance() },
//                           { provide: ModalController, useFactory: () => IM.ModalControllerMock.instance() },
//                           { provide: ViewController, useValue: mockView() },
//                           { provide: NavParams, useClass: NavParamsMock }

//                           // { provide: ViewController, useFactory: () => IM.ViewControllerMock.instance() },
//                           // { provide: ComponentFactoryResolver, useFactory: () => ComponentFactoryResolverMock.instance() }
//                       ];
// // }

// import * as MOCKS from "../../providers/app.providers.mock";

// import { VVSApp } from "../../providers/vvs-controller/vvs-controller";


// import { IonicImageLoader } from 'ionic-image-loader';
// // import { HttpClientModule } from "@angular/common/http";
// import { isEmpty, isNil } from 'lodash';
// import { of } from 'rxjs';
// import { SearchablePopover } from '../../popovers/searchable-popover/searchable-popover';
// import { CardNotesPhotosView } from '../../components/card-notes-photos-map-view/card-notes-photos-map-view';
// import { IonCardPayOptions } from '../../components/ion-card-pay-options/ion-card-pay-options';
// import { RecentActivityExpanded } from '../../popovers/recent-activity-expanded/recent-activity-expanded';


// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// export const PROVIDERS = [
//   HttpClientTestingModule,
//   ...MOCKS.getProviders(),
//   ...IONIC_PROVIDERS
// ];

// export const DEFAULT_ENTRY_COMPONENT = [TicketItemOptions, HomePage, SelectSearchComponent];

// export const ENTRY_COMPONENTS_SET = {
//     set: {
//         entryComponents: [...DEFAULT_ENTRY_COMPONENT]
//     }
// };

// export const DEFAULT_IMPORTS = [
//                                 HttpClientTestingModule,
//                                 IonicStorageModule.forRoot(),
//                                 IonicImageLoader.forRoot(),
//                                 ElasticModule,
//                                 // TextMaskModule
//                              ];

// export function GET_IMPORTS(comp: any) {
//     return [
//         IonicModule.forRoot(comp, {}),
//         ...DEFAULT_IMPORTS
//     ];
// }

// // export const $BrowserDynamicTestingModule = BrowserDynamicTestingModule;

// // tslint:disable-next-line:max-line-length
// export function CONFIGURE_TESTBEST<T>(
//             $declarations?: any[],
//             navParams?: { key: any, value: any},
//             useDefaultEntryComponent = true
//         ): Promise<{
//             vvsApp: VVSApp,
//             fixture: ComponentFixture<T | any>,
//             component: any,
//             httpMock: HttpTestingController
//         }> {

//     ENV.environment = "unittesting";

//     if (navParams) {
//         NavParamsMock.setParams(navParams.key, navParams.value);
//     }

//     if(isNil($declarations)) {
//         $declarations = all_declarations;
//     }


//     useDefaultEntryComponent && $declarations.push(...DEFAULT_ENTRY_COMPONENT);
//     TestBed.configureTestingModule({
//       declarations: $declarations,
//       imports: GET_IMPORTS($declarations[0]),
//       providers: PROVIDERS,
//       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
//     });

//     TestBed.overrideModule(BrowserDynamicTestingModule, ENTRY_COMPONENTS_SET);

//     TestBed.compileComponents();

//     const vvsApp: VVSApp = TestBed.get(VVSApp);
//     const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
//     let fixture: ComponentFixture<any>;

//     if(!isEmpty($declarations)) {
//         fixture = TestBed.createComponent($declarations[0]);
//         fixture.detectChanges();
//     }

//     vvsApp.lss.storageMap = {};

//     return Promise.resolve({
//             vvsApp,
//             fixture,
//             component: fixture.debugElement.componentInstance,
//             httpMock
//         });
// }

// // describe('AppComponent Component  >>  ', () => {
// //     // let fixture;
// //     let fixture: ComponentFixture<AppComponent>;
// //     let component: AppComponent;
// //     let vvsApp: VVSApp;

// //     beforeEach(async(() => {
// //         CONFIGURE_TESTBEST(AppComponent, TestBed, [AppComponent])
// //         .then( (data: any) => {
// //             fixture = data.fixture;
// //             vvsApp = data.vvsApp;
// //             component = data.component;
// //         });
// //     }));

// //     // beforeEach(
// //     //     inject([VVSApp],
// //     //            ($vvsApp: VVSApp) => {

// //     //         fixture = TestBed.createComponent(AppComponent);
// //     //         component = fixture.componentInstance;
// //     //         vvsApp = $vvsApp;

// //     //     })
// //     // );


// //     it('should be created', (done) => {
// //         // logger.debug(Platform.is('android'));
// //         expect(component instanceof AppComponent).toBe(true);


// //         done();
// //     });
// //     //
// //     // LocalStorageServiceSpec.runLocalStorageServiceSpec(true);
// //     // CompleteTicketViewSpec.runCompleteTicketViewSpec(true);


// // });
