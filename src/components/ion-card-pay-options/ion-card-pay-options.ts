import { Component, EventEmitter, Input, Output } from "@angular/core";

import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { pages } from "../../pages/index";
import * as cf from "../../constants/constant-fields";
import * as t from "../../constants/constant-titles";
// import { Stripe, StripeCardTokenParams, StripeCardTokenRes } from "@ionic-native/stripe/ngx";
import { IFullTicket } from "../../util";
import { isString } from "lodash";
import { IAblyUpdate } from "../../providers/ably-service";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { ICurrentTicket } from "../../lib/vvs-bridge";
import { getPushPay } from "../../util/get-push-pay";
import { CurrencyPipe } from "@angular/common";
import { RollbarService } from "../../services/rollbar";
import { IPresentConfirm } from "../../providers/vvs-controller/view/alert";
import { getBalance } from "../../util/get-balance";

interface ICollectJSConfig {
	paymentType: "cc" | "ck";
	callback: (token: any) => void;
}

interface CollectJSWindow extends Window {
	CollectJS: {
		startPaymentRequest: () => void;
		closePaymentRequest: () => void;
		configure: (config: ICollectJSConfig) => void;
		isIframeOpen: boolean;
	};
}

declare var window: CollectJSWindow;

const logger = Logger.get("IonCardPayOptions");

@Component({
	selector: "ion-card-pay-options",
	templateUrl: "./ion-card-pay-options.html",
	providers: [
		CurrencyPipe
	]
})
export class IonCardPayOptions {

	@Input() ticket: IFullTicket;
	@Input() showCancel: boolean;
	@Input() fromModal = false;

	@Output() canLeave = new EventEmitter<boolean>();
	@Output() close = new EventEmitter<boolean>();
	@Output() cancel = new EventEmitter<boolean>();
	@Output() refreshView = new EventEmitter<boolean>();

	tokenID: string;

	constructor(
		private vvsApp: VVSApp,
		// private stripe: Stripe, 
		private currency: CurrencyPipe
	) { }

	openCashComponent($event: any) {
		this.canLeave.emit(true);
		this.vvsApp.presentModal(pages.paycash, { ticket: this.ticket }, (val: boolean) => val && this.close.emit(val), { cssClass: 'paycash-modal' });
		// this.vvsApp.openTicket(this.ticket);
		// if (this.fromModal) {
		// 	const activeNav = this.vvsApp.app.getActiveNav();
		// 	debugger;
		// 	this.vvsApp.app.getActiveNav().push(pages.paycash, { ticket: this.ticket });
		// } else {
		// 	this.vvsApp.presentModal(pages.paycash, { ticket: this.ticket }, undefined, { cssClass: 'paycash-modal' });
		// }
	}

	async addEditCC() {
		this.vvsApp.presentPopover(
			'pay-card-confirm',
			{
				paymentTotal: "$" + getBalance(this.ticket),
				processingFees: '$0.65',
				paymentMethod: 'Credit',
			},
			undefined,
			{
				cssClass: 'pay-card-confirm-modal'
			},
			{
				onDidDismiss: (d: any, c: any) => {
					if (d) {
						this._addEditCC(d.email);
						console.log('Received email:', d.email);
					}
				}
			},
		);
	}

	private _addEditCC(email: string) {
		// logger.info("payWithCard");
		window.CollectJS.configure({
			paymentType: "cc",
			instructionText: 'Enter Card Info Below',
			buttonText: 'Submit Card Info',
			callback: (token) => {
				console.log("payWithCard", token);
				this.handleToken(token.token, email);
				//   alert('token: ' + token);
				// if (
				//   (this.paymentInfo && (this.paymentInfo.check_account || this.paymentInfo.cc_number || this.paymentInfo.payment_type) )
				//   ||
				//   (this.subscription && (this.subscription.check_account || this.subscription.cc_number || this.subscription.payment_type ) )
				// ) {
				//   this.updatePaymentInformation(token.token);
				// } else {
				// }
			},
		} as any);

		if (window.CollectJS.isIframeOpen) {
			window.CollectJS.closePaymentRequest()
		}
		window.CollectJS.startPaymentRequest();

	}

	// openCardComponent() {
	// 	this.vvsApp.cardIOService.scanCard()
	// 	.then( (data) => {

	// 		if (!data) {
	// 			throw new Error("scanCard returned undefined");
	// 		}

	// 		// console.log({ data });
	// 		this.stripe.setPublishableKey("pk_test_RoVL46EHCSeT1KxwTlre1mvE00rEW35X0w");

	// 		const card: StripeCardTokenParams = {
	// 			number: data.cardNumber, // "4242424242424242",
	// 			expMonth: data.expiryMonth ,// 12,
	// 			expYear: data.expiryYear, // 2020,
	// 			cvc: data.cvv, // "220",
	// 			name: data.cardholderName,
	// 			postalCode: data.postalCode,
	// 		};
	// 		// const card: StripeCardTokenParams = {
	// 		// 	number: "4242424242424242",
	// 		// 	expMonth: 12,
	// 		// 	expYear: 2020,
	// 		// 	cvc: "220",
	// 		// };

	// 		return this.stripe.createCardToken(card);

	// 	// 	if (!this.tokenID) {
	// 	// 		return this.stripe.createCardToken(card);
	// 	// 	}
	// 	// })
	// 	// .then( (token) => {
	// 	// 	if (token) {
	// 	// 		this.tokenID = token.id;
	// 	// 	}

	// 	// 	return this.tokenID;
	// 	// })
	// 	// .then( tokenID => {
	// 	})
	// 	.then( token => {
	// 		return this.handleToken(token);
	// 	})
	// 	.catch( (error) => {
	// 		// console.log({ error });
	// 		RollbarService.error(error);
	// 		this.vvsApp.presentSingleAlert(error ? error.message : error);
	// 	});



	// }
	private handleToken(token: string, email?: string): any {

		this.vvsApp.presentLoading(undefined, 5000);

		// this.token = tokenId;
		// console.log({ token });
		const body = {
			token: token,
			amount: this.ticket.balance,
			currentTicketID: this.ticket.currentTicketID,
			pushPay: getPushPay(this.vvsApp, this.ticket),
			customerEmail: email
		};

		this.vvsApp.httpService.payWithCard(body)
			.subscribe(
				(data: any) => {
					this.vvsApp.handlePaymentSuccessful(data, {
						emit: () => {
							this.refreshView.emit(true);
							this.close.emit(true);
						}
					});
					const params = {
						charge_code_id: '126494',
						amount: this.ticket.balance,
						reservationID: this.ticket.confirmation_number,
						postingAccountID: this.ticket.postingAccountID
					}
					this.vvsApp.httpService.billingTransaction(params).subscribe((data: any) => {
						console.log("billingTransaction fire successfully");
					}, error => {
						console.log("error sending transaction");
					});
				},
				(errorData: {
					error: {
						error: {
							name: string, message: string
						},
						result: {
							CurrentTicket: ICurrentTicket,
							currentTicketID: number
						}
					}
				}) => {
					// debugger;
					if (errorData && errorData.error) {
						const { result, error } = errorData.error;

						if (error && error.name == "Amount has changed.") {
							if (result && result.CurrentTicket) {
								this.ticket.balance = result.CurrentTicket.balance;

								if (result.CurrentTicket.balance == 0) {
									result.CurrentTicket.balance = result.CurrentTicket.balance + "" as any;
								}

								this.vvsApp.ably.update("Amount has changed.", result as IAblyUpdate);

								const options: IPresentConfirm = {
									title: "Resubmit?",
									message: "",
									cancelText: t.NO,
									submitText: t.YES,
									cancelCB: () => () => { },
									submitCB: () => this.handleToken(token),
								};

								this.vvsApp.presentConfirm(options);

							}

							// this.cancel.emit();

							return this.vvsApp.presentSingleAlert(error ? error.message : error.name ? error.name : "Someting went wrong!");

						}



					}

					// this.tokenID = undefined;

					this.vvsApp.dismissLoading('ion-card-pay-options 201')

					this.vvsApp.somethingWentWrong();

				}
			);
	}

	// handlePaymentSuccessful(data: any) {
	// 	// debugger;
	// 	if ( data && data.updates && data.updates.CurrentTicket && data.RecentActivity ) {
	// 		this.vvsApp.ably
	// 			.update("PAY_CARD", data as IAblyUpdate)
	// 			.then($tick => {
	// 				this.vvsApp.presentSingleAlert("Success", undefined, undefined, undefined, () => {
	// 					this.cancel.emit();
	// 				});
	// 			})
	// 			.catch((reason: any) => {
	// 				logger.error(reason);
	// 				this.vvsApp.somethingWentWrong();
	// 			});
	// 	} else {
	// 		logger.error("handlePaymentSuccessful.data is undefined", { data });
	// 		this.vvsApp.somethingWentWrong();
	// 		debugger;
	// 	}
	// }

	onVoucherSelected($event: any) {
		// this.vvsApp.presentSingleAlert("Voucher Clicked");
		this.canLeave.emit(true);
		this.vvsApp.presentModal(pages.payvoucher, { ticket: this.ticket }, (val: boolean) => val && this.close.emit(val));
	}

	onCompensationSelected($event: any) {
		// this.vvsApp.presentSingleAlert("Compensation Clicked");

		const inputs = [
			{
				name: "comp",
				placeholder: `Enter you compensation code. The balance is ${this.currency.transform(this.ticket.balance)}.`,
				type: "tel",
				min: 4,
			},
		];

		const buttons = [
			{
				text: t.CANCEL,
				role: cf.cancel,
				handler: (data) => { },
			},
			{
				text: t.SUBMIT,
				handler: (data) => {

					if (data && data.comp == this.vvsApp.property.compCode) {

						const body = {
							pushPay: getPushPay(this.vvsApp, this.ticket),
							compCode: data.comp,
							currentTicketID: this.ticket.currentTicketID
						};

						this.vvsApp.httpService.payWithComp(body)
							.subscribe(
								(payData) => {
									this.vvsApp.handlePaymentSuccessful(payData, {
										emit: () => {
											this.refreshView.emit(true);
											this.close.emit(true);
										}
									});
								},
								(error) => {
									this.vvsApp.somethingWentWrong();
									logger.error(error);
									// debugger;
								}
							);
					} else {
						// The componsation code is wrong.
						this.vvsApp.presentSingleAlert("The compensation code is wrong.");
					}
					// } else {
					// }
					// this.vvsApp.presentModal("pay-comp");
					// alert("Selected: " + data.comp)
					// setTimeout( () => this.passwordShowing = false , 1000);

					// if (toString(data.password).length < 6) {
					// 	this.vvsApp.presentSingleAlert(
					// 		"Password is not valid, please try again!",
					// 		undefined, undefined, undefined,
					// 		() => this.presentPasswordAlert(where, what)
					// 	);

					// 	resolve();
					// } else {
					// 	resolve(me.unauthorizedHandler(data.password));
					// }
				},
			},
		];

		this.vvsApp.presentAlertWithInput("Enter Comp Code", inputs, buttons);
	}
}
