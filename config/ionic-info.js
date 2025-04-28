const { execSync } = require("child_process");
const { groupBy, forEach, map } = require("lodash");
const chalk = require('chalk');

function run(command, cb) {
    console.warn(`Running command: ${command}`)
    return execSync(command, { encoding: 'utf8' });
}


const splitInfo = (ary) => ary
.map((item) => {
	return [
		`${item.key}${item.flair ? ' ' + '(' + item.flair + ')' : ''}`,
		item.value + (item.path ? `(${item.path})` : '')
	].join(": ")
});

let val;
module.exports = () => {
	if (val) {
		return val;
	}
	let data;
	try {
		data = JSON.parse(run("ionic info --json"));
	} catch (err) {
		console.warn("Skipping ionic info (CLI not found)");
		data = [];
	}
	// const data = run("ionic info");
	// return data || "";

	// console.log("data", typeof data, JSON.stringify( groupBy(data, "group"), null, 3 ) );
	const groups = groupBy(data, "group");
	forEach(groups, (val, key) => {
		groups[key] = splitInfo(val);
	})
	return val = JSON.stringify(groups, null, 3);
};
