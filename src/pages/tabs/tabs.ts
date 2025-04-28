// tslint:disable:no-redundant-jsdoc

import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab, Tabs } from 'ionic-angular';
import * as TabsEnum from '../../enums/tabs.enum';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { forEach, omitBy, isNil, isEmpty } from "lodash";
import { licenseCodes } from "../../constants/constants";
import { ICurrentTicket, ILicenseID } from '../../lib/vvs-bridge';
import { checkValue } from "../../util/index";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { parseJSON } from '../../util/parse-json';
import { pages } from '../index';
import { CheckInFormProvider } from '../checkin-form/checkin-form.provider';
import { IPresentConfirm } from '../../providers/vvs-controller/view/alert';
import { Taptic } from '../../providers/haptic-service';
// import { /*ManateeService,*/ ManateeCode } from '../../providers/manatee-scanner/manatee-scanner';
import { fixBarCode } from '../../util/fix-vin';
import { to } from '../../util/to';
import { Debounce } from 'lodash-decorators';
// import { EnvService } from '../../providers/env-service';
import { parseLicense } from '../../util/parse-license';

const logger = Logger.get("TabsPage");

@IonicPage({
	name: "tabs",
	priority: 'high'
})
@Component({
    selector: 'tabs',
    templateUrl: './tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = pages.keybox; // Comp.HOME_PAGE;
    // tab2Root: any = Comp.CHAT_PAGE;
    tab2Root: any = pages.chat; // Comp.CHAT_PAGE;
    // tab3Root: any = ContactPage;
    tab4Root: any = pages.checkin; // Comp.Form;
    tab5Root: any = pages.logs; // Comp.LOGS_PAGE;

    // isIos    : boolean = true;
    // isAndroid: boolean = false;

    // thisClass: string = "";

    // mybadge: number = 5;

    // currentTabIndex: number = 0;
    currentTab: Tab;

	TIER_ID: 0|1|2 = 1;
	HIDE_SCANNER = true;

    _tabs: Tabs;
    @ViewChild('myTabs')
    set tabs(val: Tabs) {
        if (val) {
            this._tabs = val;
            this.vvsApp.tabsRef = val;
        }
    }
    get tabs() {
        return this._tabs;
	}


    // license: ILicenseID;

	// checkInParams: any;
	


    // tslint:disable-next-line: member-ordering
    constructor(
		public vvsApp: VVSApp,
		private navCtrl: NavController,
		private navParams: NavParams,
		private cdr: ChangeDetectorRef,
	) {

        this.navCtrl.swipeBackEnabled = false;


        const firstTimeLogin = this.navParams.get("firstTimeLogin");
        if (checkValue(firstTimeLogin) && checkValue(firstTimeLogin.loginUser) && firstTimeLogin.value === true) {
            this.vvsApp.reactive.onPropertySelected();
        }

    }

    onTabChange(tab: Tab) {
		Taptic.light();
		// debugger;
        tab.tabTitle == "Scan" ? this.startScanner() : (this.currentTab = tab);

		setTimeout( () => {
			this.cdr.detectChanges();
		});
    	// : tab.index === TabsEnum.CHAT && ENV.production === true ? this.vvsApp.presentSingleAlert("Chat", "Coming soon!")
	}

    ionViewDidEnter() {
        // logger.debug("ionViewDidEnter");
        // this.subscribeMe();
	}

	ionViewDidLoad() {
		this.vvsApp.recentActivityBadge.refresh();
	}

	@Debounce(250)
    changeTab(index: number) {
        // logger.debug("trying at index: " + index + ". Lucas, please make me work!");
        // setTimeout(() => {
		this.tabs.select(index);
        // }, 100);
    }

    //TODO verify that the ID scanning is working property and covers any scenario
    //including impossible ones like other states.

    /**
     * [startScanner description]
     * @method startScanner
     * @return {[type]}     [description]
     */
    startScanner() {

		this.vvsApp.barcodeScanner.scan()
		.then((response) => { // IOS
			if (response.cancelled == true) {
				return;
			}
			// alert(JSON.stringify(response, null, 4))
			switch (response.format) {
				case 'QR_CODE': // TICKET
					this.handleQR(response.text);
					break;
				case 'PDF_417': // LICENSE ID
					this.handleLicense(response.text);
					break;
				case 'CODE_39': // VIN
				case 'CODE_128': // VIN
					this.handleVIN(response.text);
					break;
			}
		})
        // this.vvsApp.manatee.startScanning()
		// .then((response) => { // IOS

		// 	logger.i("startScanner", "type", response.type, "code", response.code);

		// 	if (response && response.code) {

		// 		// this.vvsApp.presentSingleAlert("response.type to debug customer license: ", response.type);
		// 		// this.vvsApp.presentSingleAlert("response.code to debug customer license: ", response.code);

		// 		// we use zone to update the view since the change occured outside angularJS
		// 		switch (response.type) {
		// 			case ManateeCode.qr: // TICKET
		// 				this.handleQR(response);
		// 				break;
		// 			case ManateeCode.license: // LICENSE ID
		// 				this.handleLicense(response);
		// 				break;
		// 			case ManateeCode.vin: // VIN
		// 				this.handleVIN(response);
		// 				break;
		// 		}

		// 	} else {
		// 		logger.info(response);
		// 	}

		// })
		.catch( e => {
			logger.e(e);
			alert(e.message);
		});

    }

    handleQR(response: string) {
        logger.i("getCurrentTicketByTicketNumber", { currentTab: this.currentTab, CHECKIN_INDEX: TabsEnum.CHECKIN });

		if (!response) {
			return;
		}
        this.vvsApp
            .lss
            .getCurrentTicketByTicketNumber(response)
            .then( (ticket: ICurrentTicket) => {

                logger.i("getCurrentTicketByTicketNumber", { ticket, currentTab: this.currentTab, CHECKIN_INDEX: TabsEnum.CHECKIN });

                if (ticket) { // tickets exists
					this.handleTicketExists(ticket);
                } else {
					let message = "Would you like to create a new ticket?";
					let submitText = "Yes";
					const title = "Ticket Not Found";

                    if (this.currentTab.root === pages.checkin) { // TabsEnum.CHECKIN) {

						const val = this.userIsWorkingOnTicket();
						logger.info("userIsWorkingOnTicket", val);

						if (val) {
							message = "You are already working on a ticket,\nwould you like to start over?";
							submitText = "Reset";
						}

						const options: IPresentConfirm = {
							title,
							message,
							submitText,
							submitCB: (data) => {
								this.vvsApp.reactive.newCheckInFromTab(response, undefined);
							}
						};

                        this.vvsApp.presentConfirm(options);

					} else {

						const options: IPresentConfirm = {
							title,
							message,
							submitText,
							submitCB: (data) => {
								this.vvsApp.newTicketNumberFromScan.ticketNumber = response;
								this.changeTab(TabsEnum.CHECKIN);
							}
						};

                        this.vvsApp.presentConfirm(options);

                    }
                }
            })
            .catch(logger.e);

    }

    /**
     * [handleLicense description]
     * @method handleLicense
     * @param  {string}            response [description]
     * @param  {string}}           type     [description]
     * @return {[type]}                     [description]
     */
    handleLicense(response: string) {

        if (response) {
            // const licenseJSON = parseJSON(response.code) as any; // JSON.parse(response.code);
            // const license = {} as ILicenseID;

            // license.state = licenseJSON.State;

			// forEach(licenseJSON.Fields, (item: any) => {
            //      license[licenseCodes[item.ID]] = item.Value;
			// });

			const license = parseLicense(response);

			this.vvsApp.lss.getCurrentTicketByCustomer(license)
			.then( (ticket) => {
				if (ticket) { // ticket exists
					this.handleTicketExists(ticket);
				} else {

					const title = "Customer Not Found";
					let message = "Would you like to create a new ticket?";

					if (this.currentTab.root === pages.checkin) { // TabsEnum.CHECKIN) {

						const val = this.userIsWorkingOnTicket();
						logger.info("userIsWorkingOnTicket", val);

						if (val) {
							message = "You are already working on a ticket,\nwould you like to start over?";
						}

						const options: IPresentConfirm = {
							title,
							message,
							submitText: "Reset",
							submitCB: (data) => {
								this.vvsApp.reactive.newCheckInFromTab(undefined, license);
							}
						};

						this.vvsApp.presentConfirm(options);

                    } else {
						const options: IPresentConfirm = {
							title,
							message: "Would you like to create a new ticket?",
							submitText: "Yes",
							submitCB: (data) => {
								this.vvsApp.newTicketNumberFromScan.license = license;
								this.changeTab(TabsEnum.CHECKIN);
							}
						};

                        this.vvsApp.presentConfirm(options);
                    }
				}
			});

		}

    }

    /**
     * [handleVIN description]
     * @method handleVIN
     * @param  {string}             response [description]
     * @param  {string}}            type     [description]
     * @return {[type]}                      [description]
     */
    async handleVIN(response: string) {
        //TODO verify and do something with the ticket.
        if (response) {
			// this.vvsApp.presentSingleAlert(`Scanned ${response.type}`, `VIN: ${response.code}`);
			const barcode = fixBarCode(response);
			const [ticket] = await to(this.vvsApp.lss.getCurrentTicketsByVIN(barcode));
			logger.info("getCurrentTicketsByVIN", ticket);
			if (ticket) { // ticket exists
				this.handleTicketExists(ticket);
			} else {
				this.vvsApp.presentSingleAlert("No Action", `VIN Not Found: ${response}`);
			}
        }
	}

	userIsWorkingOnTicket() {
		const ticket = CheckInFormProvider.instance.getTicket();

		if (!ticket.CustomerStep) { // new ticket
			return false;
		}

		const raw = omitBy(ticket.CustomerStep, isNil );
		if (raw && raw.licenseID) {
			if (isEmpty(raw.roomNumber)) {
				delete raw.roomNumber;
			}
			if (isEmpty(omitBy(raw.licenseID, isNil))) {
				delete raw.licenseID;
				if (isEmpty(raw)) {
					return false;
				}
				// return !isEmpty(raw);
			}
		} else {
			return false;
		}

		return true;

	}

	private handleTicketExists(ticket: ICurrentTicket) {
		this.navCtrl.push(pages.ticketdetails, { ticket });
	}

}
// tslint:enable:no-redundant-jsdoc
