import { browser, by, WebElement } from 'protractor';

import { e2eUtil } from "../../util/util.e2e-class";
import { expect } from "../../../config/helpers/chai-imports";

class AlertUtil {

    getAlert() {
        return browser.findElement(by.css('ion-alert'));
    }

    getAlertTitle() {
        return browser.findElement(by.css("ion-alert .alert-title")).getText();
    }

    shoulbBeDisplayed(value:boolean,done: DoneFn) {

        this.getAlert()
            .isDisplayed()
            .then( (result:boolean) => {
                 expect(result).toBe(value, "result: " + result + " is not value: " + value);
                 done();
            })
            .catch( (reason) => e2eUtil.expectToNotBeFound(reason, done) );

        browser.sleep(500);
    }

    alertShouldHaveThisTitle(value:WebElement, prepend:string, append:string, done:DoneFn) {

        Promise.all<any>([
                  this.getAlertTitle(),
                  value.getText()
               ])
               .then( (values:string[]) => {
                    const alertTitle = values[0];
                    const vTitle = values[1];

                    expect(alertTitle).toEqual(prepend + vTitle + append);

                    done();
               })
               .catch( reason => done.fail(reason));

    }

    clickOkayButton(done:DoneFn) {
        this.getOkayButton()
            .then( (okayButton:WebElement) => {
                e2eUtil.clickElement(okayButton, done);
            })
            .catch( reason => done.fail(reason) );
    }

    clickCancelButton(done:DoneFn) {
        this.getCancelButton()
            .then( (cancelButton:WebElement) => {
                e2eUtil.clickElement(cancelButton, done);
            })
            .catch( reason => done.fail(reason) );
    }

    getAlertButtons() {
        return browser.findElements(by.css('button.alert-button')).catch(reason => console.log(reason));
    }

    getOkayButton() {
        return this.getAlertButtons()
            .then( (alertButtons:WebElement[]) => {
                const cancelButton   = alertButtons[0];
                const okayButton     = alertButtons[1];

                return okayButton;
            });
    }

    getOkayButtonText() {
        return this.getOkayButton().then( text => text.getText() );
    }

    getCancelButtonText() {
        return this.getCancelButton().then( text => text.getText() );
    }

    getCancelButton() {
        return this.getAlertButtons()
            .then( (alertButtons:WebElement[]) => {
                const cancelButton:WebElement = alertButtons[0];
                const okButton    :WebElement = alertButtons[1];

                return cancelButton;

            });
    }

}
export const alertUtil = new AlertUtil();
