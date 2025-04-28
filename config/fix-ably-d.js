// const fs = require("fs");

// const filePath = "./node_modules/ably/browser/static/ably.d.ts";
// // const filePath = "./config/lang.d.ts";

// let lang = fs.readFileSync(filePath, "utf8");

// let replace = /release: \(name: string\) => void;/g;
// let replaceWith = "release: (name: string)  =>  void;\n\t\tall: {[key: string]: T}; // Channels<T>;";
// lang = lang.replace(replace, replaceWith);
// fs.writeFileSync(filePath, lang, "utf8")
// console.log("Done!")

