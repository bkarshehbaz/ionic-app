import { ChangeDetectorRef, Component } from "@angular/core";
import * as TIO from "../../../enums/ticket-item-options.enum";
import { IAllowedOperations, IAllowedOperation } from "../../../util/ticket/get-allowed-operations";
import { IActions } from "../../../providers/vvs-controller/vvs-controller";

export interface IButton {
	title: "Checkin" | "Pay" | "Checkout" | "Pull" | "Park" | "Pull Request" | "Add Car" | "Resend Eclaim";
	action: IActions;
	icon: string;
	disabled: boolean;

	hidden?: boolean;
}
/**
 * Generated class for the TicketItemOptionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: "ticket-item-options",
	templateUrl: "./ticket-item-options.html"
})
export class TicketItemOptions {
	public callback;

	statusDescription: string;

	buttons: IButton[] = [
		{
			title: "Checkin",
			action: "rcheckin",
			icon: "ios-log-in",
			disabled: false
		},
		{
			title: "Pay",
			action: "pay",
			icon: "logo-usd",
			disabled: false,
			// hidden: true
		},
		{
			title: "Checkout",
			action: "checkout",
			icon: "ios-log-out",
			disabled: false
		},
		{
			title: "Pull",
			action: "pull",
			icon: "ios-git-pull-request",
			disabled: false
		},
		{
			title: "Park",
			action: "park",
			icon: "ios-map",
			disabled: false
		},
		{
			title: "Pull Request",
			action: "pullRequest",
			icon: "ios-git-pull-request",
			disabled: false
		},
		// {
		// 	title: "Resend Eclaim",
		// 	action: "resendEclaim",
		// 	icon: "ios-resend-eclaim",
		// 	disabled: false
		// },
		{
			title: "Add Car",
			action: "add_car",
			icon: "car",
			disabled: false,
		},
	];

	constructor(private cdr: ChangeDetectorRef) {

	}

	refresh({ checkIn, checkOut, park, pay, pull, pullRequest, statusDescription, add_car, resendEclaim }: IAllowedOperations) {
		// debugger;
		// debugger;
		this.buttons[TIO.checkin].disabled = this.allowed(checkIn);
		this.buttons[TIO.checkout].disabled = this.allowed(checkOut);
		this.buttons[TIO.park].disabled = this.allowed(park);
		this.buttons[TIO.pay].disabled = this.allowed(pay);
		this.buttons[TIO.pull].disabled = this.allowed(pull);
		this.buttons[TIO.pullRequest].disabled = this.allowed(pullRequest);
		this.buttons[TIO.resendEclaim].disabled = this.allowed(resendEclaim);
		this.buttons[TIO.add_car].disabled = this.allowed(add_car);

		this.statusDescription = statusDescription;
		setTimeout(() => this.cdr.markForCheck());
	}

	allowed(operation: IAllowedOperation) {
		return operation.allowed || operation.mine;
	}

	onItemClick(val: IActions) {
		this.callback(val);
	}
}
