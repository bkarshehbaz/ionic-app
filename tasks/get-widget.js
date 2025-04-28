const fs = require("fs");
const convert = require('xml-js');
const { find } = require("lodash");

module.exports = () => {

	const widget = fs.readFileSync("./config.xml", "utf-8") // .split("\n")[1];
	const cordovaWidget = find( convert.xml2js(widget).elements, x => x.name == "widget")

    return cordovaWidget;

}
