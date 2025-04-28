import { WebElement } from 'protractor';

import { e2eUtil } from "../../util/util.e2e-class";

class NextButtonUtil {

    clickNextButton() {
        describe("Click Next Button", () => {
            it("Click next", (done:DoneFn) => {

                e2eUtil.getElement("#mst-next")
                       .then( (nextButton:WebElement) => {
                           e2eUtil.clickElement(nextButton, done);
                       });

            });
        });
    }

}
export const nextButtonUtil = new NextButtonUtil();
