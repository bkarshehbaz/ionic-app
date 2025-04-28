import { Then, Given, When } from "cucumber";
import { PropertyPage } from "../pages/select-search/select-property.po";
import { browser } from "protractor";
import { AlertUtil } from "../pages/components/alert/alert.e2e-class";
import { LoginPageObject } from "../pages/login.po";

Given(/^$/, async() => {

});

Then(/^the user should be in the select-property-page or an alert is shown$/, async() => {
	await browser.sleep(2000);
	try {
		const propertyPage = new PropertyPage();
		if (await propertyPage.isDisplayed() == true) {
			throw new Error("Failed");
		}
	} catch(e) {
		if (AlertUtil.get().isDisplayed()) {
			await AlertUtil.get().clickOkayButton();
		} else {
			throw new Error("Failed");
		}
	}

	await browser.sleep(10000);

});

When(/^user types username$/, async() => {
	await browser.sleep(1000);
	await LoginPageObject.get().enterInputText(".username-item", "estrel2")
});

When(/^user types password$/, async() => {
	await LoginPageObject.get().enterInputText(".password-item", "savestheday")
});

When(/^user clicks the submit button$/, async() => {
	await LoginPageObject.get().clickButton("#submitButton");
});
