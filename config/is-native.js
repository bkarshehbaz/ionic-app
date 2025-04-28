const { includes } = require("lodash");

module.exports = () => {
	return includes(process.argv, "cordova") || includes(process.argv, "ios") || process.env.isNative == "true";
}
