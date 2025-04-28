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
          args:[
              'incognito',
              '--window-position=0,0',
              'disable-extensions',
              '--window-size=300,700'
          ]
      }
  },
  baseUrl: 'http://localhost:8100/',
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000,
      isVerbose: true,
      includeStackTrace: true,
      print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
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
  onPrepare: function() {
      jasmine.getEnv().addReporter(new SpecReporter({ spec : { displayStacktrace: true } }));
      // browser.manage().timeouts().setScriptTimeout(60000);
  }
};
