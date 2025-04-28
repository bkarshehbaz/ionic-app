import { toString, trim } from "lodash";

export const toStringTrim = (v: string|number) => trim(toString(v));
