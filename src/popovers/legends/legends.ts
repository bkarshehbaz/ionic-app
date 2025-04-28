import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';

export interface Legend {
    title: string;
    icon: string;
    color: string;
	description?: string;
	expanded?: boolean;
}
@IonicPage({
	name: "legends"
})
@Component({
  selector: "legends",
  templateUrl: "./legends.html"
})
export class LegendsComponent {

		// tslint:disable: no-multi-spaces
    legengMap: Legend[] = [
		{ title: "Overnight",      icon: "micon-ios-moon",            color: "#223D6B"	},
		{ title: "Hot Car",        icon: "micon-fireball",            color: "red"	},
		{ title: "Inbound Stage",  icon: "micon-arrow-return-right",   color: "green"	},
		{ title: "Outbound Stage", icon: "micon-arrow-return-left",  color: "red"		},
		{ title: "Call down",      icon: "micon-android-call",        color: "orange"		},
		{ title: "Checkout",       icon: "micon-android-exit",        color: "red"		},
		{ title: "In",             icon: "micon-ios-location",        color: "green"	},
		{ title: "Out",            icon: "micon-ios-location",        color: "red"		},
		{ title: "Transmission Type", icon: "micon-ios-manual",       color: "red"		},
	];
	// tslint:enable: no-multi-spaces

	constructor() {

	}

}
