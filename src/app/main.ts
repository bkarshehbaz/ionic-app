import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ENV } from '../environments';
import { Logger } from "../providers/vvs-controller/util/logger";
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';


// setTimeout( () => {
// 	const body = <HTMLDivElement> document.body;
// 	const script = document.createElement('script');
// 	script.innerHTML = '';
// 	// debugger;
// 	console.log("ENV.tk", ENV.tk)
// 	script.src = 'https://secure.safewebservices.com/token/Collect.js';
// 	script.setAttribute('data-tokenization-key', ENV.tk);
// 	// script.setAttribute('data-instruction-text', "Enter Card Information");

// 	script.async = true;
// 	script.defer = false;
// 	body.appendChild(script);
// })



if (ENV.ENABLE_PROD_LOGGER) {
	Logger.setProductionMode();
	enableProdMode();
} else if (ENV.ENABLE_DEBUG_MODE) {
	Logger.setDebuggerMode();
}

// const a = makeParamDecorator.prototype;

// makeParamDecorator.prototype = function() {
// 	debugger;

// 	return a.apply(this, arguments)
// }

platformBrowserDynamic()
.bootstrapModule(AppModule).then();
// .catch(console.error); // tslint:disable-line:no-console
