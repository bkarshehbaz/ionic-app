// import * as mocha from "mocha";
import { checkValue } from "../index";

describe("Check value", () => {

    it("Basic", () => {

        expect(checkValue(undefined, "not Undefined")).toBe(false);
        
    });

});
