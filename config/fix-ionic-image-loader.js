// const fs = require("fs");

// const filePaths = [
//     "./node_modules/ionic-image-loader/dist/providers/image-loader.js",
//     "./node_modules/ionic-image-loader/dist/image-loader.module.js",
//     "./node_modules/ionic-image-loader/dist/providers/image-loader.d.ts",
//     "./node_modules/ionic-image-loader/src/image-loader.module.ts",
    
// ];
// // const filePath = "./config/lang.d.ts";

// let replace = "'@ionic-native/file'";
// let replaceWith = "'@ionic-native/file/ngx'";

// for(let filePath of filePaths) {
//     let lang = fs.readFileSync(filePath, "utf8");
//     lang = lang.replace(replace, replaceWith);
//     fs.writeFileSync(filePath, lang, "utf8")
// }

// console.log("Done!")
