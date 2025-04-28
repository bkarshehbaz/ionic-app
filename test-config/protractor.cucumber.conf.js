// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
// var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// var browser = require('protractor');
// console.log("browser")
// console.log(browser)

const jsonReports = process.cwd() + "/reports/json";

const Reporter = require("../e2e/support/reporter");

const { argv } = require("yargs");
// '--window-size=300,600'

exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: getFeatureFiles(),
  cucumberOpts: {
    compiler: ['ts:ts-node/register'],
    require: ['../e2e/features/**/*.e2e-spec.ts', '../e2e/support/*.js'],
    strict: true,         // <boolean> fail if there are any undefined or pending steps
    format: 'json:./reports/json/cucumber_report.json',
    dryRun: false,        // <boolean> invoke every formatter without executing steps
    tags: ["~@ignore"],   // <string[]> (expression) only execute the features or scenarios with tags matching the expression
  },
  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.json'
    });
    browser.manage().window().maximize();

    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);

    Reporter.createDirectory(jsonReports);
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  },
  allScriptsTimeout: 60000,
  disableChecks: true,
  seleniumServerStartTimeout: 60000,
  ignoreUncaughtExceptions: true,
  afterLaunch: () => {
    console.log(`afterLaunch`);
  },
  // capabilities: { // iPhone
  //     browserName: '',
  //     chromeOptions: {
  //         args:[
  //             'incognito',
  //             'disable-extensions',
  //             '--window-size=300,700'
  //         ]
  //     }
  // },
  // baseUrl: '',
  capabilities: { // Browser
    browserName: 'chrome',
    chromeOptions: {
      args: [
        'incognito',
        '--window-position=0,0',
        'disable-extensions',
        '--window-size=300,700'
      ]
    }
  },
  baseUrl: 'http://localhost:8100/',
  directConnect: true,
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

    // require('connect')().use(require('serve-static')('www')).listen(8100);
  },
  plugins: [{
    package: 'protractor-console-plugin',
    failOnWarning: false,
    failOnError: true,
    logWarnings: true,
    exclude: []
  }],
//   onPrepare: function () {
//     jasmine.getEnv().addReporter(new SpecReporter({
//       spec: {
//         displayStacktrace: true
//       }
//     }));
//     // browser.manage().timeouts().setScriptTimeout(60000);
//   }
};


function getFeatureFiles() {
  const featureArgs = argv.features || process.env['features'];
  if (featureArgs && featureArgs.trim().length > 0) {
    console.log('... loading feature file by parameters. features=' + featureArgs);
    return featureArgs.split(',').map(feature => `${process.cwd()}/e2e/features/step_features/${feature}.feature`);
  } else {
    console.log(`... loading All feature files.`);
    return [`${process.cwd()}/e2e/features/step_features/*.feature`];
  }
}
