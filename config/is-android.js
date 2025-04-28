const { includes } = require("lodash");

module.exports = () => {
	const isAndroid = includes(process.argv, "android");

	console.log("process.argv", process.argv);
	console.log("isAndroid", isAndroid);

	return isAndroid;
}
