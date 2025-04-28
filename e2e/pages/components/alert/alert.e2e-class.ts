import { browser, by, WebElement } from 'protractor';

import { E2EUtil } from "../../../util/util.e2e-class";
import { expect } from "../../../config/helpers/chai-imports";
import { CallbackStepDefinition } from 'cucumber';

export class AlertUtil {

	private static instance: AlertUtil;
	public static get() {
		return AlertUtil.instance || (AlertUtil.instance = new AlertUtil());
	}

    getAlert() {
        return browser.findElement(by.css('ion-alert'));
	}

	async isDisplayed() {
		return await this.getAlert().isDisplayed();
	}

    getAlertTitle() {
        return browser.findElement(by.css("ion-alert .alert-title")).getText();
    }

    shoulbBeDisplayed(value:boolean, done: CallbackStepDefinition) {

        this.isDisplayed()
            .then( (result:boolean) => {
                 expect(result).equal(value, "result: " + result + " is not value: " + value);
                 done();
            })
            .catch( (reason) => E2EUtil.get().expectToNotBeFound(reason, done) );

        browser.sleep(500);
    }

    alertShouldHaveThisTitle(value:WebElement, prepend:string, append:string, done: CallbackStepDefinition) {

        Promise.all<any>([
                  this.getAlertTitle(),
                  value.getText()
               ])
               .then( (values:string[]) => {
                    const alertTitle = values[0];
                    const vTitle = values[1];

                    expect(alertTitle).equal(prepend + vTitle + append);

                    done();
               })
               .catch( reason => done(reason));

    }

    clickOkayButton() {
       return  this.getOkayButton()
            .then( (okayButton:WebElement) => {
                return E2EUtil.get().clickElementPromise(okayButton);
            });
    }

    clickCancelButton(done: CallbackStepDefinition) {
        this.getCancelButton()
            .then( (cancelButton:WebElement) => {
                E2EUtil.get().clickElement(cancelButton, done);
            })
            .catch( reason => done(reason) );
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
