import { ErrorHandler, Provider } from "@angular/core";
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';

import { Camera } from "@ionic-native/camera/ngx";
import { Device } from "@ionic-native/device/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { VVSApp } from "../providers/vvs-controller/vvs-controller";

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CardIO } from "@ionic-native/card-io/ngx";

import { IonicErrorHandler } from "ionic-angular";
import { VVSErrorHandler } from "../services/error-handler/error-handler";

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CameraMock } from '../mocks/camera-mock/camera.mock';
import { TapticEngineMock } from "../mocks/taptic-engine-mock/taptic-engine.mock";

import { ActionSheet } from '@ionic-native/action-sheet/ngx';
import { DeviceMock } from "../mocks/device-mock/device.mock";

import { Dialogs } from '@ionic-native/dialogs/ngx';
// import { ImageLoader, ImageLoaderConfig } from "ionic-image-loader";
import { BrowserImageLoader } from "../mocks/image-loader/image-loader.provider.mock";
// import { VvsControllerProviderMock } from "../mocks/vvs-controller-mock/vvs-controller.mock";
import { VVSImageLoaderConfig } from "./vvs-image-loader/vvs-image-config";
import { KeyboardMock } from "../mocks/keyboard-mock/keyboard.mock";
// import { Stripe } from "@ionic-native/stripe/ngx";
// import { StripeMock } from "../mocks/stripe-mock/stripe.mock";
// import { rollbarFactory, RollbarService } from "./app.providers";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ImageLoader, ImageLoaderConfig } from "../lib/ionic-image-loader/src";

export const providers: Provider[] = [
    VVSApp,
    // { provide: VVSApp, useClass: VvsControllerProviderMock },
    { provide: ErrorHandler, useClass: VVSErrorHandler } as Provider,
    // IonicErrorHandler,
    { provide: ErrorHandler, useClass: IonicErrorHandler } as Provider,
    // { provide: RollbarService, useFactory: rollbarFactory },
    { provide: Camera, useClass: CameraMock } as Provider,
    Geolocation,
    // Keyboard,
    { provide: Keyboard, useClass: KeyboardMock },
    { provide: Device, useClass: DeviceMock } as Provider,
    StatusBar,
    SplashScreen,
    CardIO,
    // Stripe,
    OneSignal,
    {
        provide: TapticEngine,
        useFactory: TapticEngineMock
    },
    ActionSheet,
    Dialogs,
    {
        provide: ImageLoader,
        useClass: BrowserImageLoader
    },
    {
        provide: ImageLoaderConfig,
        useClass: VVSImageLoaderConfig
    },
    BarcodeScanner,
    // { provide: Stripe, useClass: StripeMock },
];

// const head = document.getElementsByTagName('head')[0];
// const script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = "https://js.stripe.com/v3/";
// head.appendChild(script);
