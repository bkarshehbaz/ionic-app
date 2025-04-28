"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsNode = require("ts-node");
exports.config = {
    allScriptsTimeout: 11000,
    //   specs: testFilePAtterns,
    baseUrl: "http://localhost:4200/",
    capabilities: {
        // browserName: process.env.PROTRACTOR_BROWSER || "chrome",
        browserName: 'chrome',
        chromeOptions: {
            mobileEmulation: {
                deviceName: 'iPhone 6/7/8 Plus'
            },
            args: ['--window-size=414,736'] // THIS!
        }
    },
    // Only works with Chrome and Firefox
    directConnect: true,
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
            "./steps/**/*.steps.ts" // accepts a glob
        ]
    },
    /**
     * Cucumber closes
     */
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    // seleniumAddress: serverAddress,
    onPrepare: function () {
        tsNode.register({
            project: "e2e/tsconfig.json"
        });
    }
};
//# sourceMappingURL=protractor.browser.config.js.map