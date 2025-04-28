let defaultConfig = require('@ionic/app-scripts/config/uglifyjs.config');

module.exports = Object.assign({}, defaultConfig, {
	compress: Object.assign({}, defaultConfig.compress, {
		drop_console: true,
		drop_debugger: true
	})
});