import { browser } from 'protractor';

// import ItemUtil from "../../../../../components/item/item.e2e-class";
import { InputUtil } from "./input.e2e-class";

export class InputBase extends InputUtil {

    constructor(private $itemQuery, private object:{title:string,index:number}) {
        super($itemQuery, object.index);
    }

    // run(keys?:string) {
    //     if(keys) {
    //         describe(this.object.title + " Spec", () => {

    //             it(this.object.title + " should be displayed", (done:DoneFn) => {
    //                 browser.sleep(1000);
    //                 this.isDisplayed(true, done);
    //             });

    //             it("Click " + this.object.title, (done:DoneFn) => {
    //                 browser.sleep(1000);
    //                 this.clickItemByCurrentIndex(done);
    //             });

    //             // it(this.object.title + " should be focused", (done:DoneFn) => {
    //             //     browser.sleep(1000);
    //             //     this.shouldBeFocus(true, done);
    //             // });

    //             it("Send " + keys + " to " + this.object.title, (done:DoneFn) => {
    //                 this.sendKeys(keys,done);
    //             });

    //             it(this.object.title + " should equal" + "{{ticketNumber}}", (done:DoneFn) => {
    //                 done();
    //             });

    //             // it("Blur " + this.object.title, (done:DoneFn) => {
    //             //     this.blurInput(done);
    //             // });

    //             // it(this.object.title + " should blur", (done:DoneFn) => {
    //             //     this.shouldBeFocus(false, done);
    //             // });

    //             it("Expect to have class vss-valid", (done:DoneFn) => {
    //                 browser.sleep(500);
    //                 done();
    //             });

    //         });
    //     }
    // }

}
