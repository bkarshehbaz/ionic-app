import { browser } from 'protractor';

import { ItemUtil } from "../../../../../../components/item/item.e2e-class";

import { selectSearchComponentUtil } from "../../../../../../components/select-component/select-component.e2e-class";

import { e2eUtil } from "../../../../../../util/util.e2e-class";
class CompanyEventItem extends ItemUtil {

    runCompanyEventSpec() {

        describe("CompanyEventSpec", () => {

            it("SelectComponent/CompanyEvent should not be displayed", (done:DoneFn) => {
                // this.isDisplayed(true, done);
                selectSearchComponentUtil.isDisplayed(false,done);
            });

            /*NOTE: this can the default test for a  ion-input*/
            it("Click companyEventItem", (done:DoneFn) => {
                this.clickItemByCurrentIndex(done);
                browser.sleep(1000);
            });

            it("SelectComponent/CompanyEvent should be displayed", (done:DoneFn) => {
                // this.isDisplayed(true, done);
                selectSearchComponentUtil.isDisplayed(true,done);
            });

            it("SelectComponent/CompanyEvent title should be CHOOSE EVENT", (done:DoneFn) => {
                selectSearchComponentUtil.shouldHaveTitle("CHOOSE EVENT", done);
            });

            it("SelectComponent/CompanyEvent should have 3 items", (done:DoneFn) => {
                selectSearchComponentUtil.itemCountShouldBe(3,done);
            });

            it("Items' titles should be equal to these", (done:DoneFn) => {
                selectSearchComponentUtil.getItems()
                                         .then( items => {

                                         })
                                         .catch( reason => done.fail(reason) );
            });

            it("Click random item", (done:DoneFn) => {
                selectSearchComponentUtil.clickRandomItem(done);
            });

        });

    }

}
export const companyEventItem = new CompanyEventItem("customer-step ion-item", e2eUtil.getCheckinFields().companyEvent.index);
