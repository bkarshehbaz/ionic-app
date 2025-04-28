// import { StripeCardTokenRes, StripeCardTokenParams } from "@ionic-native/stripe/ngx";
// import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
// import { Injectable } from "@angular/core";

// @Injectable()
// export class StripeMock {

//     constructor(private http: HttpClient) {}

//     setPublishableKey(a: string) {}
    
//     createCardToken(card: StripeCardTokenParams): Promise<StripeCardTokenRes> {

//       const pKey = "pk_test_RoVL46EHCSeT1KxwTlre1mvE00rEW35X0w";

//       const payload = new HttpParams()
//       .set('card[number]', '4242424242424242')
//       .set('card[exp_month]', '12')
//       .set('card[exp_year]', '2020')
//       .set('card[cvc]', '220');

//       const headers = new HttpHeaders()
//       .set('Authorization', `Bearer ${pKey}`)
//       .set('Content-Type', 'application/x-www-form-urlencoded');

//       return this.http
//       .post('https://api.stripe.com/v1/tokens', payload, { headers })
//       .toPromise() as Promise<StripeCardTokenRes>;

//       // return null;
//     }
// }
