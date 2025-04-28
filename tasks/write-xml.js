const { parseString, Builder } = require('xml2js');
const chalk = require('chalk')
const { isEmpty } = require("lodash");
const fs = require("fs");

module.exports = function writeXML(path, json) {
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
