import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { Nav } from 'ionic-angular';
import { IUser } from '../lib/vvs-bridge';
import { VVSApp } from '../providers/vvs-controller/vvs-controller';
import * as cf from '../constants/constant-fields';
import * as cat from '../constants/event-categories';
import { Logger } from '../providers/vvs-controller/util/logger';

const logger = Logger.get("app.component");

export interface Page {
    title: string;
    action: () => void;
    icon: string;
}

import { cloneDeep, isBoolean, isEmpty } from 'lodash';

import { ENV } from '../environments/index';
import { pages } from '../pages';
import { DomSanitizer } from '@angular/platform-browser';
import { RollbarService } from '../services/rollbar';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: "app",
    templateUrl: "./app.html"
})
export class AppComponent implements AfterViewInit, OnDestroy {

    rootPage: string;

    _nav: Nav;
    @ViewChild(Nav)
    set nav(val: Nav) {
        this._nav = val;
    }
    get nav() {
        return this._nav;
    }

    backButtonPressed: boolean = false;  //用于判断返回键是否触发

    menuContent = {};

    menuEnabled: boolean = false;
    loginUser: IUser = {} as IUser;

    isLoading: boolean = false;

    // used for an example of ngFor and navigation
    pages: Page[] = [

        // {
        //     title: 'Homepage',
        //     icon: 'home',
        //     action: () => {
        //         if (this.nav.getActive().index === 0) {
        //             this.rootPage = pages.tabs; //TabsPage;
        //         }
        //     }
        // },

        // { title: 'Recovery'       , icon: 'alarm'  ,  action : cf.recovery },
        // {
        //     title: 'Reminder',
        //     icon: 'alarm',
        //     action: () => {
        //         this.nav.push(pages.reminders).then().catch(logger.e);
        //     }
        // },

        {
            title: 'Refresh',
            icon: 'nuclear',
            action: () => {
                this.vvsApp.httpService.initializeTickets("side menu");
            }
        },
        {
            title: 'Do_Sync',
            icon: 'nuclear',
            action: () => {
                this.vvsApp.httpService.doSync();
            }
        },
        // {
        //     title: 'Settings',
        //     icon: 'settings',
        //     action : () => {
        //         this.nav.push(pages.settings);
        //     }
        // },

        // { title: 'Taxi Directory' , icon: 'call'   ,  action : cf.taxi     },
        // { title: 'Device Info'    , icon: 'info'   ,  action : cf.info     },

        {
            title: 'Sign Out',
            icon: 'log-out',
            action: () => {
                this.logout();
            }
        }
    ];

    isDestroyed = false;

    env = ENV;

    constructor(public vvsApp: VVSApp, private sanitizer: DomSanitizer) {
        logger.l("MyApp loaded", ENV);
        this.vvsApp.setAppNav(this.nav);

        logger.info("I'm in " + window.indexedDB ? "WKWebView!" : "UIWebView!");

        this.vvsApp.ready().then(() => {
            this.dealWithRootPage();
            setTimeout(() => this.subscribeToAppService(), 500);
        }).catch(logger.e);
    }

    // busyMode: boolean = false;

    // get busyMode() {
    //     return this._busyMode;
    // }

    // set busyMode(val) {
    //     // debugger;
    //     this._busyMode = val;
    //     this.toggleBusyMode();
    // }

    // async toggleBusyMode(ev) {
    //     debugger;
    //     // this._busyMode = !this._busyMode;
    // 	await this.vvsApp.lss._setString("BUSY_MODE", ev + "")
    //     // .then( (d) => {
    //     //     debugger;
    //     // })
    //     // .catch( (error) => {
    //     //     debugger;
    //     // });
    //     this.vvsApp.busyModeSubject.next(ev);
    // }

    ngOnDestroy() {
        this.isDestroyed = true;
    }
    getTokenKey(): string {
        const propertyId = this.vvsApp && this.vvsApp.property ? this.vvsApp.property.propertyID : undefined;
        return (ENV.production && propertyId === 1000000002) ? ENV.tkM : ENV.tk;
      }

    ngAfterViewInit() {
        this.nav.swipeBackEnabled = false;

        setTimeout(() => {
            const body = <HTMLDivElement>document.body;
            const script = document.createElement('script');
            script.innerHTML = '';
            // debugger;
            // below are the updated chnages. const propertyId = this.vvsApp?.property?.propertyID;
            const propertyId = this.vvsApp && this.vvsApp.property ? this.vvsApp.property.propertyID : undefined;
            const tokenKey = (ENV.production && propertyId === 1000000000) ? ENV.tkM : ENV.tk;
            
            console.log("ENV.tk", tokenKey);
            script.src = 'https://secure.safewebservices.com/token/Collect.js';
            script.setAttribute('data-tokenization-key', tokenKey);

            script.async = true;
            script.defer = false;
            body.appendChild(script);
        });
    }

    async ionViewWillEnter() {
        this.isDestroyed = false;
        this.nav.swipeBackEnabled = false;
    }

    ngOnInit() {
        // this.vvsApp.ready()
        // .then( () => this.vvsApp.lss._getString("BUSY_MODE") )
        // .then( (val) => this.busyMode = val == "true" ? true : false);
    }

    logout() {
        this.vvsApp.logout(this.nav);
    }

    async dealWithRootPage() {
        try {
            const user = await this.vvsApp.lss.getLoginUser();

            if (isEmpty(user)) {
                this.nav.setRoot(pages.login);
            } else if (user.CurrentProperty) {
                this.rootPage = pages.tabs;
                this.loginUser = cloneDeep(user);
                this.setMenu(this.loginUser);
            } else {
                if (isEmpty(user.properties)) {
                    this.nav.setRoot(pages.login);
                } else {
                    this.nav.setRoot(pages.selectsearch, { user });
                }
            }

        } catch (e) {
            RollbarService.error(e);
        }

    }

    subscribeToAppService() {
        this.vvsApp.reactive.app
            .pipe(takeWhile(_ => !this.isDestroyed))
            .subscribe(
                (data) => {
                    // logger.debug(data);
                    switch (data.category) {
                        case cat.FIRST_TIME_LOGIN:
                            this.setMenu(data.data.loginUser);
                            this.vvsApp.ably.subscribe();
                            break;

                        // case cat.DISABLE_MENU:
                        // 	this.menuEnabled = data.data;
                        // 	break;

                        default:
                            //   throw new Error("Default subscribeToAppService");
                            logger.e(new Error("Default subscribeToAppService"));
                    }
                },
                logger.error
            );
    }

    setMenu(user: IUser = this.vvsApp.user) {
        this.menuEnabled = true;
        this.loginUser = user;
        this.vvsApp.ably.subscribe();
    }

    presentSearchModal() {
        this.vvsApp.presentSearchModal(); // (pages.globalsearch, undefined, undefined, undefined);
    }

    openPage(page: Page) {
        this.vvsApp.closeMenu();
        page.action();
    }

}
