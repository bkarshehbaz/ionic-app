console.log("** Webpack Development Config ************************************")
// tslint:disable
// Set the `ENV` global variable to be used in the app.
var path = require('path');

// const aliases = require("./alias.config");
// console.log("aliases", typeof aliases, aliases);

var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;
// const config = require('@ionic/app-scripts/config/webpack.config.js');
const config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));

require('./set-env').call();
require("./use-mocks").call();
require("./fix-lodash-is-empty");
require("./fix-jasmine");

require("./clean-www-ios-platform")();

require("./fix-ably-d");
require("./fix-ionic-image-loader");

// require("./debug-view-not-found");
require("./uncaught-image-loader");

module.exports = function () {
	// config.dev.resolve.alias = aliases;

	const isNative = require("./is-native")();
	console.log("webpack.dev.config.js", "isNative", isNative);

    return isNative ? require("./webpack.config.js")() : config;
};
