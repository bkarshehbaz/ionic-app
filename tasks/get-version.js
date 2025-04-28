const getWidget = require("./get-widget");


module.exports = () => {
	return getWidget().attributes.version;
}
