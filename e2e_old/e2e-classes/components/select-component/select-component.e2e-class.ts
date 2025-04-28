import { browser, by, WebElement } from 'protractor';


import { ItemUtil } from "../../components/item/item.e2e-class";

class SelectSearchComponentUtil extends ItemUtil {

    getSelectComponent() {
        return browser.findElement(by.css("select-component"));
    }

    getItemsCount() {
        return this.getItems()
                   .then( (items:WebElement[]) => items.length)
                   .catch( reason => { throw new Error(reason); });
    }

    // // @Override
    // isDisplayed(done:DoneFn) {
    //     // super.isDisplayed();
    //     this.getSelectComponent()
    //         .then( (selectComponent:WebElement) => {
    //             e2eUtil.expectToBeDisplayed(selectComponent, done);
    //         })
    //         .catch( reason => done.fail(reason) );
    // }

    shouldHaveTitle(title:string, done:DoneFn) {
        this.getSelectComponent()
            .then( (selectComponent:WebElement) => {
                selectComponent.findElement(by.css("ion-list ion-label"))
                               .getText()
                               .then( text => expect(text).toBe(title));
            })
            .catch( reason => done.fail(reason) );
    }

    itemCountShouldBe(count:number, done:DoneFn) {
        this.getItemsCount()
            .then( ($count:number) => expect($count).toBe(count) )
            .catch( reason => done.fail(reason) );
    }


}
export const selectSearchComponentUtil = new SelectSearchComponentUtil("select-component ion-content ion-list ion-item");
