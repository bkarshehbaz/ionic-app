import { WebElement } from 'protractor';

export class ButtonUtil {

    _buttonWebElement:WebElement;
    constructor(buttonWebElement:WebElement) {
        this._buttonWebElement = buttonWebElement;
        // return this;
    }

    isDisable() {
        this._buttonWebElement
            .isEnabled()
            .then( (value:boolean) => value )
            .catch(console.error);
    }

}
