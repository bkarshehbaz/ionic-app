import * as _ from 'lodash';
import { browser, by, promise, WebElement } from 'protractor';

import { ItemUtil } from "../../../../../components/item/item.e2e-class";
import { E2EUtil } from '../../../../../../util/util.e2e-class';
import { Done } from '../../../../../../config/helpers/chai-imports';
import { includes, toString, random } from 'lodash';

const searchableQuery = "searchable-popover ";
export class SearchablePopoverPage {

    itemUtil:ItemUtil;
    constructor() {
        this.itemUtil = new ItemUtil(searchableQuery + " ion-content ion-list ion-item");
    }

    async getHeader() {
        return await E2EUtil.get().getElement(searchableQuery + "ion-header")
                    //   .then( (header:WebElement) => {
                    //        return header;
                    //   })
                    //   .catch( console.error);
    }

    async getTitle() {
		const header = await this.getHeader();
		return await header.findElement(by.css("ion-title"));
		//    .then( (header:WebElement) => {
		//        header.findElement(by.css("ion-title"))
		//              .then( (ionTitle:WebElement) => {
		//                   return ionTitle;
		//              })
		//              .catch( console.error);
		//    })
		//    .catch( console.error);
    }

    async getItems() {
        return await E2EUtil.get().getElements("ion-item");
                    //   .then( (ionItems:WebElement[]) => {
                    //       return ionItems;
                    //   })
                    //   .catch( console.error);
    }

    async getRandomItem() {
		const items = await this.getItems();

		const index = random(0, items.length);

		return { item: items[index], index };

		//    .then( (items:WebElement[]) => {
		//       const index = random(0, items.length);
		//       return {item: items[index], index};
		//    });
		//    .catch( console.error);
    }

    async search(query:string, done: Done) {
		// const header = await this.getHeader();
		// const searchBarInput = await header.findElement(by.css(".searchbar-input"));
		// await E2EUtil.get().clickElementPromise(searchBarInput);
		// await searchBarInput.sendKeys(query);
		// await browser.sleep(2000);

		// done();

        this.getHeader()
            .then( (header:WebElement) => header.findElement(by.css(".searchbar-input")) )
			.then( (searchBarInput:WebElement) => {
				E2EUtil.get().clickElementPromise(searchBarInput);
				return searchBarInput;
			})
			.then( searchBarInput => searchBarInput.sendKeys(query) )
			.then( () => browser.sleep(2000) )
			.then( () => done())
			.catch( reason => done(reason) );
    }

    expectToHaveItemWithTitle(query:string, done: Done) {
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
                           expect(includes(toString(texts).toLowerCase(), query.toLowerCase())).toBe(true,toString(texts) + " does not contains " + query );
                           done();
                       })
                       .catch( reason => done(reason) );
            })
            .catch( reason => done(reason) );
    }

    clickItemWithTitle(query:string, done: Done) {
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
                           //expect(includes(texts, query)).toBe(true,toString(texts) + " does not contains " + query );
                           for(let i = 0; i < texts.length; i++) {
                              if(includes(texts[i],query)) {
                                  this.itemUtil.clickItemByIndex(done, i);
                                  break;
                              }
                           }
                           done();
                       })
                       .catch( reason => done(reason) );
            })
            .catch( reason => done(reason) );
  }

}
