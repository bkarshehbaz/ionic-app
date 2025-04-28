import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Inject, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { VVSApp } from "../vvs-controller/vvs-controller";
import { Logger } from "../vvs-controller/util/logger";
import { includes } from "lodash";
import { ENV } from "../../environments/index";
// const enigmaKey = "doctor-enigma";
// const enigmaValue = "eHtZvIGau0wS2VFRj//67SYbmUXxH97v8xE1EjtSDclIQTNwyUm2LObrQsJdpS/9r9Uh5f1+ulL8PjId8UrzHA==";
export const InterceptorSkipTokenHeader = 'X-Skip-Interceptor';
export const InterceptorAuthHeader = 'X-Auth-Interceptor';

// const logger = Logger.get("TokenInterceptor");

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	public static setToken(token: string) {
		TokenInterceptor.token = token;
	}
	public static getToken() {
		return TokenInterceptor.token;
	}
	private static token: string;

	// tslint:disable-next-line: member-ordering
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// logger.info("TokenInterceptor", request.method, request.url, request);

		if (
			includes(request.url, "DecodeVINValuesBatch")
			|| includes(request.url, "staticmap")
			|| includes(request.url, "recognize_vehicle")
		) {
			// tslint:disable-next-line: no-shadowed-variable
			const headers = request.headers.delete("Authorization");
			return next.handle(request.clone({ headers }));
		}

		// if ( (request.url == 'https://api.stripe.com/v1/tokens') ) {
		// 	// debugger;
		// 	return next.handle(request.clone());
		// }


		// add a custom header
		let headers = request.headers
			// .set(enigmaKey, enigmaValue)
			.set("x-api-key", ENV.X_API_KEY)
			.set("Authorization", TokenInterceptor.token || '');

			
		if (ENV.CURRENT_ENV == "local") {
			headers = headers
				.set("CloudFront-Viewer-Country", "US")
				.set("x-api-key", "my_public_key");
		}

		const customReq = request.clone({ headers });

		// pass on the modified request object
		return next.handle(customReq);
	}

}
