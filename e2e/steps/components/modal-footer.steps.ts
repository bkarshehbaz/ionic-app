import { browser, protractor } from "protractor";
import { expect } from 'chai';
import { ModalFooter } from "../../pages/components/modal-footer/modal-footer.e2e-class";
import { When, Then, CallbackStepDefinition } from "cucumber";

const modalFooter: ModalFooter = new ModalFooter();

When(/^I click the alert cancel button$/, (callback: CallbackStepDefinition) => {
	modalFooter.clickCancelButton(callback);
});

When(/^I click the alert submit button$/, (callback: CallbackStepDefinition) => {
	modalFooter.clickSubmitButton(callback);
});
