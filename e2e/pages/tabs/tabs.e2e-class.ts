import { browser, by, WebElement } from 'protractor';




// tslint:disable:prefer-const
let home;
let chat;
let scan;
let checkin;
let notifications;
// tslint:enable:prefer-const

const currentPage:number = -1;
class TabsSpec {

    runTabsSpec() {

        describe("Tabs  >>  ", () => {

            it("it should have 5 tabs and the names should be right", (done:DoneFn) => {

                browser.findElements(by.css(".tabbar"))
                       .then( (tabBars:WebElement[]) => {

                            expect(tabBars.length).toBe(1);
                            const tabBar:WebElement = tabBars[0];
                            tabBar.findElements(by.css(".tab-button"))
                                  .then( (tabButtons:WebElement[]) => {

                                      expect(tabButtons.length).toBe(5);
                                      // home           = tabButtons[0];
                                      // chat           = tabButtons[1];
                                      // scan           = tabButtons[2];
                                      // checkin        = tabButtons[3];
                                      // notifications  = tabButtons[4];
                                      done();

                                  });


                       });

            });

        });




    }

}
export const tabsSpec = new TabsSpec();
