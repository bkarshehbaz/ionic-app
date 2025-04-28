import { browser, by, promise, WebElement } from 'protractor';

import { E2EUtil } from "../../../util/util.e2e-class";

import { random } from "lodash";
import { CallbackStepDefinition } from 'cucumber';
import { expect } from "../../../config/helpers/chai-imports";

export class ItemUtil {

    public itemQuery:string;
    public index:number;
    constructor($itemQuery:string, $index?:number) {
        this.itemQuery = $itemQuery;
        this.index = $index;
    }

    getItem() {
        return browser.findElement(by.css(this.itemQuery));
    }

    getItems() {
        return browser.findElements(by.css(this.itemQuery));
	}

    getItemByCurrentIndex() {
        return this.getItems()
                   .then( (items:WebElement[]) => {
                        return items[this.index];
                   })
                //    .catch(console.error);
    }

    isDisplayed(trueORfalse:boolean, done: CallbackStepDefinition) {
        this.getItemByCurrentIndex()
            .then( (item:WebElement) => {
                item.isDisplayed()
                    .then( (val:boolean) => {
                        expect(val).equal(trueORfalse);
                        done();
                    })
                    .catch( reason => done(reason) );
            })
            .catch(reason => done(reason) );
    }

    clickItemByCurrentIndex(done: CallbackStepDefinition) {
       return this.getItemByCurrentIndex()
           .then( (item:WebElement) => {
               E2EUtil.get().clickElement(item, done);
               browser.sleep(500);
           })
           .catch( reason => done(reason) );
	}

	clickItemByCurrentIndexAsync() {
		return this.getItemByCurrentIndex()
			.then( (item:WebElement) => {
				E2EUtil.get().clickElement(item);
				browser.sleep(500);
			})
	 }


    clickItemByIndex(done: CallbackStepDefinition, $index:number) {
       this.getItems()
           .then( (items:WebElement[]) => {
               E2EUtil.get().clickElement(items[$index], done);
               browser.sleep(500);
           })
           .catch( reason => done(reason) );
    }

    moveCursorToItemAtCurrentIndex() {
        return this.getItemByCurrentIndex()
                   .then( (item:WebElement) => {
                       browser.actions().mouseMove(item);
                       browser.sleep(200);
                   })
                //    .catch(console.error); // tslint:disable-line:no-console
    }

    public getRandomItemIndex() {
      return this.getItems()
                 .then( (items:WebElement[]) => {
                     return Number(random(0,items.length));
                 })
                //  .catch(console.error);
    }
    public getRandomItem():promise.Promise<{item:WebElement,index:number}> {
        return this.getItems()
                   .then( (items:WebElement[]) => {
                       const i = random(0,items.length);
                       return {item:items[i],index:i};
                   })
                //    .catch(console.error);
    }

    clickRandomItem(): promise.Promise<number> {
        return this.getRandomItem()
                   .then((randomItem:{item:WebElement,index:number}) => {
                      //  console.log("randomItem.index",randomItem.index);
                      //  console.log("randomItem.item",randomItem.item);
                       browser.sleep(500);
                       E2EUtil.get().clickElement(randomItem.item);
                       return randomItem.index;
                   });
                //    .catch( reason => done(reason) as any );
        // this.getItems()
        //     .then( (items:WebElement[]) => {
        //         let randomItem:WebElement = sample(items);
        //
        //         E2EUtil.get().clickElement(randomItem, done);
        //
        //     })
        //     .catch( reason => done(reason) );
    }

    public verifyItemBasic(done: CallbackStepDefinition) {
        this.getItems()
            .then( () => {
                done();
            })
            .catch( reason => done(reason) );
    }

    public verifyItemAdvanced(done: CallbackStepDefinition) {
        this.getItems()
            .then( () => {
                done();
            })
            .catch( reason => done(reason));
    }

}
