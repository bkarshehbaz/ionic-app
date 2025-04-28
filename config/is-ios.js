const { includes } = require("lodash");

module.exports = () => {
	const isIOS = includes(process.argv, "ios");

	console.log("process.argv", process.argv);
	console.log("isIOS", isIOS);

	return isIOS;
}
