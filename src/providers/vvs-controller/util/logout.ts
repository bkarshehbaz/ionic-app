import { NavController } from 'ionic-angular';
import { VVSApp } from "../vvs-controller";
import * as t from '../../../constants/constant-titles';
import { Logger } from './logger';
import { pages } from '../../../pages';
// import { RollbarService } from '../../../services/rollbar';
// import { Monitoring } from '../../../services/monitoring';
import { RollbarService } from '../../../services/rollbar';
import { finalize } from 'rxjs/operators';

const logger = Logger.get("logout");

export function _logout(me: VVSApp, navCtrl: NavController, confirm: boolean) {

    return new Promise( (resolve, reject) => {
        const title = "Sign out now";
        const message = "";
        const buttons = [
            {
                text: t.CANCEL,
                handler: () => {
                //logger.debug('Disagree clicked');
                }
            },
            {
                text: t.YES,
                handler: async() => {

					try {

						// RollbarService.configuration = {} as any;
						RollbarService.configure({
							payload: {
								propertyID: null,
								stage: null,
								person: {
									// companyID: me.vvsApp.companyID,
									id: null,
									username: null
								},
							}
						});

						me.presentLoading(t.LOGGING_OUT, 3000);

						me.closeMenu();

						me.lss.clearLoginUser();
						me.lss.clearLocalStorage();

						navCtrl.setRoot(pages.login).catch(logger.e);


						me.httpService.signOut()
						.pipe(
							finalize( () => {
								me.dismissLoading('logout');
							})
						)
						.subscribe(
							(data) => {
								me.dismissLoading('logout');

								if (data == false) {
									logger.warn("signOut: no need to logout, taking you to the login page");
								}
							},
							logger.error
						);


						resolve();

					} catch(e) {
						me.lss.clearLoginUser();
						me.lss.clearLocalStorage();
					}

                }
            }
		];

		if (!confirm) {
			return buttons[1].handler();
		}

        me.presentConfirm({title, message, buttons});
    });

}
