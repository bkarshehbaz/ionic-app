import { browser, WebElement } from 'protractor';

import { ItemUtil } from "../../../components/item/item.e2e-class";
import { e2eUtil } from "../../../util/util.e2e-class";

import * as _ from "lodash";

class CustomerStepUtil {

    itemUtil:ItemUtil;
    constructor() {
        this.itemUtil = new ItemUtil("customer-step ion-item");
    }

    getCustomerStep() {
        return e2eUtil.getElement("customer-step");
    }

    // getCheckinCustomerItem() {
    //     return browser.findElements(by.css("customer-step ion-list ion-item"));
    // }

    isDisplayed(done:DoneFn) {
        this.getCustomerStep()
            .then( (customerStep:WebElement) => {
                e2eUtil.expectToBeDisplayed(true, customerStep, done);
            })
            .catch( reason => e2eUtil.expectToNotBeFound(reason, done) );
    }

    verifyFields(done:DoneFn) {
        this.itemUtil
            .getItems()
            .then( (val:WebElement[]) => {
                expect(val.length).toBe(7);

                _.map( e2eUtil.getCheckinFields(), (field) => {
                    val[field.index].getText().then( text => expect(text).toEqual(field.title));
                });

                browser.sleep(250);

                done();
            })
            .catch( reason => e2eUtil.expectToNotBeFound(reason,done) );
    }

    // clickTicketNumber(done:DoneFn) {
    //     this.itemUtil
    //         .getItems()
    //         .then( (val:WebElement[]) => {
    //
    //             let ticketNumber:WebElement = val[0];
    //             e2eUtil.clickElement(ticketNumber)
    //                    .then( () => {
    //                        done();
    //                    })
    //                    .catch( reason => e2eUtil.expectToNotBeFound(reason, done));
    //         })
    //         .catch( reason => e2eUtil.expectToNotBeFound(reason, done));
    // }

    clickCompanyEventItem(done:DoneFn) {
        this.itemUtil
            .getItems()
            .then( (val:WebElement[]) => {

                const companyEvent:WebElement = val[2];
                e2eUtil.clickElement(companyEvent, done);
            })
            .catch( reason => e2eUtil.expectToNotBeFound(reason, done));
    }


}
export const customerStepUtil = new CustomerStepUtil();
