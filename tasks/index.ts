import chalk from "chalk";

// import * as fsExtra from "fs-extra";

// tslint:disable-next-line:no-var-requires
const argv = require("yargs").argv;
// tslint:disable-next-line:no-var-requires
const path = require("path");

import * as childProcess from "child_process";
const execSync = childProcess.execSync;

const runCmd = (cmd: string) => {
  // tslint:disable-next-line:no-console
  console.info(chalk.dim(`\n$ ${cmd}`));
  execSync(cmd, { stdio: "inherit" });
};

// import * as puppeteer from "puppeteer";
// puppeteer.

const tasks: {[key: string]: (...arg: any[]) => any} = {

	fix: () => {
		const platformPath = `${path.join(__dirname, "../platforms")}/*`;
		// tslint:disable-next-line:no-console
		console.log({platformPath});
		runCmd(`chown lucasdev ${platformPath}`);
		runCmd(`chmod 777 ${platformPath}`);
		runCmd(`cd /Users/lucasdev/Project001/platforms/ios/VVS\ DO`);
		runCmd(`cd /Users/lucasdev/Documents/VVSDO/Project001/platforms/ios/VVS\ DO`);
		
	},

	ios: () => {
		tasks.fix();
		// tasks.openXcode();
		tasks.runIos();
	},
	buildIOS: () => {
		runCmd(`ionic cordova build ios -- --developmentTeam="Nahom Tsadu (Personal Team)"`);
	},
	openXcode: () => {
		runCmd(`open -a Xcode`);
	},

	runIos: () => {
		runCmd(`npm run ios -l -- --target="iPhone-SE, 11.3"`);
	},

	updateHeaders: () => {
		const testFolder = './tests/';
		const fs = require('fs');

		fs.readdirSync(testFolder).forEach(file => {
			// tslint:disable-next-line:no-console
			console.log(file);
		});
	},

	updateTestParam: () => {
		let currentSpec = argv["spec"] || argv.spec;

		if (currentSpec && currentSpec.split("/src")[1]) {

			// tslint:disable-next-line:no-console
			console.log({currentSpec});
			currentSpec = "./" + currentSpec.split("/src/")[1];
			// tslint:disable-next-line:no-console
			console.log({currentSpec});
			// currentSpec = currentSpec.replace(".spec", "");
			
			// export const reg: RegExp = /\.spec\.ts/;

			// const reg = new RegExp(``)
			// /\.spec.ts$/
			require("fs").writeFileSync("/Users/lucasdev/Project001/src/test.params.js", `module.exports = "${currentSpec}";
`);// = /${currentSpec}\\.spec\\.ts$/;

			// tslint:disable-next-line:no-console
			// console.log({currentSpec});
			// runCmd(`echo '${currentSpec.replace()}'`);
	
		}
		process.exit();
	}



};

const taskName = argv.task || argv["task"] || argv.name || argv["name"] || undefined;
const task = tasks[taskName];
// tslint:disable-next-line:no-console
console.log({taskName});

if (!task) {
  throw Error(chalk.black.bgRed(`\n\n  Task "${taskName}" is not defined\n`));
}

task();
