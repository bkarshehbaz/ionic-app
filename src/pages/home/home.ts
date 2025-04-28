import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentFactory, ViewRef } from '@angular/core';
import { IUser } from '../../lib/vvs-bridge/user/user.interface';

import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { Events, NavController, IonicPage, Refresher } from 'ionic-angular';
import { forEach, isEmpty, cloneDeep } from 'lodash';
import * as cat from './../../constants/event-categories';

import { LoginPage } from './../login-page/login-page';
import { Logger } from "./../../providers/vvs-controller/util/logger";
import { IFullTicket } from '../../util/process-full-ticket';

import { pages } from '..';
import { TicketItemOptions } from './ticket-item-options/ticket-item-options';
import { Debounce } from 'lodash-decorators/debounce';
import { NumericMap } from '../../lib/vvs-bridge';
import { RollbarService } from '../../services/rollbar';
import { Delay, Throttle } from 'lodash-decorators';
import { DomSanitizer } from '@angular/platform-browser';
// import { providers } from '../../../.tmp/src/providers/app.providers.mock';
import { FilterTicketsByPipe } from '../../pipes/filter-tickets-by';

const logger = Logger.get("home.component");

//https://www.joshmorony.com/creating-a-custom-expandable-header-component-for-ionic-2/
@IonicPage({
	name: "keybox",
	priority: 'high'
})
@Component({
    selector: "home",
    templateUrl: "./home.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterTicketsByPipe
	],
})
export class HomePage {

    title: string = "Keybox";

    _tab: string = "staged";

	set tab(val: string) {
		this._tab = val;
		this.detectChanges();
	}
	get tab() {
		return this._tab;
	}

    ticketObject: NumericMap<IFullTicket> = {};
	homeActive = true; // Subject<boolean> = new Subject();
	
	logo_svg: any; // = logoSVG;

	all_cars_order: "asc" | "desc" = "desc";

    constructor(public events: Events,
				public vvsApp: VVSApp,
				public componentFactoryResolver: ComponentFactoryResolver,
				public navCtrl: NavController,
				private sanitizer: DomSanitizer,
				private filterPipe: FilterTicketsByPipe,
                public cdr: ChangeDetectorRef) {

        this.vvsApp
            .homeInOut
            .subscribe(
                (num: number) => {
                    if (num === 0) {
                        this.ionViewWillLeave();
                    } else if (num === 1) {
                        this.ionViewWillEnter();
                    }
                },
                logger.e
			);
		
		// setTimeout( () => {
		// 	logger.info("ChangeDetectorRef", this.cdf);		
		// 	this.cdf.detectChanges();
		// }, 10000)

		// this.logo_svg = this.sanitizer.bypassSecurityTrustHtml(logoSVG);

	}

	@Throttle(300)
	sortAll() {
		logger.info("sortAll called");
		this.all_cars_order = this.all_cars_order == "asc" ? "desc" : "asc";
		// this.updateView();
		this.tabs.allcars = this.filterPipe.transform(this.ticketObject, 'all',   undefined, this.all_cars_order);
		this.detectChanges();
	}

	doRefresh(refresher: Refresher) {
		this.vvsApp.httpService.doSync();

		// refresher.snapbackDuration

		setTimeout(() => {
			// console.log('Async operation has ended');
			refresher
			&& refresher.complete
			&& refresher.complete();
		}, 2000);


	}

    ionViewDidEnter() {
		logger.info("home:ionViewDidEnter");
		this.load();
		// this.vvsApp.httpService.doSync();
    }

	@Delay(500)
	load() {
		this.vvsApp.lss.getTicketTypeData()
            .then( () => this.vvsApp.lss.getCurrentTicketData() )
			.then( (ticketsMap) => {
				this.ticketObject = ticketsMap;
				this.updateView();
			})
			// .then( () => this.vvsApp.lss.getParkLocationData() )
			.then( () => this.vvsApp.lss.getParkAreaData() )
			.catch(RollbarService.error);

        // this._ionViewDidLoad();
	}

    SingleTicket(tickets: IFullTicket[]) {
		logger.info("SingleTicket", tickets);
        forEach(tickets, (ticket: IFullTicket) => {
			this.ticketObject = cloneDeep(this.ticketObject);
			this.ticketObject[ticket.currentTicketID] = ticket;
            this.vvsApp.ticketOptionSubject.next(ticket);
        });
        this.updateView();
    }

	tabs = {
		staged: [],
		pull: [],
		allcars: [],
		mycars: [],
		busycars: [],
	};

    /**
     * [updateView description]
     * @param  {[type]} results [description]
     * @return {[type]}         [description]
     */
	@Debounce(500)
    updateView(): void {
		logger.info("update-view");

		this.tabs.staged = this.filterPipe.transform(this.ticketObject, 'staged', undefined, 'desc');
		this.tabs.pull   = this.filterPipe.transform(this.ticketObject, 'pull',   undefined, 'desc');
		this.tabs.allcars = this.filterPipe.transform(this.ticketObject, 'all',   undefined, this.all_cars_order);
		this.tabs.mycars = this.filterPipe.transform(this.ticketObject, 'parked', undefined, 'desc');
		this.tabs.busycars = this.filterPipe.transform(this.ticketObject, 'busy', undefined, 'desc');


		this.detectChanges();

	}

	detectChanges() {
		this._detectChanges();
		setTimeout( () => {
			this._detectChanges();
		});
	}

	private _detectChanges() {
		if (this.cdr && !(this.cdr as ViewRef).destroyed) {
			this.cdr.detectChanges();
		}
	}

    presentLegendPopover(event: Event) {
        this.vvsApp.presentPopover(pages.legends, {}, event);
	}

    // loading:Loading;
    ionViewDidLoad() {
		logger.l("_ionViewDidLoad home");
		// this.vvsApp.ticketItemOptions;
		this.vvsApp.ticketItemOptions = this.componentFactoryResolver.resolveComponentFactory(TicketItemOptions) as ComponentFactory<TicketItemOptions>;


        // detect changess
        // this.cdf.markForCheck();
		this.detectChanges();

        this.vvsApp
            .lss
            .getLoginUser()
            .then( (loginUser: IUser) => {
                if (isEmpty(loginUser)) {
                    this.navCtrl.setRoot(LoginPage).catch(logger.e);
                    return false;
                }
			})
			.then( (keepExec: boolean) => {
                if (keepExec === false) {
                    return false;
                }
				this.vvsApp.reactive.tickets
					.subscribe( (event) => {

						logger.l(
							"HomeService subscription",
							event,
							{ HOME_TICKETS: cat.HOME_TICKETS, SINGLE_TICKETS: cat.SINGLE_TICKETS }
						);

						switch (event.category) {

							case cat.HOME_TICKETS:
								this.ticketObject = event.data;
								// this.tickets = values(this.ticketObject); //Object.keys(this.ticketObject).map(key => this.ticketObject[key]);
								this.updateView();

								this.vvsApp.dismissLoading('');
								break;

							case cat.SINGLE_TICKETS:
								this.SingleTicket(event.data as IFullTicket[]);
								break;

							default:
								logger.e("This is event fell into the default statement, why?");
								break;
						}

					});

					// this.vvsApp.lss.getCurrentTicketToDisplayIn(cf.home);
				});
    }

    ionViewWillEnter() {
		logger.info("home:ionViewWillEnter");
        this.homeActive = true;
		this.detectChanges();
    }
    ionViewWillLeave() {
		logger.info("home:ionViewWillLeave");
        this.homeActive = false;
        this.detectChanges();
	}

	vvsViewWillReenter() {
		logger.info("home:vvsViewWillReenter");
		this.vvsApp.dismissLoading('home:reenter');
		this.ionViewWillEnter();
	}

}
