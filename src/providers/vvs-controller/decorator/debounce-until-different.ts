// import { Observable } from "rxjs";
// import { Observer } from "rxjs/Observer";

// export function DebounceUntilDifferent(key?: string) {
// 	return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
// 		var context;
// 		var originalMethod = descriptor.value as Function;

// 		let observer: Observer<any>;
// 		new Observable( obs => {
// 			observer = obs;
// 		})
// 		// .pipe(
// 		// 	debounce
// 		// )
// 		.subscribe( function(args: any[]) {
// 			originalMethod.apply(context, arguments)
// 		});
// 		descriptor.value = function() {
// 			context = this;
// 			console.log("called lol");
// 			debugger;
// 			observer.next(Array.from(arguments));
// 		}
// 		return descriptor;
// 	}
// };
