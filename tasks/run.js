const chalk = require('chalk');
const { execSync } = require("child_process");

module.exports = function run(command) {
    console.warn(chalk.greenBright(`Running command: `) + chalk.cyanBright(command));
	execSync(
        command,
        {
            stdio: [
                process.stdin,
                process.stdout,
                process.stderr,
            ]
        }
    )
}
