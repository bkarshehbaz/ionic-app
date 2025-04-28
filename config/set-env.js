const fs = require("fs");
const path = require("path");
var git = require('git-rev-sync');
const chance = require("chance")();
const os = require('os');
const argv = require('yargs').argv;

const vinPostUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/";
const googleMapBaseUrl = "https://maps.googleapis.com/maps/api/staticmap";

const isNative = require("./is-native")();
const buildCommand = process.argv.join(" ");

console.log("set-env.js", "isNative", isNative);
console.log("buildCommand", buildCommand);

console.log("CI_GIT_REF", process.env.CI_GIT_REF);

// master, dev, uat, qa
let envKey;

if (process.env.CI_GIT_REF) {
	envKey = process.env.CI_GIT_REF.toLowerCase();
	envKey = envKey == "master" ? "dev" 
		   : envKey == "prod" ? "prod"
		   : envKey;
} else {
	envKey = argv["env"] || argv.env || process.env.env || "prod";
}

console.log({envKey})

if ( !("dev,uat,qa,prod,local".split(",").includes(envKey)) ) {
	console.log(new Error(`Invalid env ${envKey}`));
	process.exit(1);
}

const CHANNEL_MAP = {
	dev: "Master",
	qa: "Qa",
	uat: "Uat",
	prod: "Production",
	local: "Local",
}

const cJS = {
	prod: {
	  	tk: 'MuQhe9-75r89Q-d3e6ce-t5X6hB',
		tkM: 'Q35kNs-j39Sjx-r5gFkQ-KfQWdK'
	},
	nonProd: {
	  	tk: '2quxuW-eJ2k3m-GAHCF4-e78ttc'
	},
}

const { tk, tkM } = envKey != 'prod' ? cJS.nonProd : cJS.prod;

module.exports = () => {

	fs.writeFileSync(
		path.join(__dirname + "/../src/environments/index.ts"),
		`// Generated ${new Date()} by VVS webpack.config.js

export const ENV = {

	tk: "${tk}",
	tkM: "${tkM}",

	BASE_ENDPOINT: "${envKey == 'local' ? 'http://localhost:3000' : 'https://vvsdo.api.vvsadmin.com'}",

	// getEnv: () => ENV.CURRENT_ENV || ENV.DEFAULT_ENV,
	// setEnv: (env) => ENV.CURRENT_ENV = env,
	CURRENT_ENV: "${envKey}",
	// DEFAULT_ENV: "prod",
	ENVS: [
		"prod",
		"dev",
		"uat",
		"qa",
	],
	CURRENT_CHANNEL: "${CHANNEL_MAP[envKey]}",
	CHANNELS: [
		"Production",
		"Master",
		"Qa",
		"Uat"
	],

	isIOS: ${require("./is-ios")()},
	isAndroid: ${require("./is-android")()},

	IONIC_APP_ID: "f2d6a04b",

	buildTimestamp: "${new Date()}",
	buildCommand: "${buildCommand}",
	iosBuildVersion: "${require("../tasks/get-version")()}",
	isNative: ${isNative},
	DEV_MODE_USERNAME: "${(chance.first()[0] + chance.last()).toLowerCase()}",
	DEV_MODE_PASSWORD: "${chance.ssn({ dashes: false })}",
	VIN_API: "${isNative ? vinPostUrl : "/DecodeVINValuesBatch/"}",
	environment: "${envKey}",
	production: ${envKey == "prod"},
	timeout: 4800,

	VVSPHOTOS_API: "https://vvsphotos.api.vvsadmin.com",
	// S3_HOST: "https://s3-us-west-2.amazonaws.com",
	// S3_BUCKET: "vvsphotos",

	ROLLBAR_ACCESS_TOKEN: "90b44744e3a14ab7a9980f2e75f91227",

	X_API_KEY: "my_public_key",

	MANATEE_IOS_KEY: "YF7Pw7S26L758dW/vVGQvfm/jKWNks1QDwbEYaCXaAE=",

	ENABLE_PROD_LOGGER: ${ process.env.ENABLE_PROD_LOGGER == 'false' ? false : true },
	MINIFY_STORAGE_KEYS: ${ process.env.MINIFY_STORAGE_KEYS == 'false' ? false : true },
	ENABLE_DEBUG_MODE: ${ process.env.ENABLE_DEBUG_MODE == 'false' ? false : true },

	GOOGLE_MAP_STATIC_API_BASE_URL: "${isNative ? googleMapBaseUrl : "/google_staticmap"}",
	GOOGLE_MAP_STATIC_API_KEY: "AIzaSyA6Kp0hqX1C_3F2oJewtr_zzi2_k8DB9iI",

	OPEN_ALPR_URL: "${isNative ? "https://api.openalpr.com" : "/openalpr"}",

	IONIC_ENV: "${process.env.IONIC_ENV}",
	CURR_ENV: "${process.env.CURR_ENV}",
	VVS_ENV: "${envKey}",
	IONIC_SOURCE_MAP_TYPE: "${process.env.IONIC_SOURCE_MAP_TYPE}",
	IONIC_GENERATE_SOURCE_MAP: "${process.env.IONIC_GENERATE_SOURCE_MAP}",
	git: {
		short: "",
		tag: ""
	},
	ionicInfo: ${require("./ionic-info")()}
};
`,
		'utf8'
	);
};
module.exports()
