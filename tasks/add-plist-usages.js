const fs = require("fs");
const { parseString } = require('xml2js');
const writeXML = require('./write-xml');

module.exports = function addPListUsages(keyValues) {
	keyValues = keyValues || [];

	const data = fs.readFileSync("./config.xml", "utf-8");
	parseString(data, function(err, result){
        if(err) {
			console.error(chalk.redBright(err));
			process.exit(1);
		}
        // here we log the results of our xml string conversion
		// console.log("result.widget", result.widget.platform[0]["edit-config"][0]);

		// console.log(JSON.stringify(result.widget.platform[0]["edit-config"], null, 3))
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

		writeXML("./config.xml.tmp", result)
    });
}
