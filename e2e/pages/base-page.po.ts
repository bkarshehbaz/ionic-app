import { browser, by, element, ExpectedConditions } from "protractor";

export class BasePageObject {
	private path: string;
	tag: string;

	constructor(tag: string, path?: string) {
		this.tag = tag;
		this.path = path;
	}

	//   load(): any {
	//     // return browser.get(this.path);
	//   }

	rootElement() {
		return element(by.css(this.tag));
	}

	waitUntilInvisible() {
		browser.wait(
			ExpectedConditions.invisibilityOf(this.rootElement()),
			3000
		);
	}

	waitUntilPresent() {
		browser.wait(ExpectedConditions.presenceOf(this.rootElement()), 3000);
	}

	waitUntilNotPresent() {
		browser.wait(
			ExpectedConditions.not(
				ExpectedConditions.presenceOf(this.rootElement())
			),
			3000
		);
	}

	async isDisplayed() {
		return await this.rootElement().isDisplayed();
	}

	waitUntilVisible() {
		browser.wait(ExpectedConditions.visibilityOf(this.rootElement()), 3000);
	}

	getTitle() {
		return element(by.css(`${this.tag} ion-title`)).getText();
	}

	async enterInputText(sel: string, text: string) {
		const el = element(by.css(`${this.tag} ${sel}`));
		const inp = el.element(by.css("input"));
		await inp.sendKeys(text);
	}

	async enterTextareaText(sel: string, text: string) {
		const el = element(by.css(`${this.tag} ${sel}`));
		const inp = el.element(by.css("textarea"));
		await inp.sendKeys(text);
	}

	async clickButton(sel: string) {
		const el = element(by.css(`${this.tag} ${sel}`));
		await browser.wait(ExpectedConditions.elementToBeClickable(el));
		await el.click();
	}

	async clickElementByText(sel: string, text: string) {
		const el = element(by.cssContainingText(`${this.tag} ${sel}`, text));
		await browser.wait(ExpectedConditions.elementToBeClickable(el));
		await el.click();
	}
}
