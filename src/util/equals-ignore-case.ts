import { lowerCase, includes } from "lodash";
import { toStringTrim } from "./to-string-trim";

export const equalsIgnoreCase = (x, y) => lowerCase(toStringTrim(x)) === lowerCase(toStringTrim(y));
export const includesIgnoreCase = (x, y) => includes( lowerCase(toStringTrim(x)), lowerCase(toStringTrim(y)) );
