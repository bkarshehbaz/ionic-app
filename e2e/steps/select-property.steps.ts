import { When } from "cucumber";
import { async } from "q";
import { PropertyPage } from "../pages/select-search/select-property.po";

When(/^the select property page is visible$/, async() => {
	await PropertyPage.get().waitUntilVisible();
});
