import { browser, by, promise, WebElement } from 'protractor';

import { expect } from 'chai';

import * as _ from "lodash";
import { CallbackStepDefinition } from 'cucumber';

const checkinFields: { [key: string]: { index: number, title: string } } = {
    ticketNumber: {
        index: 0,
        title: "Ticket Number"
    },
    place: {
        index: 1,
        title: "Place"
    },
    companyEvent: {
        index: 2,
        title: "Company/Event"
    },
    roomNumber: {
        index: 3,
        title: "Room Number"
    },
    firstName: {
        index: 4,
        title: "First Name"
    },
    lastName: {
        index: 5,
        title: "Last Name"
    },
    phoneNumber: {
        index: 6,
        title: "Phone Number"
    }
};

const carFields: { [key: string]: { index: number, title: string } } = {

    vinNumber: {
        title: "Vin Number",
        index: 0
    },
    transmissionStyle: {
        title: "Transmission Style",
        index: 1
    },
    vehicleMake: {
        title: "Vehicle Make",
        index: 2
    },
    vehicleModel: {
        title: "Vehicle Model",
        index: 3
    },
    vehicleYear: {
        title: "V. Year",
        index: 4
    },
    vehicleColor: {
        title: "V. Color",
        index: 5
    }

};

const completeTicketViewButtons: { [key: string]: { title: string, index: number } } = {
    checkIn: {
        title: "Check-in",
        index: 0
    },
    checkOut: {
        title: "Checkout",
        index: 1
    },
    pullCar: {
        title: "Pull Car",
        index: 2
    },
    parkCar: {
        title: "Park Car",
        index: 3
    },
    pay: {
        title: "Pay",
        index: 4
    },
    recover: {
        title: "Recover",
        index: 5
    }
};

const acitonButtonsKeys = {
    checkIn: "checkIn",
    pullCar: "pullCar",
    parkCar: "parkCar",
    pay: "pay",
    recover: "recover"
};

export enum TABS {
    HOME,
    CHAT,
    SCAN,
    CHECKIN,
    RECENT_ACTIVITIES
}

// tslint:disable-next-line:*
export class E2EUtil {

    private static instance: E2EUtil;
    public static get() {
        return E2EUtil.instance || (E2EUtil.instance = new E2EUtil());
    }

    checkTitle($title: string, done: CallbackStepDefinition) {
        browser.sleep(1000);

        browser.getTitle()
            .then(title => {
                expect(title).equal($title);
                // browser.pause();

                done();
            })
            .catch(reason => {

                // browser.pause();
                done(reason);

            });
    }

    expectToNotBeFound(reason: Error, done?: CallbackStepDefinition) {
        expect(_.includes(reason.name, "NoSuchElementError")).equal(true, "This is error is not NoSuchElementError, but " + reason.message);
        if (done) {
            done();
        }
    }

    expectToBeDisplayed(trueORfalse: boolean, webElemt: WebElement, done: CallbackStepDefinition) {
        browser.isElementPresent(webElemt)
            .then((val: boolean) => {
                expect(val).equal(trueORfalse);
                done();
            })
            .catch(reason => this.expectToNotBeFound(reason, done));
    }

    clickElement(webElement: WebElement, done?: CallbackStepDefinition): void {
        browser.sleep(500);

        browser.actions()
            .mouseMove(webElement)
            .click()
            .perform()
            .then(() => {
                browser.sleep(750);

                if (done) {
                    done();
                }
                // return true;
            })
            .catch(reason => {
                // console.error(reason);
                done(reason);
            });
    }

    clickElementPromise(webElement: WebElement) {
        browser.sleep(500);

        return browser.actions()
            .mouseMove(webElement)
            .click()
            .perform()
            .then(() => {
                browser.sleep(750);

                return true;
            })
            .catch(reason => {
                // tslint:disable-next-line:no-console
                console.error(reason);
                //  done.fail(reason);
            });
    }

    returnInputClassedTextInput(webElement: WebElement): PromiseLike<WebElement> {
        return webElement.findElement(by.css("input.text-input"))
            .then((inputElement: WebElement) => {
                return inputElement;
            });
        //  .catch( reason => console.log(reason) ); // tslint:disable-line:no-console
    }

    // blurInputElement(elementPath:string) {
    //     browser.executeScript("document.querySelector("+elementPath+")");
    // }

    getElement(query: string) {
        return browser.findElement(by.css(query));
    }
    getElements(query: string) {
        return browser.findElements(by.css(query));
    }

    async hasClass(webElement: WebElement, className: string, trueORfalse?: boolean, done?: CallbackStepDefinition) {
        const classes = await webElement.getAttribute('class');
        await browser.sleep(500);
        expect(_.includes(classes.split(' '), className)).equal(trueORfalse);
        await browser.sleep(500);
        if (done) {
            done();
        }
    }

    async clickTabNumber(index: number, done: CallbackStepDefinition) {
        await browser.sleep(500);
        const tabBars: WebElement[] = await browser.findElements(by.css(".tabbar"));

        expect(tabBars.length).equal(1);
        const tabBar: WebElement = tabBars[0];

        const tabButtons = await tabBar.findElements(by.css(".tab-button"));

        expect(tabButtons.length).equal(5);

        this.clickElement(tabButtons[index], done);

        //  return browser.findElements(by.css(".tabbar"))
        //                .then( (tabBars:WebElement[]) => {

        //                     expect(tabBars.length).equal(1);
        //                     const tabBar:WebElement = tabBars[0];
        //                     tabBar.findElements(by.css(".tab-button"))
        //                           .then( (tabButtons:WebElement[]) => {

        //                               expect(tabButtons.length).equal(5);

        //                               this.clickElement(tabButtons[index], done);

        //                           });


        //                });
    }

    getCheckinFields() {
        return checkinFields;
    }

    getCarFields() {
        return carFields;
    }

    getCompleteTicketButtons() {
        return completeTicketViewButtons;
    }

    getTextContent(htmlElement: WebElement) {
        return htmlElement.getText().then(textContent => textContent).catch(console.error);
    }


    // verifySegmentStatus(ionSegmentButtons:WebElement[],segmentStatus:boolean[]) {
    //     return Promise.all<any>(
    //                        [
    //                          ionSegmentButtons[0].getAttribute('class'),
    //                          ionSegmentButtons[1].getAttribute('class'),
    //                          ionSegmentButtons[2].getAttribute('class'),
    //                          ionSegmentButtons[3].getAttribute('class')
    //                        ]
    //                      )
    //                   .then( (values:string[]) => {
    //                      for(let i = 0; i < values.length; i++) {
    //                         expect(_.includes(values[i].split(" "),"segment-activated"))).equal(segmentStatus[i]);
    //                      }
    //                   })
    //                   .catch( reason => console.log(reason));
    // }


    // verifySegmentTitles(ionSegmentButtons:WebElement[]) {
    //
    //     return Promise.all<any>(
    //                        [
    //                          ionSegmentButtons[0].getText(),
    //                          ionSegmentButtons[1].getText(),
    //                          ionSegmentButtons[2].getText(),
    //                          ionSegmentButtons[3].getText()
    //                        ]
    //                      )
    //                   .then( (values:string[]) => {
    //                       expect(values[0])).equal("Staged");
    //                       expect(values[1])).equal("Pull");
    //                       expect(values[2])).equal("All Cars");
    //                       expect(values[3])).equal("My Cars");
    //                   })
    //                   .catch( reason => console.log(reason));
    // }



}
