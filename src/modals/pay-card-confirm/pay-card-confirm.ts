import { Component, Input } from '@angular/core';
// import { PopoverController, ModalController } from '@ionic/angular';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Logger } from '../../providers/vvs-controller/util/logger';

const logger = Logger.get('PaymentCardConfirmComponent');

@IonicPage({
  name: "pay-card-confirm"
})
@Component({
  selector: 'app-pay-card-confirm',
  templateUrl: 'pay-card-confirm.html',
})
export class PaymentCardConfirmComponent {

  data: any;

  constructor(
    // public vvsApp: VVSApp,
    protected navParams: NavParams,
    // private navCtrl: NavController,
    protected viewCtrl: ViewController,
  ) {
    this.data = this.navParams.data;
  }

  dismiss() {
    this.viewCtrl.dismiss().then(logger.l).catch(logger.e);
  }

  submit() {
    if (!this.data.email) {
      alert('Please enter an email address to proceed.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(this.data.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    this.viewCtrl.dismiss({ email: this.data.email }).then(logger.l).catch(logger.e);
  }

}
