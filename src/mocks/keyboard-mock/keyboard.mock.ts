import { Keyboard } from "@ionic-native/keyboard/ngx";
import { Observable } from 'rxjs';

import { Logger } from "../../providers/vvs-controller/util/logger";
const logger = Logger.get("KeyboardMock");

/**
 * @requires chrome extension:
 * https://chrome.google.com/webstore/detail/virtual-keyboard/pflmllfnnabikmfkkaddkoolinlfninn/related?hl=en
 */
export class KeyboardMock extends Keyboard {

    onKeyboardHideKeyboardMockService: Observable<any>;
    onKeyboardHideKeyboardMockObserver: any;

    onKeyboardShowKeyboardMockService: Observable<any>;
    onKeyboardShowKeyboardMockObserver: any;

    onKeyboardHide(): Observable<any> {
        super.onKeyboardHide();
        // logger.debug("onKeyboardShow >>  KeyboardMock");
        this.onKeyboardHideKeyboardMockService = new Observable( ($observer) => {
            this.onKeyboardHideKeyboardMockObserver = $observer;
        });

        const target = document.getElementById("virtualKeyboardChromeExtension");
        const observer = new MutationObserver( (mutations) => {

            mutations.forEach( (mutation) => {

                if ( (mutation.target as any).attributes.getNamedItem("_state").value.toString() === "closed") {
                    this.onKeyboardHideKeyboardMockObserver.next();
                }

            });

        });

		const config: any = { attributes: true, childList: true, characterData: true};

		if (target) {
			observer.observe(target, config);
		}
        return this.onKeyboardHideKeyboardMockService;
    }

    onKeyboardShow(): Observable<any> {
        super.onKeyboardShow();
        // logger.debug("onKeyboardShow >>  KeyboardMock");
        this.onKeyboardShowKeyboardMockService = new Observable( ($observer) => {
            this.onKeyboardShowKeyboardMockObserver = $observer;
        });

        const target = document.getElementById("virtualKeyboardChromeExtension");
        const observer = new MutationObserver( (mutations) => {
            mutations.forEach( (mutation) => {

                if ( (mutation.target as any).attributes.getNamedItem("_state").value.toString() === "open") {
                    // logger.debug((<any>mutation.target.parentNode).clientHeight);
                    this.onKeyboardShowKeyboardMockObserver.next({keyboardHeight: (mutation.target.parentNode as any).clientHeight - 20/*padding*/}); //virtualKeyboardChromeExtension default height
                }

            });
        });
		const config: any = { attributes: true, childList: true, characterData: true};
		if (target) {
			observer.observe(target, config);
		}
        return this.onKeyboardShowKeyboardMockService;

    }
}
