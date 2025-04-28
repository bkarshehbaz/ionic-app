import { forEach, toString } from 'lodash';
import { Logger } from './providers/vvs-controller/util/logger';
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// tslint:disable
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { TranslateModule, TranslateService }                          from '@ngx-translate/core';
import {
  App,
  Config,
  DeepLinker,
  Form,
  IonicModule,
  Keyboard,
  DomController,
  MenuController,
  NavController,
  Platform,
} from 'ionic-angular';
import { ConfigMock, PlatformMock } from 'ionic-mocks';

let i = 0;
console.log("************* " + ++i + " **************");
// import { ClickersServiceMock }      from './services/clickers.mock';
// import { ClickersService }          from './services';
// import { TranslateServiceMock }     from './services/translate.mock';
// import { TranslatePipeMock }        from './pipes/translate.pipe.mock';
// tslint:enable

// const consoleInfo = console.log;
// console.log = function(args) {
//   // arguments.toString().substr(0, 100);
//   forEach(args, (arg, i) => {
//     args[i] = toString(args[i]).substring(0, 100);
//   });
//   consoleInfo.apply(console, args); // tslint:disable-line
// };
// const origLevel = $Logger.level;
// $Logger.level = function() {

//   // tslint:disable-next-line:no-console
//   console.log(arguments);
//   // return origLevel.apply(this, ""); // tslint:disable-line:no-invalid-this
//   return origLevel.apply(this, arguments); // tslint:disable-line:no-invalid-this
// };

// const logger = Logger.get("test.ts");
// logger.i("Hi, my name is Lucas!");

declare const require: any;

// tslint:disable-next-line:no-var-requires
const reg: string = "";// = require("./test.params");

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// let reg = require("./test.params"); // tslint:disable-line
// console.log({reg}); // tslint:disable-line

let _reg;


if (reg.length > 0 && reg.indexOf("test.ts") === -1 && reg.indexOf("index") === -1) {
  _reg = reg; // /\.spec\.ts$/;
  _reg.replace(".spec", "").replace(".ts", ".spec.ts");
}
// console.log("_reg", _reg.toString()); // tslint:disable-line

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
console.log({ _reg }); // tslint:disable-line

const useAll = false;
if (_reg && !useAll) {
  context.keys = () => {
	return ["/Users/lucasdev/Project001/src/pages/chat/chat.spec.ts"];
  };
}
// /Users/lucasdev/Project001/src/pages/ticket-view/complete-ticket.view.spec.ts
// And load the modules.
context.keys().map(context);


// export class TestUtils {

//   public static beforeEachCompiler(components: []): Promise<{fixture, instance}> {
//     return TestUtils.configureIonicTestingModule(components)
//       .compileComponents().then(() => {
//         const fixture = TestBed.createComponent(components[0]);
//         return {
//           fixture: fixture, // tslint:disable-line:object-literal-shorthand
//           instance: fixture.debugElement.componentInstance,
//         };
//       });
//   }

//   public static configureIonicTestingModule(components[]): typeof TestBed {
//     return TestBed.configureTestingModule({
//       declarations: [
//         ...components,
//         TranslatePipeMock,
//       ],
//       providers: [
//         App, Form, Keyboard, DomController, MenuController, NavController,
//         {provide: Platform, useFactory: () => PlatformMock.instance()},
//         {provide: Config, useFactory: () => ConfigMock.instance()},
//         {provide: DeepLinker, useFactory: () => ConfigMock.instance()},
//         {provide: ClickersService, useClass: ClickersServiceMock},
//         {provide: TranslateService, useClass: TranslateServiceMock},
//       ],
//       imports: [
//         FormsModule,
//         IonicModule,
//         ReactiveFormsModule,
//         TranslateModule,
//       ],
//     });
//   }

//   // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
//   public static eventFire(el, etype: string): void {
//     if (el.fireEvent) {
//       el.fireEvent('on' + etype);
//     } else {
//       const evObj = document.createEvent('Events');
//       evObj.initEvent(etype, true, false);
//       el.dispatchEvent(evObj);
//     }
//   }
// }
