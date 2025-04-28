import { When, Then, Given, setDefaultTimeout } from "cucumber";
import { CompanyPage } from "../pages/select-search/select.company.po";
import { expect } from "../config/helpers/chai-imports";
import { browser } from "protractor";

setDefaultTimeout(60 * 1000);

let companyPage = new CompanyPage();
Given(/^the user go to the select company page$/, async() => {
	await companyPage.load()
	await companyPage.waitUntilVisible()
});

Then(/^title should be: Choose a company$/, async () => {
	await browser.sleep(1000);
	let text = await companyPage.getTitle()
	expect(text).equal("Choose a company");
});

When(/^user click first company$/, async() => {
	await companyPage.clickButton("ion-item");
});

