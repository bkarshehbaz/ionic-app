import { sample } from 'lodash';
import { browser, promise, WebElement } from 'protractor';
import { E2EUtil } from '../../../../../../util/util.e2e-class';
import { Done } from '../../../../../../config/helpers/chai-imports';


const query = "ion-picker-cmp .picker-opt";
export class IonDateTimeColumn {

    getColumnRows() {
        return E2EUtil.get().getElements(query);
    }

    clickRandomRow(done: Done) {
        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  E2EUtil.get().clickElement(sample(columnRows), done);
            })
            .catch( reason => done(reason) );
    }

    clickRowByIndex(index:number, done: Done) {
        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  E2EUtil.get().clickElement(columnRows[index], done);
            })
            .catch( reason => done(reason) );
    }

    clickRowByNameUsingRecursion(name:string|number, $index:number, done: Done) {

        this.getColumnRows()
            .then( (columnRows:WebElement[]) => {
                  const promises:Array<promise.Promise<string>> = [];
                  columnRows.forEach( (value:WebElement, index) => {
                      promises.push(value.getText());
                  });

                  Promise.all<any>(promises)
                         .then( (texts:string[]) => {
                            console.log("texts", texts, texts.length);
                            //  E2EUtil.get().clickElement(_.find(columnRows, _.toString(name)), done);
                            // let targetText = _.find(columnRows, _.toString(name));

                            // let myButtonNumericValue = Number(targetText);
                            const currentYear:number = new Date().getFullYear();
                            const targetNumericValue:number = Number(name);

                            const max = currentYear === targetNumericValue ? 0 : Math.abs(currentYear - targetNumericValue);
                            console.log("max", max, "currentYear", currentYear, "targetNumericValue", targetNumericValue);

                            const keepGoing = 0;
                            // do{
                                browser.actions()
                                       .mouseMove(E2EUtil.get().getElement("ion-picker-cmp .picker-opt-selected"))
                                       .mouseDown()
                                       .mouseMove({x: 0, y:-1 })
                                      //  .click()
                                      //  .click()
                                       .mouseUp()
                                       .perform()
                                       .then( () => {

                                            browser.sleep(1000);

                                            E2EUtil.get().getElement("ion-picker-cmp .picker-opt-selected")
                                                   .then( (itemSelected:WebElement) => {
                                                       itemSelected.getText()
                                                                   .then( (text:string) => {

                                                                        console.log("selectedText", text, "expected", name, name === text, Number(name) === Number(text));

                                                                        if(Number(text) === Number(name)) {
                                                                            // E2EUtil.get().clickElement(itemSelected,done);
                                                                            E2EUtil.get().getElements("ion-picker-cmp .picker-button")
                                                                                   .then( (items) => E2EUtil.get().clickElement(items[items.length-1],done))
                                                                                   .catch( reason => done(reason) );
                                                                        } else {
                                                                            this.clickRowByNameUsingRecursion(name, $index++, done);
                                                                        }
                                                                   });
                                                   });
                                            // E2EUtil.get().getElements("ion-picker-cmp .picker-button")
                                            //        .then( (items) => E2EUtil.get().clickElement(items[items.length-1],done))
                                            //        .catch( reason => done(reason) );


                                       })
                                       .catch( reason => done(reason) );

                                      // browser.pause();
                            // }while(keepGoing === 0);

                         })
                         .catch( reason => done(reason) );

            })
            .catch( reason => done(reason) );
    }

    // clickRowByName(name:string|number, done: Done) {
    //     this.getColumnRows()
    //         .then( (columnRows:WebElement[]) => {
    //               const promises:Array<promise.Promise<string>> = [];
    //               columnRows.forEach( (value:WebElement, index) => {
    //                   promises.push(value.getText());
    //               });

    //               Promise.all<any>(promises)
    //                      .then( (texts:string[]) => {
    //                         console.log("texts", texts, texts.length);
    //                         //  E2EUtil.get().clickElement(_.find(columnRows, _.toString(name)), done);
    //                         // let targetText = _.find(columnRows, _.toString(name));

    //                         // let myButtonNumericValue = Number(targetText);
    //                         const currentYear:number = new Date().getFullYear();
    //                         const targetNumericValue:number = Number(name);

    //                         let max = currentYear === targetNumericValue ? 0 : Math.abs(currentYear - targetNumericValue);
    //                         console.log("max", max, "currentYear", currentYear, "targetNumericValue", targetNumericValue);

    //                         const keepGoing = 0;
    //                         // do{
    //                             browser.actions()
    //                                    .mouseMove(E2EUtil.get().getElement("ion-picker-cmp .picker-opt-selected"))
    //                                    .mouseDown()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp()
    //                                    .mouseMove({x: 0, y: this.mouseMove(--max) }).mouseUp().click().click()
    //                                    .perform()
    //                                    .then( () => {

    //                                         E2EUtil.get().getElements("ion-picker-cmp .picker-button")
    //                                                .then( (items) => E2EUtil.get().clickElement(items[items.length-1],done))
    //                                                .catch( reason => done(reason) );

    //                                         // browser.pause();
    //                                         //
    //                                         // browser.sleep(2000);
    //                                         //
    //                                         // E2EUtil.get().getElement("ion-picker-cmp .picker-opt-selected")
    //                                         //        .then( (optionSelected:WebElement) => {
    //                                         //           browser.sleep(1000);
    //                                         //
    //                                         //           optionSelected.getText()
    //                                         //                         .then( (text:string) => {
    //                                         //                             browser.sleep(1000);
    //                                         //
    //                                         //                             if(text == name) {
    //                                         //
    //                                         //                                console.log("done");
    //                                         //
    //                                         //                                E2EUtil.get().clickElement(optionSelected, done);
    //                                         //                               //  keepGoing = -1;
    //                                         //
    //                                         //                               //  done();
    //                                         //                                browser.pause();
    //                                         //                             }
    //                                         //
    //                                         //
    //                                         //                         })
    //                                         //                         .catch( reason => done(reason) );
    //                                         //
    //                                         //
    //                                         //        })
    //                                         //        .catch( reason => done(reason) );
    //                                    })
    //                                    .catch( reason => done(reason) );

    //                                   // browser.pause();
    //                         // }while(keepGoing === 0);

    //                      })
    //                      .catch( reason => done(reason) );

    //         })
    //         .catch( reason => done(reason) );
    // }

    mouseMove(max:number) {
        console.log("max",max);
        console.log("max <= 0 ? 0 : -14",max <= 0 ? 0 : -14);
        return max <= 0 ? 0 : -14;
    }

}
