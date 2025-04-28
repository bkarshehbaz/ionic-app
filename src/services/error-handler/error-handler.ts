import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { RollbarService } from '../rollbar';

export class VVSErrorHandler extends IonicErrorHandler implements ErrorHandler {

	constructor() {
		super();
	}

	handleError(err: any) {
		// const _error = err ? (err.originalError || err) : new Error("UNKNOWN ERROR");
		const _error = err.originalError || err;
		// const error = stringifyMe(_error)
		// super.handleError(_error);
		RollbarService.init("handleError").error(_error);
	}

}
