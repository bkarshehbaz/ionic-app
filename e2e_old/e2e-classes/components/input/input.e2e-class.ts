import { browser, by, WebElement } from 'protractor';

import { e2eUtil } from "../../util/util.e2e-class";

import { ItemUtil } from "../item/item.e2e-class";

export class InputUtil extends ItemUtil {

    getTextInput() {
        return this.getItemByCurrentIndex()
                   .then( (ionItem:WebElement) => {

                        return ionItem.findElement(by.css("input.text-input"))
                                      .then( (input:WebElement) => {
                                           return input;
                                      })
                                      .catch(console.error);


                   })
                   .catch( reason => { throw new Error(reason); });
                    //"input.text-input"
    }

    sendKeys(text:string, done:DoneFn) {
       this.moveCursorToItemAtCurrentIndex()
           .then( () => {

               this.getTextInput()
               .then( (textInput:WebElement) => {
                   textInput.sendKeys(text);
                   done();
               })
               .catch( reason => done.fail(reason) );
           })
           .catch( reason => done.fail(reason) );
    }

    shouldBeFocus(trueORfalse:boolean,done:DoneFn) {
        this.getItemByCurrentIndex()
            .then( (item:WebElement) => {
                e2eUtil.hasClass(item,"input-has-focus", trueORfalse, done);
            })
            .catch( reason => done.fail(reason) );
    }

    blurInput(done:DoneFn) {
        this.moveCursorToItemAtCurrentIndex()
            .then( () => {
                this.getTextInput()
                    .then( (input:WebElement) => {
                        // input..blur();
                        // browser.blurInputElement(input);


                        const query = `document.querySelectorAll("${this.itemQuery}")[${this.index}].blur();`;
                        // tslint:disable-next-line:no-console
                        console.log("query",query);
                        browser.executeScript(`
                          <script>${query}</script>
                        `);
                        browser.sleep(500);
                        done();
                    })
                    .catch( reason => done.fail(reason) );
            })
            .catch(reason => done.fail(reason));
        // browser.executeScript("<script>alert('lucas');</script>");
        // browser.executeScript("<script>document.querySelector()</script>");

    }

}
