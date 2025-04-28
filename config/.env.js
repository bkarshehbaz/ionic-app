// module.exports = {
// 	uat: "https://do-uat.api.vvsadmin.com",
// 	qa: "https://do-qa.api.vvsadmin.com",
// 	dev: "https://do-dev.api.vvsadmin.com",
// 	prod: "https://vvsapi-prod.us-east-1.elasticbeanstalk.com",
// 	// uat: "https://vvsapi-uat.us-east-1.elasticbeanstalk.com",
// 	dev5: "https://vvsapi-dev5.us-east-1.elasticbeanstalk.com",
// 	docker: "https://vvsapi-docker.us-east-1.elasticbeanstalk.com",
// 	local: "/api"// `${getIPAddress()}:3000`
// };

// function getIPAddress() {
//     var interfaces = require('os').networkInterfaces();
//     for (var devName in interfaces) {
//       var iface = interfaces[devName];

//       for (var i = 0; i < iface.length; i++) {
//         var alias = iface[i];
//         if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
// 					console.log("getIPAddress", alias.address);
// 					return alias.address;
// 				}
//       }
//     }

//     return '127.0.0.1';
// }
