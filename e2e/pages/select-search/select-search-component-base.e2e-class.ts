import { browser } from 'protractor';
import { ItemUtil } from "../components/item/item.e2e-class";
import { BasePageObject } from '../base-page.po';

export class SelectSearchComponentBase extends BasePageObject {

    type: string;
    constructor(type:string) {
		super("select-search", "/");
        this.type = type;
	}

	load() {
		return browser.get("/");
	}

}
