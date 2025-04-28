import { Done } from "../../../config/helpers/chai-imports";
import { E2EUtil, TABS } from "../../../util/util.e2e-class";
import { BasePageObject } from "../../base-page.po";
import { SegmentUtil } from "../../components/segment/segment.e2e-class";

const segmentStatus = {
    staged:  [true,  false, false, false],
    pull:    [false, true , false, false],
    allcars: [false, false, true , false],
    mycars:  [false, false, false, true ]
};
export class HomePage extends BasePageObject {

	segment: SegmentUtil;
	constructor() {
		super("home", "");
		this.segment = new SegmentUtil();
	}

	load(done: Done) {
		E2EUtil.get().clickTabNumber(TABS.HOME, done);
	}

    getSegmentStatus() {
        return segmentStatus;
    }

}
