import * as _ from 'lodash';
import { browser, promise, WebElement } from 'protractor';

import { e2eUtil } from "../../../../../util/util.e2e-class";

const query = "ion-picker-cmp .picker-opt";
class IonDateTimeColumn {

    getColumnRows() {
        return e2eUtil.getElements(query);
    }

    clickRandomRow(done:DoneFn) {
        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  e2eUtil.clickElement(_.sample(columnRows), done);
            })
            .catch( reason => done.fail(reason) );
    }

    clickRowByIndex(index:number, done:DoneFn) {
        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  e2eUtil.clickElement(columnRows[index], done);
            })
            .catch( reason => done.fail(reason) );
    }

    clickRowByNameUsingRecursion(name:string|number, $index:number, done:DoneFn) {

        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  const promises:Array<promise.Promise<string>> = [];
                  columnRows.forEach( (value:WebElement, index) => {
                      promises.push(value.getText());
                  });

                  Promise.all<any>(promises)
                         .then( (texts:string[]) => {
                            console.log("texts", texts, texts.length);
                            //  e2eUtil.clickElement(_.find(columnRows, _.toString(name)), done);
                            // let targetText = _.find(columnRows, _.toString(name));

                            // let myButtonNumericValue = Number(targetText);
                            const currentYear:number = new Date().getFullYear();
                            const targetNumericValue:number = Number(name);

                            const max = currentYear === targetNumericValue ? 0 : Math.abs(currentYear - targetNumericValue);
                            console.log("max", max, "currentYear", currentYear, "targetNumericValue", targetNumericValue);

                            const keepGoing = 0;
                            // do{
                                browser.actions()
                                       .mouseMove(e2eUtil.getElement("ion-picker-cmp .picker-opt-selected"))
                                       .mouseDown()
                                       .mouseMove({x: 0, y:-1 })
                                      //  .click()
                                      //  .click()
                                       .mouseUp()
                                       .perform()
                                       .then( () => {

                                            browser.sleep(1000);

                                            e2eUtil.getElement("ion-picker-cmp .picker-opt-selected")
                                                   .then( (itemSelected:WebElement) => {
                                                       itemSelected.getText()
                                                                   .then( (text:string) => {

                                                                        console.log("selectedText", text, "expected", name, name === text, Number(name) === Number(text));

                                                                        if(Number(text) === Number(name)) {
                                                                            // e2eUtil.clickElement(itemSelected,done);
                                                                            e2eUtil.getElements("ion-picker-cmp .picker-button")
                                                                                   .then( (items) => e2eUtil.clickElement(items[items.length-1],done))
                                                                                   .catch( reason => done.fail(reason) );
                                                                        } else {
                                                                            this.clickRowByNameUsingRecursion(name, $index++, done);
                                                                        }
                                                                   });
                                                   });
                                            // e2eUtil.getElements("ion-picker-cmp .picker-button")
                                            //        .then( (items) => e2eUtil.clickElement(items[items.length-1],done))
                                            //        .catch( reason => done.fail(reason) );


                                       })
                                       .catch( reason => done.fail(reason) );

                                      // browser.pause();
                            // }while(keepGoing === 0);

                         })
                         .catch( reason => done.fail(reason) );

            })
            .catch( reason => done.fail(reason) );
    }

    clickRowByName(name:string|number, done:DoneFn) {
        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  const promises:Array<promise.Promise<string>> = [];
                  columnRows.forEach( (value:WebElement, index) => {
                      promises.push(value.getText());
                  });

                  Promise.all<any>(promises)
                         .then( (texts:string[]) => {
                            console.log("texts", texts, texts.length);
                            //  e2eUtil.clickElement(_.find(columnRows, _.toString(name)), done);
                            // let targetText = _.find(columnRows, _.toString(name));

                            // let myButtonNumericValue = Number(targetText);
                            const currentYear:number = new Date().getFullYear();
                            const targetNumericValue:number = Number(name);

                            let max = currentYear === targetNumericValue ? 0 : Math.abs(currentYear - targetNumericValue);
                            console.log("max", max, "currentYear", currentYear, "targetNumericValue", targetNumericValue);

                            const keepGoing = 0;
                            // do{
                                browser.actions()
                                       .mouseMove(e2eUtil.getElement("ion-picker-cmp .picker-opt-selected"))
                                       .mouseDown()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
                                       .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp().click().click()
                                       .perform()
                                       .then( () => {

                                            e2eUtil.getElements("ion-picker-cmp .picker-button")
                                                   .then( (items) => e2eUtil.clickElement(items[items.length-1],done))
                                                   .catch( reason => done.fail(reason) );

                                            // browser.pause();
                                            //
                                            // browser.sleep(2000);
                                            //
                                            // e2eUtil.getElement("ion-picker-cmp .picker-opt-selected")
                                            //        .then( (optionSelected:WebElement) => {
                                            //           browser.sleep(1000);
                                            //
                                            //           optionSelected.getText()
                                            //                         .then( (text:string) => {
                                            //                             browser.sleep(1000);
                                            //
                                            //                             if(text == name) {
                                            //
                                            //                                console.log("done");
                                            //
                                            //                                e2eUtil.clickElement(optionSelected, done);
                                            //                               //  keepGoing = -1;
                                            //
                                            //                               //  done();
                                            //                                browser.pause();
                                            //                             }
                                            //
                                            //
                                            //                         })
                                            //                         .catch( reason => done.fail(reason) );
                                            //
                                            //
                                            //        })
                                            //        .catch( reason => done.fail(reason) );
                                       })
                                       .catch( reason => done.fail(reason) );

                                      // browser.pause();
                            // }while(keepGoing === 0);

                         })
                         .catch( reason => done.fail(reason) );

            })
            .catch( reason => done.fail(reason) );
    }

    mouseMove(max:number) {
        console.log("max",max);
        console.log("max <= 0 ? 0 : -14",max <= 0 ? 0 : -14);
        return max <= 0 ? 0 : -14;
    }

}
export const ionDateTimeColumn = new IonDateTimeColumn();
