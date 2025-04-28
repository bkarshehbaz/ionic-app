import { Keyboard } from "@ionic-native/keyboard/ngx";
import { Subscription, Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { VVSApp } from "../vvs-controller/vvs-controller";
import { Renderer2 } from "@angular/core";

export class KeyboardService {


	// tslint:disable: member-ordering
	private static showSubscription: Subscription;
	private static hideSubscription: Subscription;
	
	static lastHeight: number = -1;

	public static keyboard: Keyboard;
	public static set(keyboard: Keyboard) {
		KeyboardService.keyboard = keyboard;
	}

	public static isVisible(): boolean {
		return KeyboardService.keyboard && KeyboardService.keyboard.isVisible;
	}

	public static hide(): void {
		KeyboardService.keyboard && KeyboardService.keyboard.hide();
	}

	public static onShow(renderer: Renderer2): Observable<any> {
		if (!KeyboardService.keyboard) {
			return throwError("KeyboardService.keyboard is not defined");
		}

		if (KeyboardService.showSubscription && KeyboardService.showSubscription.unsubscribe) {
			KeyboardService.showSubscription.unsubscribe();
		}

		if (!KeyboardService.keyboard.onKeyboardShow) {
			return throwError("KeyboardService.keyboard.onKeyboardShow is not defined");
		}

		return KeyboardService.keyboard.onKeyboardShow()
		.pipe(
			tap( () => {
				if (VVSApp.instance && VVSApp.instance.isAndroid()) {
					renderer.addClass(document.body, "keyboard-is-open");
					// document.body.classList.add('keyboard-is-open');
				}
			})
		);
	}

	public static onHide(renderer: Renderer2) {
		if (!KeyboardService.keyboard) {
			return throwError("KeyboardService.keyboard is not defined");
		}

		if (KeyboardService.hideSubscription && KeyboardService.hideSubscription.unsubscribe) {
			KeyboardService.hideSubscription.unsubscribe();
		}

		if (!KeyboardService.keyboard.onKeyboardHide) {
			return throwError("KeyboardService.keyboard.onKeyboardHide is not defined");
		}

		return KeyboardService.keyboard.onKeyboardHide()
		.pipe(
			tap( () => {
				if (VVSApp.instance && VVSApp.instance.isAndroid()) {
					renderer.removeClass(document.body, "keyboard-is-open");
					// document.body.classList.remove('keyboard-is-open');
				}
			})
		);

	}

	public static setSubscriptions(show, hide) {
		KeyboardService.unsubscribe();

		KeyboardService.showSubscription = show;
		KeyboardService.hideSubscription = hide;

		KeyboardService.showBar();

	}

	static showBar() {
		KeyboardService._toggleBar(false);
	}

	static hideBar() {
		KeyboardService._toggleBar(true);
	}

	public static unsubscribe() {
		if (KeyboardService.showSubscription) {
			KeyboardService.showSubscription.unsubscribe();
			KeyboardService.showSubscription = undefined;
		}

		if (KeyboardService.hideSubscription) {
			KeyboardService.hideSubscription.unsubscribe();
			KeyboardService.hideSubscription = undefined;
		}
	}

	private static _toggleBar(val: boolean) {
		KeyboardService &&
		KeyboardService.keyboard &&
		KeyboardService.keyboard.hideFormAccessoryBar &&
		KeyboardService.keyboard.hideFormAccessoryBar(val);
	}

	// tslint:enable: member-ordering

}
