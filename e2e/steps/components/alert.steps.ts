import { browser, protractor } from "protractor";
import { expect } from "../../config/helpers/chai-imports";
import { When, Then, CallbackStepDefinition } from "cucumber";
import { AlertUtil } from "../../pages/components/alert/alert.e2e-class";

Then(/^sleep for 10$/, async() => {
	await browser.sleep(2500);
});

Then(/^an alert should be displayed$/, (callback: CallbackStepDefinition) => {
	AlertUtil.get().shoulbBeDisplayed(true, callback);
});

Then(/^the alert should not be displayed$/, (callback: CallbackStepDefinition) => {
	AlertUtil.get().shoulbBeDisplayed(false, callback);
});

When(/^user click the alert positive button$/, async() => {
	await AlertUtil.get().clickOkayButton();
});

When(/^I click the alert negative button$/, (callback: CallbackStepDefinition) => {
	AlertUtil.get().clickCancelButton(callback);
});

Then(/^the alert okay button equals "(.*?)"$/, (text, done: CallbackStepDefinition) => {
	AlertUtil.get().getOkayButtonText()
	.then( text => {
		expect(text).equal("Yes");
		done();
	})
	.catch( reason => done(reason) );});

Then(/^the alert cancel button equals "(.*?)"$/, (text, done: CallbackStepDefinition) => {
	AlertUtil.get().getCancelButtonText()
	.then( text => {
		expect(text).equal("No");
		done();
	})
	.catch( reason => done(reason) );
});
