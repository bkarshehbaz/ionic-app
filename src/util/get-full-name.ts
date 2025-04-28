import { isEmpty, toString, memoize } from "lodash";
import { IUser } from "../lib/vvs-bridge";

import { Logger } from '../providers/vvs-controller/util/logger';

const logger = Logger.get("get-full-name");

export const getFullName = memoize(function(user = {} as IUser): string {
    logger.assert(isEmpty(user), "user must not be empty", {user});
    return toString(user.userFirstName) + " " + toString(user.userLastName);
});
