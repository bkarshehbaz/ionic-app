// Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');


__karma__.loaded = function () {};

// var appContext = require.context('../src', true, /\.spec\.ts/);
// console.error("******appContext >> **********", appContext);
// console.error("******appContext >> **********", appContext.keys());



// require('../src/util/lib.spec.ts');
// require('../src/pages/login-page/login-page.spec.ts');
// require('../src/pages/login-page/select-search-component/select-search-component.spec');
// require('../src/providers/local-storage-service/local-storage-service.spec');
// // require('../src/app/app.component.spec.ts');
// // require('../src/pages/chat-component/chat-component.spec.ts');
// // require('../src/pages/chat-component/chat-component.spec.ts');
//
// require('../src/pages/logs-page/logs-page.spec.ts');//TODO stuck in this
//
// require('../src/pages/login-page/sign-out.spec.ts');


var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

// First, initialize the Angular testing environment.
testing.getTestBed().initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);

var appContext = require.context('../src', true, /\.spec\.ts/);

appContext.keys().map(appContext);


// Finally, start Karma to run the tests.
__karma__.start();

// testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
