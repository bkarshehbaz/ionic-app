// import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

// @Directive({
//   // tslint:disable-next-line:directive-selector
//   selector: '[keyboardFix]'
// })
// export class keyboardFix implements AfterViewInit { // tslint:disable-line

//     constructor (private _elRef: ElementRef, private _renderer: Renderer2) {}

//     ngAfterViewInit() {

//         let input = null;

//         // tslint:disable-next-line:prefer-conditional-expression
//         if ( this._elRef.nativeElement.tagName === 'ION-TEXTAREA') {
//             input = this._elRef.nativeElement.querySelector("textarea");
//         } else {
//             input = this._elRef.nativeElement.querySelector("input");
//         }

//         if ( input ) {
//             this._renderer.setAttribute(input, 'autoComplete', 'true');
//             this._renderer.setAttribute(input, 'spellcheck', 'true');
//             this._renderer.setAttribute(input, 'autocorrect', 'true');
//         }

//     }

// }
