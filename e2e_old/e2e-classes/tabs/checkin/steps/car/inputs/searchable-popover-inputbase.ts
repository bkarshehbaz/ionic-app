

import { InputBase} from "../../input-base.e2e-class";

import { searchablePopoverUtil } from "../searchable-popover/searchable-popover.e2e-class";

export class SearchablePopoverInputBase extends InputBase {

    run(keys) {
        // super.run();
        describe("Sending " + keys, () => {

            it("Open Make SearchablePopover", (done:DoneFn) => {
                this.clickItemByCurrentIndex(done);
            });

            it("Searching...", (done:DoneFn) => {
                // this.sendKeys(keys, done);
                searchablePopoverUtil.search(keys,done);

            });

            it("Should have found at least one item", (done:DoneFn) => {
                searchablePopoverUtil.expectToHaveItemWithTitle(keys, done);
            });

            it("Click matching item", (done:DoneFn) => {
                searchablePopoverUtil.clickItemWithTitle(keys, done);
            });

        });
    }

}
