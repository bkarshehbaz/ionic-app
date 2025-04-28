// import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform, WrappedValue} from '@angular/core';


// @Pipe({name: 'statusDescription', pure: false})
// export class TestAsyncPipe implements PipeTransform {

//   private val: number;
//   private originalValue: number;

//   constructor(private _ref: ChangeDetectorRef) {}

//   transform(value: number): any {
//     if (value === this.originalValue) {
//       return this.val;
//     } else {
//       new Promise(resolve => {
//         setTimeout(() => resolve(value * 2), 1000) ;
//       }).then((v: number) => {
//         this.val = v + 1;
//         this._ref.markForCheck();
//       });
//     }

//     this.originalValue = value;
//     this.val = value;

//     return WrappedValue.wrap(value);
//   }
// }
