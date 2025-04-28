import { licenseCodes } from "../constants/constants";
import { ILicenseID } from "../lib/vvs-bridge";

export const removeByIndex = (str,index) => {
    return str.slice(0,index) + str.slice(index+1);
}

export const parseLicense = (_code = "") => {
    return _code.split("\n").reduce( (prev, curr, ind) => {
        let code = (curr || '').slice(0, 3).trim();

        if (code[2] == '-') {
            code = removeByIndex(code, 2);
        }

        const value = curr.replace(code,'').trim();

        if (licenseCodes[code]) {
            prev[licenseCodes[code]] = prev[licenseCodes[code]] || value;
        }

        return prev;
    }, {} as ILicenseID);
}

