const fs = require("fs");

const filePath = "./node_modules/@types/lodash/common/lang.d.ts";
// const filePath = "./config/lang.d.ts";

let lang = fs.readFileSync(filePath, "utf8");

let replace = /isEmpty\(value\?: any\): boolean;/g;
let replaceWith = "isEmpty(value?: object|any[]|string): boolean;";
lang = lang.replace(replace, replaceWith);
fs.writeFileSync(filePath, lang, "utf8")
console.log("Done!")
