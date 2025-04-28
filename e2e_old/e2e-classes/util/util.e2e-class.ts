import { browser, by, promise, WebElement } from 'protractor';

import * as _ from "lodash";

const checkinFields:{[key:string]:{index:number,title:string}} = {
    ticketNumber:{
        index: 0,
        title: "Ticket Number"
    },
    place:{
        index: 1,
        title: "Place"
    },
    companyEvent:{
        index: 2,
        title: "Company/Event"
    },
    roomNumber:{
        index: 3,
        title :"Room Number"
    },
    firstName:{
        index: 4,
        title: "First Name"
    },
    lastName:{
        index: 5,
        title: "Last Name"
    },
    phoneNumber:{
        index: 6,
        title: "Phone Number"
    }
};

const carFields:{[key:string]:{index:number,title:string}} = {

  	vinNumber:{
  		title: "Vin Number",
  		index: 0
  	},
  	transmissionStyle:{
  		title: "Transmission Style",
  		index: 1
  	},
  	vehicleMake:{
  		title: "Vehicle Make",
  		index: 2
  	},
  	vehicleModel:{
  		title: "Vehicle Model",
  		index: 3
  	},
  	vehicleYear:{
  		title: "V. Year",
  		index: 4
  	},
  	vehicleColor:{
  		title: "V. Color",
  		index: 5
  	}

};

const completeTicketViewButtons:{[key:string]:{title:string,index:number}} = {
    checkIn:{
    	title:"Check-in",
    	index: 0
    },
    checkOut:{
    	title:"Checkout",
    	index: 1
    },
    pullCar:{
    	title:"Pull Car",
    	index: 2
    },
    parkCar:{
    	title:"Park Car",
    	index: 3
    },
    pay:{
    	title:"Pay",
    	index: 4
    },
    recover:{
    	title:"Recover",
    	index: 5
    }
};

const acitonButtonsKeys = {
  checkIn :"checkIn",
  pullCar:"pullCar",
  parkCar:"parkCar",
  pay:"pay",
  recover:"recover"
};

// tslint:disable-next-line:*
class E2EUtil {

    checkTitle($title:string, done:DoneFn) {
        browser.sleep(1000);

        browser.getTitle()
            .then(title => {
                expect(title).toEqual($title);
                // browser.pause();

                done();
            })
            .catch( reason => {

                // browser.pause();
                done.fail(reason);

            });
    }

    expectToNotBeFound(reason:Error,done?:DoneFn) {
        expect(_.includes(reason.name,"NoSuchElementError")).toEqual(true,"This is error is not NoSuchElementError, but " + reason.message);
        if(done) {
            done();
        }
    }

    expectToBeDisplayed(trueORfalse:boolean, webElemt:WebElement, done:DoneFn) {
        browser.isElementPresent(webElemt)
               .then( (val:boolean) => {
                   expect(val).toBe(trueORfalse);
                   done();
               })
               .catch( reason => this.expectToNotBeFound(reason, done));
    }

    clickElement(webElement:WebElement, done?:DoneFn):void {
        browser.sleep(500);

        browser.actions()
               .mouseMove(webElement)
               .click()
               .perform()
               .then( () => {
                   browser.sleep(750);

                   if(done) {
                      done();
                   }
                   // return true;
               })
               .catch( reason => {
                   // console.error(reason);
                   done.fail(reason);
               });
    }

    clickElementPromise(webElement:WebElement) {
       browser.sleep(500);

       return browser.actions()
                     .mouseMove(webElement)
                     .click()
                     .perform()
                     .then( () => {
                         browser.sleep(750);

                         return true;
                     })
                     .catch( reason => {
                         // tslint:disable-next-line:no-console
                         console.error(reason);
                        //  done.fail(reason);
                     });
    }

    returnInputClassedTextInput(webElement:WebElement):promise.Promise<WebElement> {
        return webElement.findElement(by.css("input.text-input"))
                         .then( (inputElement:WebElement) => {
                              return inputElement;
                         })
                         .catch( reason => console.log(reason) ); // tslint:disable-line:no-console
    }

    // blurInputElement(elementPath:string) {
    //     browser.executeScript("document.querySelector("+elementPath+")");
    // }

    getElement(query:string) {
        return browser.findElement(by.css(query));
    }
    getElements(query:string) {
        return browser.findElements(by.css(query));
    }

    hasClass(webElement:WebElement, className:string, trueORfalse?:boolean, done?:DoneFn) {
        return webElement.getAttribute('class')
                         .then( (classes:string) => {
                            browser.sleep(500);
                            expect( _.includes(classes.split(' '), className ) ).toBe(trueORfalse);
                            browser.sleep(500);
                            if(done) {
                                done();
                            }
                         });
    }

    clickTabNumber(index:number, done:DoneFn) {
         browser.sleep(500);
         return browser.findElements(by.css(".tabbar"))
                       .then( (tabBars:WebElement[]) => {

                            expect(tabBars.length).toBe(1);
                            const tabBar:WebElement = tabBars[0];
                            tabBar.findElements(by.css(".tab-button"))
                                  .then( (tabButtons:WebElement[]) => {

                                      expect(tabButtons.length).toBe(5);

                                      this.clickElement(tabButtons[index], done);
                                      // home           = tabButtons[0];
                                      // chat           = tabButtons[1];
                                      // scan           = tabButtons[2];
                                      // checkin        = tabButtons[3];
                                      // notifications  = tabButtons[4];
                                      // done();

                                  });


                       });
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

    getTextContent(htmlElement:WebElement) {
        return htmlElement.getText().then( textContent => textContent ).catch(console.error);
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
    //                         expect(_.includes(values[i].split(" "),"segment-activated")).toEqual(segmentStatus[i]);
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
    //                       expect(values[0]).toEqual("Staged");
    //                       expect(values[1]).toEqual("Pull");
    //                       expect(values[2]).toEqual("All Cars");
    //                       expect(values[3]).toEqual("My Cars");
    //                   })
    //                   .catch( reason => console.log(reason));
    // }



}
export const e2eUtil = new E2EUtil();
