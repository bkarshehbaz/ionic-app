const fs = require("fs");

const filePath = "./node_modules/@types/jasmine/index.d.ts";
// const filePath = "./config/lang.d.ts";

let lang = fs.readFileSync(filePath, "utf8");

// let replace = /isEmpty\(value\?: any\): boolean;/g;
let replace = "type SpyObjMethodNames<T = undefined> = T extends undefined ? (ReadonlyArray<string> | {[methodName: string]: any}) : (ReadonlyArray<keyof T> | {[P in keyof T]?: ReturnType<T[P] extends (...args: any[]) => any ? T[P] : any>});";
let replaceWith = "type SpyObjMethodNames<T = undefined> = any;";
lang = lang.replace(replace, replaceWith);
fs.writeFileSync(filePath, lang, "utf8")

replace = "[k in keyof T]: T[k] extends Function ? T[k] & Spy : T[k];";
replaceWith = "[k in keyof T]: any; // T[k] extends Function ? T[k] & Spy : T[k];";
lang = lang.replace(replace, replaceWith);
fs.writeFileSync(filePath, lang, "utf8")

console.log("Done!")
