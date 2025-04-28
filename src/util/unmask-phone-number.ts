import { toStringTrim } from './index';

export const unmaskPhoneNumber = (pN) => toStringTrim(pN).slice(0, 14).replace(/\D+/g, "");
