import { 
	Camera,
	DestinationType,
	MediaType,
	EncodingType,
	Direction,
	CameraOptions 
} from "@ionic-native/camera/ngx";
import * as c from '../../constants/css-values';
import { Logger } from "../vvs-controller/util/logger";
import { isEmpty } from "lodash";

const logger = Logger.get("CameraService");

interface ICameraServiceOptions extends CameraOptions {
	defaultDimensions: boolean;
// 	targetWidth: number;
// 	targetHeight: number;
}

export class CameraService {

	public static setCamera(camera: Camera) {
		CameraService.camera = camera;
	}

	public static takePicture(options = {} as ICameraServiceOptions) {

		let dimension = 640;

		if (options.defaultDimensions == true) {
			dimension = undefined;
		}

		return CameraService.camera
		.getPicture({
			// quality: options.quality,
			destinationType: DestinationType.DATA_URL,
			mediaType: MediaType.PICTURE,
			encodingType: EncodingType.JPEG,
            targetWidth: dimension,
            targetHeight: dimension,
            correctOrientation: true,
            cameraDirection: Direction.BACK
		})
		.then( (imageData) => {
			if (isEmpty(imageData)) {
				return Promise.reject("Cancel camera");
			}
			return imageData;
		})
		.then( (imageData) => c.base64 + imageData )
		.catch( error => {
			alert(error.message ? error.message : error);
			throw error;
		});
		// .then( (imageData) => prefixBase64 ? (c.base64 + imageData) : imageData );
	}

	private static camera: Camera;

}
