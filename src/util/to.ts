import { Logger } from "../providers/vvs-controller/util/logger";

const logger = Logger.get("to");

// to.js
export const to = <T>(promise: Promise<T>): Promise<[T, Error]> =>
	promise.then((data: T) => [data, null]).catch(err => (logger.error(err) as any) || [null, err]);
