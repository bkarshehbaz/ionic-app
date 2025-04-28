import { browser, WebElement } from 'protractor';

import { ItemUtil } from "../../../components/item/item.e2e-class";
import { E2EUtil } from "../../../../util/util.e2e-class";

import { Done } from '../../../../config/helpers/chai-imports';
import { map } from 'lodash';
import { InputBase } from '../../../components/input/input-base.e2e-class';

export class CustomerStepUtil {

	itemUtil:ItemUtil;
	customerFirstName: InputBase;
    constructor() {
		this.itemUtil = new ItemUtil("customer-step ion-item");
		this.customerFirstName = new InputBase("customer-step ion-item", E2EUtil.get().getCheckinFields().firstName);

    }

    getCustomerStep() {
        return E2EUtil.get().getElement("customer-step");
    }

    isDisplayed(done: Done) {
        this.getCustomerStep()
            .then(
				(customerStep:WebElement) => {
                	E2EUtil.get().expectToBeDisplayed(true, customerStep, done);
				},
				reason => E2EUtil.get().expectToNotBeFound(reason, done)
			)
    }

    verifyFields(done: Done) {
        this.itemUtil.getItems()
            .then(
				(val:WebElement[]) => {
					expect(val.length).toBe(7);

					map( E2EUtil.get().getCheckinFields(), (field) => {
						val[field.index].getText().then( text => expect(text).toEqual(field.title));
					});

					browser.sleep(250);

					done();
				},
				reason => E2EUtil.get().expectToNotBeFound(reason, done)
			)
    }

    clickCompanyEventItem(done: Done) {
        this.itemUtil
            .getItems()
            .then(
				(val:WebElement[]) => {

					const companyEvent:WebElement = val[2];
					E2EUtil.get().clickElement(companyEvent, done);
				},
				reason => E2EUtil.get().expectToNotBeFound(reason, done)
			);
    }


}
