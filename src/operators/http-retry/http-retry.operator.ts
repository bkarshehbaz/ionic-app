import { of, throwError } from 'rxjs';
import { retryWhen, delay, flatMap, take, concat } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { Logger } from '../../providers/vvs-controller/util/logger';

const logger = Logger.get("httpRetry");

const ignoreCodes = [401];

export const httpRetry = function(data = {} as { takeCount: number, interval: number, intervalRate: number, customIgnoreCodes?: number[] }) {
	data.customIgnoreCodes = data.customIgnoreCodes || [];

	return retryWhen(errors => errors.pipe(
        flatMap((flatError: any) => {

			// debugger;
            if(flatError.error != false && ![...ignoreCodes, ...data.customIgnoreCodes].includes(flatError.status)) {
				logger.info("retrying", data.interval, data.intervalRate);
                return of(
					flatError.status
				)
				.pipe(
					delay(
						// tslint:disable-next-line: radix
						Number.parseInt( (data.interval *= 1.33) as any)
					)
				);
			}

			return throwError(flatError);
			// return throwError({error: 'No retry'});

        }),
		take(data.takeCount),
		// concat(throwError(errors))
		// concat(throwError({error: 'Sorry, there was an error (after 5 retries)'}))
    ));
};
