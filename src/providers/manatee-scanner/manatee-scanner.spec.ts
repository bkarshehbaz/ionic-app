// import { AppComponent } from '../../app/app.component';
// import { VVSApp } from '../vvs-controller/vvs-controller';
// import {CONFIGURE_TESTBEST} from '../vvs-controller/vvs-controller.util.spec';
// import { ManateeService } from './manatee-scanner';

// describe("Manatee Scanner", () => {

//     let manateeInitSpy;
//     let vvsApp: VVSApp;
//     beforeEach( (done: DoneFn) => {
//         manateeInitSpy = spyOn(ManateeService.prototype, "init");

//         CONFIGURE_TESTBEST([AppComponent])
//             .then( (data) => {
//                 vvsApp = data.vvsApp;
//                 console.log("manateeScanner", vvsApp.manateeScanner); // tslint:disable-line

//                 data.fixture.detectChanges();

//                 done();
//             });
//     });


//     it("ready should have been called", () => {

//         // assert
//         expect(vvsApp.manateeScanner).toBeDefined();
//         expect(manateeInitSpy).toHaveBeenCalled();
//         expect(vvsApp.manateeScanner.scanner).toBeDefined();

//     });

//     it("config", () => {

//         // act
//         vvsApp.manateeScanner.config( (val: boolean) => {
//             // assert
//             expect(val).toBe(true);
//         });

//     });

// });
