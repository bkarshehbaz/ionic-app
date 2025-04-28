import { browser, WebElement } from 'protractor';

import * as _ from "lodash";

import { alertUtil } from "../components/alert/alert.e2e-class";
import { ItemUtil } from "../components/item/item.e2e-class";
import { e2eUtil } from "../util/util.e2e-class";

export class SelectSearchComponentBase {

    itemUtil:ItemUtil;
    type:string;
    constructor(type:string) {
        this.itemUtil = new ItemUtil("select-search-component ion-item");
        this.type = type;
    }

    run(firstName?:string) {
        // SELECT Company Opens
        describe('Select ' + _.capitalize(this.type) + ' Spec >> ', () => {
            // beforeEach(() => {
            //     browser.get('/');
            //     browser.waitForAngular();
            //     browser.sleep(1000);
            // });

            it('should have a title saying Choose a ' + this.type, (done: DoneFn) => {

                if(this.type === "company") {
                    browser.get('/');
                    browser.waitForAngular();
                    browser.sleep(500);
                }

                if(firstName) {
                    e2eUtil.checkTitle("Hi " + firstName + ", choose a " + this.type, done);
                } else {
                    e2eUtil.checkTitle("Choose a " + this.type, done);
                }
            });

            it('Every ' + this.type + ' name and id shold be not empty', (done: DoneFn) => {

                this.itemUtil
                    .getItems()
                    .then( (elements:WebElement[]) => {
                        _.map(elements, (element:WebElement) => {
                             element.getText()
                                    .then( (text:string) => {
                                        expect(text.length > 0).toEqual(true);
                                    })
                                    .catch( reason => done.fail(reason) );
                             browser.sleep(500);
                        });
                        browser.sleep(500);

                        done();
                    })
                    .catch( reason =>  done.fail(reason));

            });

            it('Should have at least one ' + this.type + ' in the list', (done: DoneFn) => {
                // browser.findElements(by.css("ion-list ion-item"))
                this.itemUtil
                    .getItems()
                    .then( (elements:WebElement[]) => {
                         expect(elements.length > 0).toEqual(true);
                         done();
                    })
                    .catch( reason =>  done.fail(reason));

            });

            it("Alert should not be displayed", (done:DoneFn) => {
                alertUtil.shoulbBeDisplayed(false, done);
                browser.sleep(500);
            });


            let randomElement:WebElement;
            it('Should alert pop up when click a ' + this.type, (done: DoneFn) => {
                // browser.findElements(by.css("ion-list ion-item"))
                this.itemUtil
                    .getItems()
                    .then( (elements:WebElement[]) => {
                         randomElement = _.sample(elements);

                         e2eUtil.clickElement(randomElement, done);
                    })
                    .catch( reason => done.fail(reason) );
            });

            it("ALert should be displayed", (done:DoneFn) => {
                alertUtil.shoulbBeDisplayed(true, done);
            });

            it("Alert title should match clicked item", (done:DoneFn) => {
                expect(_.isNil(randomElement)).toBe(false);
                alertUtil.alertShouldHaveThisTitle(randomElement, "Are you sure you want to choose ", "?", done);
            });




            it("Okay button", (done:DoneFn) => {
                alertUtil.getOkayButtonText()
                         .then( text => {
                             expect(text).toEqual("Yes");
                             done();
                         })
                         .catch( reason => done.fail(reason) );
            });
            it("Cancel button", (done:DoneFn) => {
                alertUtil.getCancelButtonText()
                         .then( text => {
                             expect(text).toEqual("No");
                             done();
                         })
                         .catch( reason => done.fail(reason) );
            });

            it('Click no', (done:DoneFn) => {
                browser.sleep(250);

                alertUtil.clickCancelButton(done);
            });

            it('Alert should close when click NO', (done: DoneFn) => {
                browser.sleep(250);

                alertUtil.shoulbBeDisplayed(false,done);
            });

            it('Click yes', (done:DoneFn) => {
                e2eUtil.clickElement(randomElement,done);
            });

            it("ALert should be displayed", (done:DoneFn) => {
                browser.sleep(1000);
                alertUtil.shoulbBeDisplayed(true, done);
            });

            it("Clicking Yes", (done:DoneFn) => {
                alertUtil.clickOkayButton(done);
            });

        });
    }
}
