const run = require("../tasks/run");

module.exports = () => {
	console.log("clean-www-ios-platform.js")
	try {
		run("pwd");
	} catch(e) {}
	// run('rm -rf "./www"');
	// try { run('rm -rf "./platforms/ios/build/emulator/VVS DO.app/www"'); } catch(e) {}
	// try { run('rm -rf "./platforms/ios/www"'); } catch(e) {}
};
