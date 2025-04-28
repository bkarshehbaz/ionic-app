var parseArgs = require('minimist');
var argv = parseArgs(process.argv);

// const fsExtra = require("fs-extra");

let newSpec = argv["spec"] || argv.spec;

if ( newSpec.indexOf("test") === -1 && newSpec.indexOf("index") === -1 ) {
    
}

let currentSpec = require("../src/test.params");
console.log({newSpec, currentSpec, argv});
if (newSpec && newSpec.split("/src")[1]) {
    newSpec = "./" + newSpec.split("/src/")[1];
    console.log({newSpec});

    if (newSpec !== currentSpec) {
        require("fs").writeFileSync("/Users/lucasdev/Project001/src/test.params.js", 
        `module.exports = "${newSpec}"
`);
    }

}

const childProcess = require("child_process");
const execSync = childProcess.execSync;

const runCmd = (cmd) => {
  // tslint:disable-next-line:no-console
  console.info(chalk.dim(`\n$ ${cmd}`));
  execSync(cmd, { stdio: "inherit" });
};

const portUtil = require("tcp-port-used");
portUtil.check(9876, '127.0.0.1')
        .then( 
            (isUse) => {
                console.log("Port " + port + " usage " + isUse);
                process.exit();
            }, 
            (error) => {
                portUtil.waitUntilFree(9876, 500, 4000)
                        .then(
                            () => {
                                runCmd("npm test");
                                process.exit();
                            },
                            (error) => {
                                process.exit();
                            }
                        )
            }
        );

        

