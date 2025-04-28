
import { E2EUtil, TABS } from "../../../util/util.e2e-class";
import { Done } from "../../../config/helpers/chai-imports";
import { BasePageObject } from "../../base-page.po";

export class ChatPage extends BasePageObject {

	constructor() {
		super("chat", "")
	}

	load(done: Done) {
		E2EUtil.get().clickTabNumber(TABS.CHAT, done);
	}

}
