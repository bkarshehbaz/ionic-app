import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
import { ENV } from '../../../environments';
import { VVSApp } from '../../../providers/vvs-controller/vvs-controller';

@IonicPage({
	name: "summary"
})
@Component({
	selector: 'summary',
	templateUrl: './summary.html'
})
export class SummaryComponent {

	@Input() isPage = true;
	summaryData;
	isLoading: boolean = false;
	properties: string;
	loginUser: string;
	platform: string;
	device: string;

	data: string;
	getData;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		public viewController: ViewController,
		public vvsApp: VVSApp,
		private cdr: ChangeDetectorRef
	) {
		this.getData = this.navParams.get("data");

		if (this.getData) {
			(this.getData as any).ENV = ENV;
			this.data = JSON.stringify(this.getData, null, 3);
			console.log("this.data", this.data)
		}
	}

	ngOnInit() {
		this.getSummary();
	}

	getSummary() {
		const localData = JSON.parse(localStorage.getItem("selectedProperty"));

		if (localData && localData.hotelID && this.getData && this.getData.confirmation_number && this.getData.Customer.customerLastName) {
			console.log("localData", localData);
			console.log("this.getData", this.getData);
			this.isLoading = true;
			const payload: any = {};
			payload.hotelID = localData.hotelID;
			payload.last_name = this.getData.Customer.customerLastName;
			payload.confirmation_number = this.getData.confirmation_number;

			this.vvsApp.httpService.getSummaryDetails(payload).subscribe((res: any) => {
				this.isLoading = false;
				if (res && res.result && Array.isArray(res.result.results) && res.result.results.length > 0) {
					console.log("res.result.results", res.result.results)
					this.summaryData = res.result.results[0];
					console.log("this.summaryData", this.summaryData)
					this.cdr.detectChanges();
				}
			}, err => {
				this.isLoading = false;
			});
		} else {
			this.vvsApp.toast("Required filed not found")
		}
	}

}
