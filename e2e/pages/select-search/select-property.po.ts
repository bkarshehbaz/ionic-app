import { SelectSearchComponentBase } from "./select-search-component-base.e2e-class";

export class PropertyPage extends SelectSearchComponentBase {

	private static instance: PropertyPage;
	public static get() {
		return PropertyPage.instance || (PropertyPage.instance = new PropertyPage());
	}

	constructor() {
		super("property");
	}
}
