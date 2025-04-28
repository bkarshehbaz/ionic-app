const tsconfig = require("../tsconfig.json");
const path = require("path");
const paths = tsconfig.compilerOptions.paths;

const aliases = {};

Object.keys(paths).forEach( (key) => {
	const toResolve = `./src/${paths[key][0].replace("/*", "/")}`;
	console.log("toResolve", toResolve);
	aliases[key.replace("/*", "")] = path.resolve(toResolve);
});

console.log("*** ALIASES ************************************");
console.log(aliases);

module.exports = aliases;
