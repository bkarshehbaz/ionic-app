import { Logger } from "../util/logger";
// import { VVSApp } from "../vvs-controller";
import { Subject } from 'rxjs';
import { VVSApp } from "../vvs-controller";

export type ILoadingObserver = Subject<{ show: boolean, content?: string }>;

const logger = Logger.get("loading");

export const _presentLoading = (
	me: VVSApp,
	observer: ILoadingObserver,
	content: string = "",
	duration: number = 1000,
	dismissOnPageChange: boolean = true,
	// tslint:disable-next-line: ban-types
	cb?: Function
) => { // tslint:disable-line:ban-types

	// logger.info("_presentLoading", this);

	observer.next({ show: true, content });

	return new Promise( (resolve, reject) => {
		setTimeout( () => {
			// tslint:disable-next-line: no-console
			// console.log("this.loading", this);
			// tslint:disable-next-line: no-debugger
			// debugger;
			resolve(me.dismissLoading);
		}, duration);
	});
};

export const _presentLoadingInfinite = (observer: ILoadingObserver, content: string = "") => {
	logger.info("_presentLoadingInfinite");

	observer && observer.next({ show: true, content });

	return Promise.resolve();
};

export const _dismissLoading = (observer: ILoadingObserver) => {
	observer && observer.next({ show: false });

	return Promise.resolve();
};
