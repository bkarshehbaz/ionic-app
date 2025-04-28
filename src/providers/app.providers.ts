import { ErrorHandler, Provider, InjectionToken } from "@angular/core";
// import * as Rollbar from 'rollbar';

import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { VVSApp } from "../providers/vvs-controller/vvs-controller";

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CardIO } from "@ionic-native/card-io/ngx";

// import { IonicErrorHandler } from "ionic-angular";
import { VVSErrorHandler } from "../services/error-handler/error-handler";

import { ActionSheet } from '@ionic-native/action-sheet/ngx';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import { IonicErrorHandler } from "ionic-angular";
// import { ImageLoader, ImageLoaderConfig } from "ionic-image-loader";
import { VVSImageLoader } from "./vvs-image-loader/vvs-image-loader";

import { HTTP } from '@ionic-native/http/ngx';
import { HttpNativeClient } from "./vvs-image-loader/http-native";
import { VVSImageLoaderConfig } from "./vvs-image-loader/vvs-image-config";
import { ENV } from "../environments";
// import { Stripe } from "@ionic-native/stripe/ngx";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ImageLoader, ImageLoaderConfig } from "../lib/ionic-image-loader/src";

// export function getProviders(): Provider[] {
export const providers: Provider[] = [
	VVSApp,
	// ErrorHandler,
	{ provide: ErrorHandler, useClass: VVSErrorHandler } as Provider,
	// { provide: RollbarService, useFactory: rollbarFactory },
	// { provide: ErrorHandler, useClass: IonicErrorHandler } as Provider,
	Geolocation,
	Camera,
	Keyboard,
	Device,
	StatusBar,
	SplashScreen,
	CardIO,
	// Stripe,
	OneSignal,
	TapticEngine,
	ActionSheet,
	Dialogs,
	HTTP,
	HttpNativeClient,
	BarcodeScanner,
	// VVSImageLoader,
	{
		provide: ImageLoaderConfig,
		useClass: VVSImageLoaderConfig
	}
];

if (ENV.isIOS) {
	providers.push({
		provide: ImageLoader,
		useClass: VVSImageLoader
	});
} else {
	providers.push(ImageLoader);
}

// 	return providers;
// }
