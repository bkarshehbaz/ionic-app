"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsNode = require("ts-node");
var serverAddress = "http://localhost:4723/wd/hub";
// const testFilePAtterns: Array<string> = [
//   '**/*/*.e2e-spec.ts'
// ];
var iPhoneXCapability = {
    browserName: "",
    autoWebview: true,
    autoWebviewTimeout: 20000,
    app: "/Users/lucasdev/Project001/platforms/ios/build/emulator/VVS DO.app",
    version: "12.1",
    platform: "iOS",
    // "browserName": "iPhone 8",
    deviceName: "iPhone 8 Plus",
    platformName: "iOS",
    name: "My First Mobile Test",
    automationName: "XCUITest",
    nativeWebTap: true,
    udid: "69B9E010-A029-4994-8246-AD80BAC7C691" // ./ios_simulator_cli.sh my_simulator getuid
};
// const androidPixel2XLCapability = {
//   browserName: '',
//   autoWebview: true,
//   autoWebviewTimeout: 20000,
//   platformName: 'Android',
//   deviceName: 'pixel2xl',
//   app: '/Users/${user}/ordina/e2e/superApp/platforms/android/build/outputs/apk/android-debug.apk',
//   'app-package': 'be.ryan.superApp',
//   'app-activity': 'MainActivity',
//   autoAcceptAlerts: 'true',
//   autoGrantPermissions: 'true',
//   newCommandTimeout: 300000
// };
exports.config = {
    allScriptsTimeout: 11000,
    //   specs: testFilePAtterns,
    baseUrl: "",
    multiCapabilities: [
        // androidPixel2XLCapability,
        iPhoneXCapability
    ],
    /**
     * Cucumber
     * set to "custom" instead of cucumber.
     */
    // framework: 'jasmine',
    framework: "custom",
    // path relative to the current config file
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    // require feature files
    specs: [
        "./features/**/*.feature" // accepts a glob
    ],
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        // format: "json:./reports/json/cucumber_report.json",
        // require step definitions
        require: [
            "./stepdefinitions/**/*.steps.ts" // accepts a glob
        ]
    },
    /**
     * Cucumber closes
     */
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    seleniumAddress: serverAddress,
    onPrepare: function () {
        tsNode.register({
            project: "e2e/tsconfig.json"
        });
    }
};
//# sourceMappingURL=protractor.config.js.map