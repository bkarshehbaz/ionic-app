// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
//  "notes":"https://chriztalk.com/ionic-2-font-awesome/",

const path = require("path");
var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;
let config = require(path.join(appScriptsDir, 'config', 'copy.config.js'));

require("./use-mocks").call(null, false);

config = {
	...{},
	...config,
	...{
		copyFontAwesomeCSS: {
			src: '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css',
			dest: '{{WWW}}/assets/css/'
		},
		copyFontAwesome: {
		  src: '{{ROOT}}/node_modules/font-awesome/fonts/**/*',
		  dest: '{{WWW}}/assets/fonts/'
		},
		copyMakeIconsCss: {
			src: '{{ROOT}}/node_modules/car-makes-icons/dist/style.css',
			dest: '{{WWW}}/assets/css/'
		},
		copyMakeIconsFonts: {
			src: '{{ROOT}}/node_modules/car-makes-icons/dist/fonts/**/*',
			dest: '{{WWW}}/assets/css/fonts/'
		},
		copyIconMoon: {
		  src: '{{ROOT}}/src/fonts/**/*',
		  dest: '{{WWW}}/assets/fonts/'
		},
	}
}

console.log("config", config)

module.exports = config;

// module.exports = {
//   copyAssets: {
//     src: ['{{SRC}}/assets/**/*'],
//     dest: '{{WWW}}/assets'
//   },
//   copyIndexContent: {
//     src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
//     dest: '{{WWW}}'
//   },
//   copyFonts: {
//     src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
//     dest: '{{WWW}}/assets/fonts'
//   },
//   copyPolyfills: {
//     src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
//     dest: '{{BUILD}}'
//   },
//   copySwToolbox: {
//     src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
//     dest: '{{BUILD}}'
//   },
//   copyFontAwesomeCSS: {
//       src: '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css',
//       dest: '{{WWW}}/assets/css/'
//   },
//   copyFontAwesome: {
//     src: '{{ROOT}}/node_modules/font-awesome/fonts/**/*',
//     dest: '{{WWW}}/assets/fonts/'
//   },
//   copyIconMoon: {
//     src: '{{ROOT}}/src/fonts/**/*',
//     dest: '{{WWW}}/assets/fonts/'
//   }
// }
