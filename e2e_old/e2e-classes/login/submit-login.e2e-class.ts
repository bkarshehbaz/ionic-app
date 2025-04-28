import { WebElement } from 'protractor';

import { e2eUtil } from "./../util/util.e2e-class";


class SubmitLoginButton {

    run() {

        describe("SubmitLoginButton", () => {

            it("Clicking button", (done:DoneFn) => {
                this.click(done);
            });

        });

    }
    click(done:DoneFn) {

        e2eUtil.getElement("#submitButton")
               .then( (submitButton:WebElement) => {
                   e2eUtil.clickElement(submitButton, done);
               })
               .catch(reason => done.fail(reason));

    }
}
export const submitLoginButton = new SubmitLoginButton();
