import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { Injectable } from "@angular/core";

// import { from } from "rxjs/observable/from";
import { Observable, from, throwError } from "rxjs";
import { HTTP, HTTPResponse } from "@ionic-native/http/ngx";
import { TokenInterceptor } from "../http-service/token.interceptor";
// import { of } from "rxjs";
import { includes } from "lodash";
import { ENV } from "../../environments";
import { AblyService } from "../ably-service";

const logger = Logger.get("HttpNativeClient");

@Injectable()
export class HttpNativeClient extends HttpClient {

	constructor(private httpHandler: HttpHandler, private http: HTTP) {
		super(httpHandler);
	}

	get(url: string, options: any): Observable<any> {
		const headers = {} as any;

		if (includes(url, ENV.VVSPHOTOS_API) || includes(url, "s3/")) {
			headers.Authorization = TokenInterceptor.getToken();
		}

		// if (AblyService.instance.state != "connected") {
		// 	return throwError("http:native - Ably state is failed, so we don't proceed with the request");
		// }

		return from(
			this.http.get(url, {}, headers)
			// .catch( error => {
			// 	return throwError(error);
			// })
		)
		.pipe(
			tap( x => logger.info("line 45", typeof x, x) ),
			map(
				(res: HTTPResponse) => {
					if (!res || res.error) {
						res = res || {} as HTTPResponse;
						return throwError(res.error);
					} else {
						let i, l, d, array;
						d = res.data;
						l = d.length;
						array = new Uint8Array(l);
						for (i = 0; i < l; i++) {
							array[i] = d.charCodeAt(i);
						}
						const b = new Blob([array], { type: 'application/octet-stream' });

						// logger.info("line 61", typeof b, b);

						return b;
						// return new Blob([res.data, "base64"], { type: "application/octet-stream" });
						// return (await (await window.fetch(res.data)).blob());
					}
				}
			),
			// tap( x => logger.info("line 69", typeof x, x) ),
			// catchError( x => {
			// 	logger.error("line 71", x);
			// 	return throwError(x);
			// })
		);
	}

}
