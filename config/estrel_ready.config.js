// console.log("** Webpack Production Config ************************************")

process.env.isNative = "true";
process.env.IONIC_ENV = "prod";
process.env.CURR_ENV = "prod";
process.env.ENABLE_PROD_LOGGER = "true";
process.env.IONIC_AOT_WRITE_TO_DISK = "true";
process.env.MINIFY_STORAGE_KEYS = "true";
process.env.ENABLE_DEBUG_MODE = "false";
process.env.IONIC_GENERATE_SOURCE_MAP = "false";
process.env.env = "prod";
process.env.NODE_ENV="production"
// tslint:disable
// Set the `ENV` global variable to be used in the app.
// var path = require('path');

// const aliases = require("./alias.config");
// console.log("aliases", typeof aliases, aliases);

// const appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;
// console.log({ appScriptsDir })
// const config = appScriptsDir ? require(path.join(appScriptsDir, 'config', 'webpack.config.js')) : undefined;

require('./set-env').call();
require("./use-mocks").call(null, false);

require("./clean-www-ios-platform")();

require("./fix-ably-d");
require("./fix-ionic-image-loader");

require("./uncaught-image-loader");

// var fs_extra_1 = require("fs-extra");

// const writeFileSync = fs_extra_1.writeFileSync;

// fs_extra_1.writeFileSync.prototype = function(path, data, options) {
// 	console.log(`writeFileSync(${path},?,?)`)
// 	return writeFileSync.apply(this, [path, data, options]);
// }

// module.exports = !config ? {} : function (){

// 	const isNative = require("./is-native")();
// 	console.log("webpack.config.js", "isNative", isNative);

//     const removeMockLoader = {
// 		exclude: [
// 			/\.mock.ts$/
// 		],
// 		loader: process.env.IONIC_WEBPACK_LOADER,
// 		test: /\.ts$/
// 	};
// 	// console
// 	config.prod.module.loaders.push(removeMockLoader);
// 	// config.prod.resolve.alias = aliases;

//     return config;
// };

const run = require("../tasks/run");


run('mv ./node_modules/@ionic/app-scripts/dist/postprocess.js ./node_modules/@ionic/app-scripts/dist/postprocess.js_tmp')
run('cp ./config/replace_post_process.js ./node_modules/@ionic/app-scripts/dist/postprocess.js')
run('cat ./node_modules/@ionic/app-scripts/dist/postprocess.js')
