
// import { Observable } from 'rxjs';
// import { of } from 'rxjs';
// import { tap, retryWhen, delay, flatMap, take, concat } from 'rxjs/operators';

// // const { of } = rxjs;
// // const { tap, retryWhen, delay } = rxjs.operators;

// const server = {
//   responseStatus: '500',
//   carsData: [
//     {
//       id: 1,
//       name: 'Porsche 911'
//     },
//     {
//       id: 2,
//       name: 'Ferrari F40'
//     }
//   ],
//   getData() {
//     return of(this.carsData).pipe(
//       tap(() => {
//         if (!this.responseStatus.startsWith('2')) {
//           throw this.responseStatus;
//         }
//       })
//     );
//   }
// };

// // .flatMap((flatError: any) => {
// //     if(flatError.status !== 401) {
// //         return Observable.of(flatError.status).delay(i *= 1.33);
// //     }
// //     return throwError({error: 'No retry'});
// // })
// // .take(3)
// // .concat


// export const httpRetry = function({ i, random, takeCount }) {
//     return retryWhen(errors => errors.pipe(
//         flatMap((flatError: any) => {
//             if(flatError.status !== 401) {
//                 console.log("retrying", random, i)
//                 return of(flatError.status).pipe( delay(Number.parseInt((i *= 1.33) as any) ))
//             }
//             return throwError({error: 'No retry'});
//         }),
//         take(takeCount),
//         concat(throwError({error: 'Sorry, there was an error (after 5 retries)'}))
//     ));
// };

// let i = 1000;
// const carsData$ = server.getData().pipe(
//     httpRetry({

// 	})
// );

// carsData$.subscribe({
//   next: console.log,
//   error: errorStatus => console.log('Error: ' + errorStatus)
// });

// const isAuthenticated = () => {
//     const rand = Math.random();
//     console.log(rand)
//     return rand < 0.5;
// }

// setTimeout(() => (server.responseStatus = isAuthenticated() ? '200' : '403'), 10000);
