"use strict";

const chalk = require('chalk')
const { isEmpty, includes, map, forEach } = require("lodash");
const { parseString, Builder } = require('xml2js');
const fs = require("fs");
const run = require("./run");

// https://documentation.onesignal.com/docs/troubleshooting-cordova-variants
run("sudo ls ")

if (fs.existsSync("./platforms") || fs.existsSync("./plugins")) {
	run("cordova platform remove ios")
	run("rm -rf platforms/ plugins/")
}

removePluginsFromPackageJSON();
removePluginsFromConfigXML();

run("cordova platform add ios@6.2.0")
// run("ionic cordova platform add ios@6.2.0")
// run("ionic cordova ionic cordova plugin add onesignal-cordova-plugin@2.11.1")

// https://github.com/OneSignal/OneSignal-Cordova-SDK/issues/641
run("sudo gem install cocoapods")
run("pod repo update")


try {
	run("cordova plugin rm onesignal-cordova-plugin")
} catch(e) {
	console.error(e)
}

const CAMERA_USAGE_DESCRIPTION = "Users(employees) will used the camera plugin to take photos of cars. Also, the camera plugin is used by the Barcode Scanner Plugin";
const GEOLOCATION_USAGE_DESCRIPTION = "The geolocation plugin is used to save the location of cars parked by the employees.";


addPListUsages({
	NSCameraUsageDescription: CAMERA_USAGE_DESCRIPTION,
	CAMERA_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION,
	NSPhotoLibraryUsageDescription: CAMERA_USAGE_DESCRIPTION,
	PHOTOLIBRARY_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION,
	NSLocationAlwaysUsageDescription: GEOLOCATION_USAGE_DESCRIPTION,
	GEOLOCATION_USAGE_DESCRIPTION: GEOLOCATION_USAGE_DESCRIPTION,
	NSLocationWhenInUseUsageDescription: GEOLOCATION_USAGE_DESCRIPTION
})

const plugins = [
	// {
	// 	plugin: "cordova-plugin-stripe"
	// },
	// required for ionic-image-loader
	{
		plugin: "cordova-plugin-file"
	},
	{
		plugin: "cordova-plugin-advanced-http",
	},

	// camera
	{
		plugin: "cordova-plugin-camera",
		variables: {
			NSCameraUsageDescription: CAMERA_USAGE_DESCRIPTION,
			CAMERA_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION,
			NSPhotoLibraryUsageDescription: CAMERA_USAGE_DESCRIPTION,
			PHOTOLIBRARY_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION
		}
	},

	// onesignal
	{
		plugin: "onesignal-cordova-plugin@2.11.1",
		variables: {
			OneSignal_APPID: "33df26a3-d331-4647-a326-ea14b52d7818"
		}
	},

	// statusbar
	{
		plugin: "cordova-plugin-statusbar"
	},

	// splashscreen
	{
		plugin: "cordova-plugin-splashscreen"
	},

	// // CarDIO
	// {
	// 	plugin: "card.io.cordova.mobilesdk",
	// 	variables: {
	// 		NSCameraUsageDescription: "To scan credit cards.",
	// 		CAMERA_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION
	// 	}
	// },

	// // Manatee
	// {
	// 	plugin: "https://github.com/manateeworks/phonegap-manateeworks-v3.git",
	// 	variables: {
	// 		CAMERA_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION,
	// 	}
	// },

	{
		// npm install --save @ionic-native/barcode-scanner@4
		plugin: "phonegap-plugin-barcodescanner",
		variables: {
			NSCameraUsageDescription: CAMERA_USAGE_DESCRIPTION,
			CAMERA_USAGE_DESCRIPTION: CAMERA_USAGE_DESCRIPTION,
		}
	},

	// Device UUID and Info
	{
		plugin: "cordova-plugin-device"
	},

	// tap vibrations
	{
		plugin: "cordova-plugin-taptic-engine"
	},

	// Geolocation
	{
		plugin: "cordova-plugin-geolocation",
		variables: {
			NSLocationAlwaysUsageDescription: GEOLOCATION_USAGE_DESCRIPTION,
			GEOLOCATION_USAGE_DESCRIPTION: GEOLOCATION_USAGE_DESCRIPTION,
			NSLocationWhenInUseUsageDescription: GEOLOCATION_USAGE_DESCRIPTION
		}
	},

	// Ionic Keyboard
	{
		plugin: "cordova-plugin-ionic-keyboard",
	},

	// WebView https://github.com/ionic-team/cordova-plugin-ionic-webview#installation-instructions
	{
		plugin: "cordova-plugin-ionic-webview",
	},

	// Ionic Cordova Pro
	{
		plugin: "cordova-plugin-ionic",
		variables: {
			CHANNEL_NAME: "Production",
			APP_ID: "98b39b76",
			ID: "98b39b76",
			UPDATE_METHOD: "none"
		}
	},


	// Native Action Sheet
	{
		plugin: "cordova-plugin-actionsheet",
	},

	// SQLite
	{
		plugin: "cordova-sqlite-storage",
	},

	{
		plugin: "cordova-plugin-whitelist"
	}


]

plugins.map( ({ plugin, variables }) => {
	variables = variables || [];
	run(`cordova plugin add ${plugin} ${
		map(variables, (varValue, varKey) =>
			"--variable " + varKey + "=" + '"' + varValue + '"'
		)
		.join(" ")
		} --save`
	)
})
// --variable CAMERA_USAGE_DESCRIPTION="${CAMERA_USAGE_DESCRIPTION}"


function removePluginsFromPackageJSON() {
	const packageJSON = require("../package.json");

	forEach(packageJSON.dependencies, (value, key) => {
		if (includes(key, "cordova-plugin-")) {
			delete packageJSON.dependencies[key];
		}
	})
	delete packageJSON.dependencies["onesignal-cordova-plugin"]
	delete packageJSON.dependencies["manateeworks-barcodescanner-v3"]
	delete packageJSON.cordova;

	fs.writeFileSync("./package.json", JSON.stringify(packageJSON, null, 4), "utf-8");
	console.log(chalk.greenBright("Done removePluginsFromPackageJSON!"))
}

function addPListUsages(keyValues) {
	const data = fs.readFileSync("./config.xml", "utf-8");
	parseString(data, function(err, result){
        if(err) {
			console.error(chalk.redBright(err));
			process.exit(1);
		}
        // here we log the results of our xml string conversion
		// console.log("result.widget", result.widget.platform[0]["edit-config"][0]);

		// console.log(JSON.stringify(result.widget.platform[0]["edit-config"], null, 3))
		// result.widget.platform[0]["config-file"] = [];
		// result.widget.platform[0]["config-file"].push({
		// 	$: {
		// 		file: "*-Info.plist",
		// 		parent: "ITSAppUsesNonExemptEncryption"
		// 	},
		// 	false: [
		// 		""
		// 	]
		// })

		result.widget.platform[0]["edit-config"] = [];

		Object.keys(keyValues).forEach( key => {
			result.widget.platform[0]["edit-config"]
			.push(
				{
					$: {
						file: "*-Info.plist",
						mode: "merge",
						target: key
					},
					string: [
						keyValues[key]
					]
				}
			);
		});

		writeXML("./config.xml", result)
    });
}

function removePluginsFromConfigXML() {
	const data = fs.readFileSync("./config.xml", "utf-8");
	parseString(data, function(err, result){
        if(err) {
			console.error(chalk.redBright(err));
			process.exit(1);
		}
        // here we log the results of our xml string conversion
		console.log("result.widget", Object.keys(result.widget));

		delete result.widget.plugin;

		writeXML("./config.xml", result)
    });

}

function writeXML(path, json) {
	if (isEmpty(json)) {
		throw Error("xml empty")
		process.exit(1);
	}
	// create a new builder object and then convert
	// our json back to xml.
	var builder = new Builder({ renderOpts: { indent: "\t", pretty: true, newline: "\n" } });
	var xml = builder.buildObject(json);

	fs.writeFileSync(path, xml)
	console.log(chalk.greenBright("successfully written our update xml to file"));
}
