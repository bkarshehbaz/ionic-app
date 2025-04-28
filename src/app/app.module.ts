import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

/**
 * modules
 */
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicModule, Platform } from "ionic-angular";
import { IonicImageLoader } from "../lib/ionic-image-loader/src/image-loader.module";
import { AppConfig } from "./app.config";
/**
 * modules close
 */

import { providers } from "../providers/index";
// import * as PROVIDERS from "./app.providers.mock";

import { TokenInterceptor } from "../providers/http-service/token.interceptor";
import { ErrorHandlerInterceptor } from "../providers/http-service/error-handler.interceptor";
// import { ResponseInterceptor } from "../providers/http-service/response-interceptor";
// import { IonicImageCacheModule } from 'ionic3-image-cache';
import { WebView } from '@ionic-native/ionic-webview/ngx';

// const providers = PROVIDERS.getProviders();

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        IonicStorageModule.forRoot(),
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(
			AppComponent,
			AppConfig,
			// AppLinks
		),
		IonicImageLoader.forRoot(),
		// IonicImageCacheModule.forRoot()

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AppComponent,
        // ...AppPages
    ],
    providers: [
		...providers,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true
		},
		WebView,
		// {
		// 	provide: APP_INITIALIZER,
		// 	  useFactory: (platform: Platform) => async () => {
		// 		const ready = await platform.ready();
		// 		// debugger;
		// 		return !!ready;
		// 	  },
		// 	  deps: [ Platform ],
		// 	  multi: true,
		// },
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class AppModule { }
