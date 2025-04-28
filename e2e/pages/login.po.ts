import { BasePageObject } from "./base-page.po";

export class LoginPageObject extends BasePageObject {

	private static instance: LoginPageObject;
	public static get() {
		return LoginPageObject.instance || (LoginPageObject.instance = new LoginPageObject());
	}

	constructor() {
		super("login-page");
	}

}
