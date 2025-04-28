import { WebElement } from 'protractor';

import { e2eUtil} from "../../util/util.e2e-class";

import { alertUtil } from "../../components/alert/alert.e2e-class";

const baseQuery = "modal-footer .footer-modal-buttons";
class ModalFooter {

    runCancelSpec() {
        describe("ModalFooterSpec", () => {

            it("Click Cancel Button", (done:DoneFn) => {
                this.clickCancelButton(done);
            });

            it("Alert should be displayed", (done:DoneFn) => {
                alertUtil.shoulbBeDisplayed(true, done);
            });

            it("Alert click negative button", (done:DoneFn) => {
                alertUtil.clickCancelButton(done);
            });

            it("Alert should be displayed", (done:DoneFn) => {
                alertUtil.shoulbBeDisplayed(false, done);
            });

        });
    }

    runSubmitSpec() {
        describe("ModalFooterSpec", () => {

            it("Click Submit Button", (done:DoneFn) => {
                this.clickSubmitButton(done);
            });

            it("Alert should be displayed", (done:DoneFn) => {
                alertUtil.shoulbBeDisplayed(true, done);
            });

            it("Alert click negative button", (done:DoneFn) => {
                alertUtil.clickCancelButton(done);
            });

            it("Alert should be displayed", (done:DoneFn) => {
                alertUtil.shoulbBeDisplayed(false, done);
            });


        });
    }

    getSubmitButton() {
        return e2eUtil.getElement(baseQuery + " .submit-button")
                      .then( (cancelButton:WebElement) => {
                          return cancelButton;
                      })
                      .catch(console.error);
    }

    getCancelButton() {
        return e2eUtil.getElement(baseQuery + " .cancel-button")
                      .then( (submitButton:WebElement) => {
                          return submitButton;
                      })
                      .catch(console.error);
    }

    clickSubmitButton(done:DoneFn) {
        this.getSubmitButton()
            .then( (submitButton:WebElement) => {
                e2eUtil.clickElement(submitButton, done);
            })
            .catch(console.error);
    }

    clickCancelButton(done:DoneFn) {
        this.getSubmitButton()
            .then( (submitButton:WebElement) => {
                e2eUtil.clickElement(submitButton, done);
            })
            .catch(console.error);
    }
}

export const modalFooter = new ModalFooter();
