const { writeFileSync } = require("fs");

module.exports = (val) => {
	const isNative = require("./is-native")();

	console.log("use-mocks.js", "isNative", isNative);

	isNative
	?
	writeFileSync(
		'./src/providers/index.ts',
		'export { providers } from "./app.providers";\n',
		"utf8"
	)
	:
	writeFileSync(
		'./src/providers/index.ts',
		'export { providers } from "./app.providers.mock";\n',
		"utf8"
	)
}
