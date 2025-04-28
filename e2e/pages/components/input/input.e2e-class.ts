import { browser, by, WebElement } from 'protractor';

import { E2EUtil } from "../../../util/util.e2e-class";

import { ItemUtil } from "../item/item.e2e-class";
import { CallbackStepDefinition } from 'cucumber';

export class InputUtil extends ItemUtil {

    getTextInput() {
        return this.getItemByCurrentIndex()
                   .then( (ionItem:WebElement) => {

                        return ionItem.findElement(by.css("input.text-input"))
                                      .then( (input:WebElement) => {
                                           return input;
                                      })
                                    //   .catch(console.error);


                   })
                   .catch( reason => { throw new Error(reason); });
                    //"input.text-input"
    }

    sendKeys(text:string, done: CallbackStepDefinition) {
       this.moveCursorToItemAtCurrentIndex()
           .then( () => {

               this.getTextInput()
               .then( (textInput:WebElement) => {
                   textInput.sendKeys(text);
                   done();
               })
               .catch( reason => done(reason) );
           })
           .catch( reason => done(reason) );
    }

    shouldBeFocus(trueORfalse:boolean,done: CallbackStepDefinition) {
        this.getItemByCurrentIndex()
            .then( (item:WebElement) => {
                E2EUtil.get().hasClass(item,"input-has-focus", trueORfalse, done);
            })
            .catch( reason => done(reason) );
    }

    blurInput(done: CallbackStepDefinition) {
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
                    .catch( reason => done(reason) );
            })
            .catch(reason => done(reason));
        // browser.executeScript("<script>alert('lucas');</script>");
        // browser.executeScript("<script>document.querySelector()</script>");

    }

}
