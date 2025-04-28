import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File } from '@ionic-native/file/ngx';

import * as c from '../../constants/css-values';
import { includes } from "lodash";
import { HttpNativeClient } from "./http-native";
import { ImageLoader, ImageLoaderConfig } from "../../lib/ionic-image-loader/src";
// import { VVSApp } from "../vvs-controller/vvs-controller";

@Injectable()
export class VVSImageLoader extends ImageLoader {

	constructor(
		private _config: ImageLoaderConfig,
		private _file: File,
		private _http: HttpNativeClient,
		private _platform: Platform,
	) {
		super(_config, _file, _http, _platform);
	}

	getImagePath(imageUrl: string): Promise<string> {
		if (includes(imageUrl, c.base64) || includes(imageUrl, c.base64_2)) {
			return Promise.resolve(imageUrl);
		}
		return super.getImagePath(imageUrl);
	}
}
