// import { combineLatest } from "rxjs/observable/combineLatest";
// // import * as sK from '../../constants/storage-keys';
// import { Logger } from "../vvs-controller/util/logger";
// import { VVSApp } from '../vvs-controller/vvs-controller';
// // import { LocalStorageService } from './local-storage-service';
// import { CONFIGURE_TESTBEST } from '../vvs-controller/vvs-controller.util.spec';

// const logger = Logger.get("LocalStorageServiceSpec");

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// describe("LocalStorageService", () => {

//     // let vvsApp: VVSApp;
//     let lss: LocalStorageService;

//     beforeEach( (done: DoneFn) => {
//         CONFIGURE_TESTBEST([])
//             .then( (data) => {
//                 lss = new LocalStorageService(data.vvsApp);
//                 done();
//             });
//     });


//     it("ready should return error", (done: DoneFn) => {

//         combineLatest(lss.loadMakes(), lss.loadModels())
//         .subscribe(
//             () => done.fail(),
//             () => done()
//         );

//     });

//     it("_get", (done: DoneFn) => {

//         // // arrange
//         // const customerPromise = lss._get(sK.Customer);

//         // // act
//         // customerPromise
//         // .then( (data) => {
//         //     expect(data).toBeFalsy();
//         // })
//         // .catch(logger.e);

//     });

// });
