import { AlertUtil } from "../pages/components/alert/alert.e2e-class";
import { When, Then, Given , CallbackStepDefinition } from "cucumber";

Then(/^the title of the page should be "(.*?)"$/, (text, callback: CallbackStepDefinition) => {
	AlertUtil.get().shoulbBeDisplayed(false, callback);
});
