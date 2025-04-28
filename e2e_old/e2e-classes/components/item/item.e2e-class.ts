import { browser, by, promise, WebElement } from 'protractor';

import { e2eUtil} from "../../util/util.e2e-class";

import * as _ from "lodash";

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
                   .catch(console.error);
    }

    isDisplayed(trueORfalse:boolean, done:DoneFn) {
        this.getItemByCurrentIndex()
            .then( (item:WebElement) => {
                item.isDisplayed()
                    .then( (val:boolean) => {
                        expect(val).toBe(trueORfalse);
                        done();
                    })
                    .catch( reason => done.fail(reason) );
            })
            .catch(reason => done.fail(reason) );
    }

    clickItemByCurrentIndex(done:DoneFn) {
       this.getItemByCurrentIndex()
           .then( (item:WebElement) => {
               e2eUtil.clickElement(item, done);
               browser.sleep(500);
           })
           .catch( reason => done.fail(reason) );
    }

    clickItemByIndex(done:DoneFn, $index:number) {
       this.getItems()
           .then( (items:WebElement[]) => {
               e2eUtil.clickElement(items[$index], done);
               browser.sleep(500);
           })
           .catch( reason => done.fail(reason) );
    }

    moveCursorToItemAtCurrentIndex() {
        return this.getItemByCurrentIndex()
                   .then( (item:WebElement) => {
                       browser.actions().mouseMove(item);
                       browser.sleep(200);
                   })
                   .catch(console.error); // tslint:disable-line:no-console
    }

    public getRandomItemIndex() {
      return this.getItems()
                 .then( (items:WebElement[]) => {
                     return Number(_.random(0,items.length));
                 })
                 .catch(console.error);
    }
    public getRandomItem():promise.Promise<{item:WebElement,index:number}> {
        return this.getItems()
                   .then( (items:WebElement[]) => {
                       const i = _.random(0,items.length);
                       return {item:items[i],index:i};
                   })
                   .catch(console.error);
    }

    clickRandomItem(done:DoneFn):promise.Promise<number> {
        return this.getRandomItem()
                   .then((randomItem:{item:WebElement,index:number}) => {
                      //  console.log("randomItem.index",randomItem.index);
                      //  console.log("randomItem.item",randomItem.item);
                       browser.sleep(500);
                       e2eUtil.clickElement(randomItem.item);
                       return randomItem.index;
                   })
                   .catch( reason => done.fail(reason) );
        // this.getItems()
        //     .then( (items:WebElement[]) => {
        //         let randomItem:WebElement = _.sample(items);
        //
        //         e2eUtil.clickElement(randomItem, done);
        //
        //     })
        //     .catch( reason => done.fail(reason) );
    }

    public verifyItemBasic(done:DoneFn) {
        this.getItems()
            .then( () => {
                done();
            })
            .catch( reason => done.fail(reason) );
    }

    public verifyItemAdvanced(done:DoneFn) {
        this.getItems()
            .then( () => {
                done();
            })
            .catch( reason => done.fail(reason));
    }

}
