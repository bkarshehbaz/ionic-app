import * as _ from 'lodash';
import { browser, by, promise, WebElement } from 'protractor';

import { ItemUtil } from "../../../../../components/item/item.e2e-class";
import { e2eUtil } from "../../../../../util/util.e2e-class";

const searchableQuery = "searchable-popover ";
class SearchablePopoverUtil {

    itemUtil:ItemUtil;
    constructor() {
        this.itemUtil = new ItemUtil(searchableQuery + " ion-content ion-list ion-item");
    }

    getHeader() {
        return e2eUtil.getElement(searchableQuery + "ion-header")
                      .then( (header:WebElement) => {
                           return header;
                      })
                      .catch( console.error);
    }

    getTitle() {
        return this.getHeader()
                   .then( (header:WebElement) => {
                       header.findElement(by.css("ion-title"))
                             .then( (ionTitle:WebElement) => {
                                  return ionTitle;
                             })
                             .catch( console.error);
                   })
                   .catch( console.error);
    }

    getItems() {
        return e2eUtil.getElements("ion-item")
                      .then( (ionItems:WebElement[]) => {
                          return ionItems;
                      })
                      .catch( console.error);
    }

    getRandomItem():promise.Promise<{item:WebElement, index:number}> {
        return this.getItems()
                   .then( (items:WebElement[]) => {
                      const index = _.random(0, items.length);
                      return {item: items[index], index};
                   })
                   .catch( console.error);
    }

    search(query:string, done:DoneFn) {
        this.getHeader()
            .then( (header:WebElement) => {
                header.findElement(by.css(".searchbar-input"))
                      .then( (searchBarInput:WebElement) => {
                          e2eUtil.clickElementPromise(searchBarInput)
                                 .then( () => {
                                     searchBarInput.sendKeys(query);

                                     browser.sleep(2000);

                                     done();
                                 })
                                 .catch( reason => done.fail(reason) );
                      })
                      .catch( reason => done.fail(reason) );
            })
            .catch( reason => done.fail(reason) );
    }

    expectToHaveItemWithTitle(query:string, done:DoneFn) {
        this.itemUtil = new ItemUtil(searchableQuery + " ion-content ion-list ion-item");

        this.itemUtil
            .getItems()
            .then( (items:WebElement[]) => {
                const promises = [];
                items.forEach( (item:WebElement) => {
                    promises.push(item.getText());
                });

                Promise.all(promises)
                       .then( (texts:string[]) => {
                           expect(_.includes(_.toString(texts).toLowerCase(), query.toLowerCase())).toBe(true,_.toString(texts) + " does not contains " + query );
                           done();
                       })
                       .catch( reason => done.fail(reason) );
            })
            .catch( reason => done.fail(reason) );
    }

    clickItemWithTitle(query:string, done:DoneFn) {
        this.itemUtil = new ItemUtil(searchableQuery + " ion-content ion-list ion-item");

        this.itemUtil
            .getItems()
            .then( (items:WebElement[]) => {
                const promises = [];
                items.forEach( (item:WebElement) => {
                    promises.push(item.getText());
                });

                Promise.all(promises)
                       .then( (texts:string[]) => {
                           //expect(_.includes(texts, query)).toBe(true,_.toString(texts) + " does not contains " + query );
                           for(let i = 0; i < texts.length; i++) {
                              if(_.includes(texts[i],query)) {
                                  this.itemUtil.clickItemByIndex(done, i);
                                  break;
                              }
                           }
                           done();
                       })
                       .catch( reason => done.fail(reason) );
            })
            .catch( reason => done.fail(reason) );
  }

}
export const searchablePopoverUtil = new SearchablePopoverUtil();
