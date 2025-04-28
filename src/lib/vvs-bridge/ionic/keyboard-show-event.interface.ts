export interface IKeyboardShowEvent {
	keyboardHeight: number;
	bubbles: boolean;
	cancelBubble: boolean;
	cancelable: boolean;
	composed: boolean;
	currentTarget: Window; // {document: #document, Infinity: Infinity, window: Window, NaN: NaN, undefined: undefined, …}
	defaultPrevented: boolean;
	eventPhase: number;
	isTrusted: boolean;
	returnValue: boolean;
	srcElement: Window; // {document: #document, Infinity: Infinity, window: Window, NaN: NaN, undefined: undefined, …}
	target: Window; // {document: #document, Infinity: Infinity, window: Window, NaN: NaN, undefined: undefined, …}
	timeStamp: number;
	type: number; //"native.keyboardshow"
}
