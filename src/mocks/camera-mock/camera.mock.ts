import { Camera } from "@ionic-native/camera/ngx";


import { Logger } from "../../providers/vvs-controller/util/logger";
import { sample } from "lodash";
// import { tagPlatePhoto } from "../manatee-scanner-mock/tag.mock";
// import { ManateeScannerMock } from "../manatee-scanner-mock/manatee-scanner.mock";
import { chevyTag } from "./chevy-tag.mock";
const logger = Logger.get("CameraMock");

const colors = [
	"#e6194b",
	"#3cb44b",
	"#ffe119",
	"#4363d8",
	"#f58231",
	"#911eb4",
	"#46f0f0",
	"#f032e6",
	"#bcf60c",
	"#fabebe",
	"#008080",
	"#e6beff",
	"#9a6324",
	"#fffac8",
	"#800000",
	"#aaffc3",
	"#808000",
	"#ffd8b1",
	"#000075",
	"#808080",
	"#ffffff"
];

export class CameraMock extends Camera {

    // getPictureDeprecated(options: any) {
    //     return new Promise((resolve, reject) => {
    //         // this.getRandomBase64("/random-image", (base64) => {
    //         this.getRandomBase64("/400", (base64) => {
    //             // logger.i(base64.substring(0,50));
	// 			// logger.i(base64.replace("data:image/jpeg;base64,", "").substring(0,50));
	// 			let image = base64.replace("data:image/jpeg;base64,", "");
	// 			image = image.replace("data:text/html;base64,", "");
	// 			image = image.replace("data:image/png;base64", "");
    //             resolve(image);
    //         });

    //     });
	// }

	getPicture(options: any) {
		return new Promise((resolve, reject) => {

			var camera = document.createElement("div");
			camera.innerHTML = `

				<div id="cameramock" style="background-image: url(https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios12-iphone-x-camera-switch-camera-callout.jpg);background-size: contain;z-index:99999;position:absolute;top:0;right:0;display:block;width:100vw;height:100vh;background-color:red;">
				<button style="font-size:large;width:calc(50vw - 14px);height:48px;left:8px;bottom:8px;position:absolute;">Cancel</button>
				<button style="font-size:large;width:calc(50vw - 14px);height:48px;right:8px;bottom:8px;position:absolute;">Take</button>
				</div>
			`;
			document.body.appendChild(camera);

			const removeEvents = () => {
				document.querySelector("#cameramock button:nth-child(1)").removeEventListener("click", cancelPhoto);
				document.querySelector("#cameramock button:nth-child(2)").removeEventListener("click", takePhoto);
			}

			document.querySelector("#cameramock button:nth-child(1)") // cancel
			.addEventListener("click", cancelPhoto);
			document.querySelector("#cameramock button:nth-child(2)") // take photo
			.addEventListener("click", takePhoto);

			function cancelPhoto() {
				removeEvents();
				document.querySelector("#cameramock").remove();
				resolve(undefined);
			}

			function takePhoto() {
				removeEvents();

				// if (ManateeScannerMock.lastClickedElementID == "scan-tag") {
				// 	resolve(chevyTag);
				// 	// resolve(tagPlatePhoto);
				// 	document.querySelector("#cameramock").remove();

				// 	return;
				// }

				const srcCanvas = {
					width: 200,
					height: 300
				};

				//create a dummy CANVAS

				const destinationCanvas = document.createElement("canvas");
				destinationCanvas.width = srcCanvas.width;
				destinationCanvas.height = srcCanvas.height;

				const destCtx = destinationCanvas.getContext('2d');

				//create a rectangle with the desired color
				destCtx.fillStyle = sample(colors);
				//"#FFFFFF";
				destCtx.fillRect(0,0, srcCanvas.width,srcCanvas.height);

				// //draw the original canvas onto the destination canvas
				// destCtx.drawImage(srcCanvas, 0, 0);

				// finally use the destinationCanvas.toDataURL() method to get the desired output;
				document.querySelector("#cameramock").remove();
				resolve(destinationCanvas.toDataURL().replace("data:image/png;base64,", ""));
				// resolve(tagPlatePhoto);
			}

		});
	}

    getRandomBase64(url: string, callback: (d: any) => void) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            const reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

}
