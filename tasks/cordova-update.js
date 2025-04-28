const { execSync } = require("child_process");
const plugins = require("../package.json").cordovaPlugins

console.log(plugins);

plugins.forEach( plugin => {
    let id, locator;
    if (typeof plugin === "string") {
        id = plugin;
    } else {
        id = plugin.id;
        locator = plugin.locator;
    }

    // run(`ionic cordova plugin remove ${locator || id} --save`);
    run(`cordova plugin add ${locator || id} --save --force`);
});


function run(command) {
    console.warn(`Running command: ${command}`)
    execSync(
        command, 
        {
            stdio: [
                process.stdin,
                process.stdout,
                process.stderr
            ]
        }
    )
}