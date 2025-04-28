// // temporary fix: https://github.com/zyra/ionic-image-loader/issues/230
// // Error: Uncaught (in promise) when throws http error #230

// const fs = require("fs");

// const filePath = "./node_modules/ionic-image-loader/dist/providers/image-loader.js";
// // const filePath = "./config/lang.d.ts";

// let lang = fs.readFileSync(filePath, "utf8").split("\n");

// console.log(lang[400].trim() == "reject(e);");

// const _398 = "// Could not get image via httpClient";
// const _399 = "error(e);";
// const _400 = "reject(e);";
// const _401 = "});";
// const _402 = "});";

// const __398 = lang[398].trim();
// const __399 = lang[399].trim();
// const __400 = lang[400].trim();
// const __401 = lang[401].trim();
// const __402 = lang[402].trim();


// if (
// 	_398 == __398 && _399 == __399 && _400 == __400
// 	&& _401 == __401) {
// 	console.log(":)", __402);

// 	if (__402 == "}).catch((e) => this.throwError(e));") {
// 		console.log("Already done!");
// 	} else {
// 		if (__402 == "});") {
// 			lang[402] = "\t\t\t\t\t}).catch((e) => this.throwError(e));"
// 			console.log("Overridden");
// 		}
// 	}
// }

// // if (lang[400]) {

// // }
// // console.log(lang.split("\n")[402])


// // let replace = /isEmpty\(value\?: any\): boolean;/g;
// // let replaceWith = "isEmpty(value?: object|any[]|string): boolean;";
// // lang = lang.replace(replace, replaceWith);
// fs.writeFileSync(filePath, lang.join("\n"), "utf8")
// console.log("Done!")
