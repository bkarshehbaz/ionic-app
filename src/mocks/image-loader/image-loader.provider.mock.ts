// import { ImageLoader, ImageLoaderConfig } from "ionic-image-loader";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { ENV } from "../../environments/index";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File, FileEntry } from '@ionic-native/file/ngx';
import * as c from '../../constants/css-values';
import { includes } from "lodash";
import { TokenInterceptor } from "../../providers/http-service/token.interceptor";
import { AblyService } from "../../providers/ably-service";
import { Observable } from "rxjs";
import { httpRetry } from "../../operators/http-retry/http-retry.operator";
import { ImageLoader, ImageLoaderConfig } from "../../lib/ionic-image-loader/src";

const logger = Logger.get("BrowserImageLoader");

@Injectable()
export class BrowserImageLoader extends ImageLoader {

	// private http; //: HttpClient;
	// private config; //: ImageLoaderConfig;

	constructor(
		private _config: ImageLoaderConfig,
		private _file: File,
		private _http: HttpClient,
		private _platform: Platform,
	) {
		super(_config, _file, _http, _platform);
	}

	// preload(url: string) {
	// 	logger.info("preloading: ", url);
	// 	return super.preload(url);
	// }

	// override
	getImagePath(imageUrl: string): Promise<string> {
		// debugger;
		// logger.info("imageUrl", imageUrl, this._config);
		if (typeof imageUrl !== 'string' || imageUrl.length <= 0) {
			logger.error('The image url provided was empty or invalid.');
			return Promise.reject('The image url provided was empty or invalid.');
		}

		if (includes(imageUrl, c.base64)) {
			return Promise.resolve(imageUrl);
		}

		imageUrl = imageUrl.replace(ENV.VVSPHOTOS_API, "s3");
		// logger.info("imageUrl", imageUrl);

		this._config.httpHeaders.set("Authorization", TokenInterceptor.getToken());

		return new Promise( (resolve, reject) => {
			// if (AblyService.instance.state != "connected") {
			// 	const message = "image-loader.provider.mock - Ably state is failed, so we don't proceed with the request";
			// 	logger.error(AblyService.instance.state, message);
			// 	return Promise.reject(message);
			// 	// return throwError("Ably state is failed, so we don't proceed with the request");
			// }

			return this._http.get(imageUrl, {
				responseType: 'blob',
				headers: this._config.httpHeaders
			})
			.pipe(
				httpRetry({
					takeCount: 3,
					interval: 1000,
					intervalRate: 1.3
				}),
				map( (data: Blob) => {
					// logger.info("imageUrl map", data);
					const objectURL = URL.createObjectURL(data);
					resolve(objectURL);
				}),
				catchError( (error) => {
					// logger.info("imageUrl error", error);
					reject('The image url provided was empty or invalid.');
					return 'The image url provided was empty or invalid.';
				})
			)
			.subscribe();
		});
		// .catch(logger.error);
	}

}
