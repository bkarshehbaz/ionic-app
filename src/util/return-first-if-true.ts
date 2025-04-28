import { checkValue } from "./index";

export const returnFirstIfTrue = (f: any, s: any) => checkValue(f) ? f : s;
