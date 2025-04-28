import { Component, Input } from "@angular/core";
import { NavController, NavParams, ViewController, IonicPage } from "ionic-angular";
import * as cf from "../../constants/constant-fields";
import { ICarPhoto, INote, ICarPhotosStepOutput } from "../../lib/vvs-bridge";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { OperationBase } from "../operation.base";
import { CheckInFormProvider } from "../../pages/checkin-form/checkin-form.provider";
import { isEmpty, get } from "lodash";
import { getPushPay } from "../../util/get-push-pay";

const logger = Logger.get("CheckInModal");

@IonicPage({
	name: "rcheckin"
})
@Component({
	selector: "rcheckin-modal",
	templateUrl: "./checkin.html",
	providers: [CheckInFormProvider]
})
export class CheckInModal extends OperationBase {

	@Input() clearMode: boolean = false;

	note = {} as INote;
	carPhotos: ICarPhoto[] = [];

	nextStatus = false;

	constructor(
		public vvsApp: VVSApp,
		protected navParams: NavParams,
		private navCtrl: NavController,
		protected viewCtrl: ViewController,
		private formProvider: CheckInFormProvider
	) {
		super(vvsApp, viewCtrl, "rcheckin");

		logger.l("navParams", navParams);
		this.ticket = this.navParams.get(cf.ticket);

		this.config =
			this.navParams.get(cf.config) ||
			this.navParams.get(cf.cardViewConfig) ||
			this.vvsApp.getCardConfig(this.ticket);
	}

	submit() {
		const dAta: any = {
			currentTicketID: this.ticket.currentTicketID,
			userID: this.vvsApp.userID,
			images: this.carPhotos,
			notes: [this.note]
		};

		dAta.pushPay = getPushPay(this.vvsApp, this.ticket);

		this.vvsApp.httpService.rCheckin(dAta).subscribe(data => {
			this.submitSuccess(data, "RCheckIn");
		}, logger.e);
	}

	onNotify(data: ICarPhotosStepOutput): void {
        if (data) {
			this.nextStatus = data.nextStatus || false;
			if (!isEmpty(data.notes)) {
				this.note = data.notes[0];
			}

			this.note = (data.notes || [] as INote[])[0];
			this.carPhotos = data.carPhotos || [];

			this.touched = this.note && !isEmpty(this.note) && !isEmpty(this.carPhotos);

        }
	}

}
