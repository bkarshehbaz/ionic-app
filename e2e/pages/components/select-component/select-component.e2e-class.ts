import { browser, by, WebElement } from 'protractor';
import { ItemUtil } from "../../components/item/item.e2e-class";
import { CallbackStepDefinition } from 'cucumber';
import { expect } from "../../../config/helpers/chai-imports";

export class SelectSearchComponentUtil extends ItemUtil {

	constructor() {
		super("select-component ion-content ion-list ion-item");
	}

    getSelectComponent() {
        return browser.findElement(by.css("select-component"));
    }

    getItemsCount() {
        return this.getItems()
                   .then( (items:WebElement[]) => items.length)
                   .catch( reason => { throw new Error(reason); });
    }

    // // @Override
    // isDisplayed(done: CallbackStepDefinition) {
    //     // super.isDisplayed();
    //     this.getSelectComponent()
    //         .then( (selectComponent:WebElement) => {
    //             e2eUtil.expectToBeDisplayed(selectComponent, done);
    //         })
    //         .catch( reason => done.fail(reason) );
    // }

    shouldHaveTitle(title:string, done: CallbackStepDefinition) {
        this.getSelectComponent()
            .then( (selectComponent:WebElement) => {
                selectComponent.findElement(by.css("ion-list ion-label"))
                               .getText()
                               .then( text => expect(text).equal(title) );
            })
            // .catch( reason => {
			// 	done(reason) as any;
			// });
    }

    itemCountShouldBe(count:number, done: CallbackStepDefinition) {
        this.getItemsCount()
            .then( ($count:number) => expect($count).equal(count) )
            .catch( reason => done(reason) as any );
    }


}
// export const selectSearchComponentUtil = new SelectSearchComponentUtil("select-component ion-content ion-list ion-item");
