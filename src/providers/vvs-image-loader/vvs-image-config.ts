// import { ImageLoaderConfig } from "ionic-image-loader";
import { carplaceholder } from "../../constants/constants";
import { HttpHeaders } from "@angular/common/http";
import { ImageLoaderConfig } from "../../lib/ionic-image-loader/src";

export class VVSImageLoaderConfig extends ImageLoaderConfig {
	spinnerEnabled = false;
	concurrency = 5;
	maxCacheAge = 7 * 24 * 60 * 60 * 1000; // 7 days
	maxCacheSize = 40 * 1024 * 1024; // set max size to 20MB
	fallbackAsPlaceholder = true;
	fallbackUrl = carplaceholder;
	useImg = true;
	imageReturnType: "base64" | "uri" = "base64";
	httpHeaders = new HttpHeaders();
	debugMode = true;
	// cacheDirectoryType: "cache" | "data" = "external" as any;
}
