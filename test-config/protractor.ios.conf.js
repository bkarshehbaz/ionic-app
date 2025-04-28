// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var browser = require('protractor');

// '--window-size=300,600'

exports.config = {
  allScriptsTimeout: 30000,
  specs: [
    '../e2e/specs/*.e2e-spec.ts'
  ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true,
    print: function () {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  plugins: [{
    package: 'protractor-console-plugin',
    failOnWarning: false,
    failOnError: true,
    logWarnings: true,
    exclude: []
  }],
  capabilities: {
    browserName: '',
    'appium-version': '1.7.1',
    platformName: 'iOS',
    platformVersion: '11.2',
    deviceName: 'iPhone 8',
    app: '/Users/user/Documents/code/clicker/platforms/ios/build/emulator/Clicker.app',
    automationName: 'XCUITest',
    autoWebview: true,
    fullReset: true
  },
  baseUrl: '',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));

    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    var defer = protractor.promise.defer();
    browser.ignoreSynchronization = true;
    browser.executeScript('return window.location;').then(function (location) {
      browser.resetUrl = 'file://';
      browser.baseUrl = location.origin + location.pathname;
      defer.fulfill();
    });
    return defer.promise;
  },
  useAllAngular2AppRoots: true
};
