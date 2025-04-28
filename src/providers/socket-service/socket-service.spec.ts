// import { HttpTestingController } from '@angular/common/http/testing';
// import { ComponentFixture } from '@angular/core/testing';
// import { AppComponent } from '../../app/app.component';
// import { VVSApp } from '../vvs-controller/vvs-controller';
// import { CONFIGURE_TESTBEST } from '../vvs-controller/vvs-controller.util.spec';
// import { SocketService } from './socket-service';

// import { ENV } from '../../environments';
// import { Logger } from "../vvs-controller/util/logger";
// const logger = Logger.get("SocketServiceSpec");

// describe("Socket Service", () => {

//     // let manateeInitSpy;
// 	let vvsApp: VVSApp;
// 	let socketService: SocketService;
// 	let socket;
//     let data: {
//         vvsApp: VVSApp;
//         fixture: ComponentFixture<any>;
//         component: any;
//         httpMock: HttpTestingController;
//     };

//     beforeEach( (done: DoneFn) => {
//         // manateeInitSpy = spyOn(ManateeService.prototype, "init");

//         CONFIGURE_TESTBEST([])
//             .then( (_data) => {
//                 data = _data;
// 				vvsApp = data.vvsApp;
// 				socketService = data.vvsApp.socketService;

//                 data.fixture.detectChanges();

//                 done();
//             });
// 	});

// 	afterEach( () => {
// 		if (socket) {
// 			socket.disconnect();
// 		}
// 	});

//     it("ready should have been called", () => {
// 		expect(socketService).toBeDefined();
// 	});

// 	it("should connect", (done: DoneFn) => {
// 		logger.info(socketService);

// 		// Arrange
// 		vvsApp.apiHost = ENV.env.dev;

// 		// Act
// 		socketService.connect();
// 		socket = socketService.socket;

// 		// Assert
//         socket.on("connect", function() {
// 			expect(true).toBe(true);
// 			logger.i("arguments", arguments);
// 			done();
// 		});

// 		socket.on('error', (error) => {
// 			done.fail(error);
// 		});

// 	});

// });
