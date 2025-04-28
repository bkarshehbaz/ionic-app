import { browser, by, WebElement } from 'protractor';

import { includes } from "lodash";

const stageIcons = ["icon-arrow-return-right",
                    "icon-fireball",
                    "icon-ios-location",
                    "icon-ios-moon"];
const  pullIcons = [];
const allIcons   = [];
const myCars     = [];


class ListItemUtil {

  // var result = {};
  // document.querySelectorAll(".icon-status-row .col li").forEach( lucas => result[lucas.className] = lucas.className );
  // console.log(result.forEach(l => console.log(l)));

    iconStatusRowShouldBeOk(inSegment:string) {

        browser.findElements(by.css(".icon-status-row .col li"))
               .then( (icons:WebElement[]) => {

                    icons.forEach( (icon:WebElement) => {
                        icon.getAttribute("class")
                            .then( ($class:string) => {
                                expect(includes(stageIcons,$class));
                            });
                    });
            
               });
    }

}

export const listItemUtil = new ListItemUtil();
