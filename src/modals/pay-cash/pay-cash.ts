import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { IonDigitKeyboard, IonDigitKeyboardOptions } from './ion-digit-keyboard/ion-digit-keyboard';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { IFullTicket } from '../../util';
import * as cf from  "../../constants/constant-fields";
import { CurrencyPipe } from '@angular/common';
import { get, toNumber } from 'lodash';
import { getPushPay } from '../../util/get-push-pay';
import { tap, finalize } from 'rxjs/operators';
// import { Renderer3 } from '@angular/core/src/render3/renderer';

const logger = Logger.get("pay-cash-component");

@IonicPage({
	name: "paycash"
})
@Component({
    selector: "pay-cash-component",
    templateUrl: "./pay-cash.html",
    // host: {role:'dialog'},                  // NOTE remove it temporarily
    // encapsulation: ViewEncapsulation.None,  // NOTE remove it temporarily
})
export class PayCashComponent {

    ticket: IFullTicket;
    cashAmount: string = "";
    cashAmountNumber: number = 0;
    cashAmountString: string = "";
    // cashAmounToShow : string = "";
    // @ViewChildren(PickerColumnCmp) _cols: QueryList<PickerColumnCmp>;
    didLoad: boolean;
    itCanLeave: boolean = false;
    

    @ViewChild(IonDigitKeyboard) keyboard: IonDigitKeyboard;
    @ViewChild("paymentInfo", { read: ElementRef }) paymentInfo: ElementRef;
    @ViewChild("cashInput", { read: ElementRef }) cashInput: ElementRef;

    public keyboardSettings: IonDigitKeyboardOptions = {
        align: 'center',
        //width: '85%',
        visible: true,
        leftActionOptions: {
            iconName: 'ios-backspace-outline',
            fontSize: '1.4em'
        },
        rightActionOptions: {
            iconName: 'ios-checkmark-circle-outline',
            // text: '.',
            fontSize: '1.3em'
        },
        roundButtons: false,
        showLetters: false,
        swipeToHide: false,
        // Available themes: IonDigitKeyboard.themes
        theme: 'alihossein'
    };

    constructor(
        public vvsApp: VVSApp,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private renderer: Renderer2,
        private currencyPipe: CurrencyPipe
    ) {

        this.ticket = this.navParams.get(cf.ticket);
        // this.balance = 100;
        this.didLoad = false;

        this.cashAmount = this.currencyPipe.transform(0, 'USD');

    }

    // _colChange(ev) {
    //     this.cashAmount = ev.value;
    //     // logger.debug(ev.value);
    // }

    cancel(val: boolean) {
        this.itCanLeave = true;
        this.viewCtrl
            .dismiss(val)
            .then( () => {} )
            .catch(logger.e);
    }

    submit() {
        if ( (this.cashAmountNumber - this.ticket.balance) >= 0 ) {
            this.vvsApp.httpService
            .payWithCash({
                amount: this.ticket.balance,
                currentTicketID: this.ticket.currentTicketID,
                pushPay: getPushPay(this.vvsApp, this.ticket),
            })
            .pipe(
                tap( () => this.vvsApp.presentLoadingInfinite() ),
                finalize( () => this.vvsApp.dismissLoading("pay-cash") ),
            )
            .subscribe(
                (data) => {
                    this.vvsApp.handlePaymentSuccessful(data, {
                        emit: () => {
                            this.itCanLeave = true;
                            this.vvsApp.dismissModal(this.viewCtrl, true, this.ticket);
                        }
                    });
                },
                (error) => {
                    // debugger;
                    if (get(error, "error.error.sqlMessage") == "Payment is already complete") {
                        this.itCanLeave = true;
                        this.vvsApp.dismissModal(this.viewCtrl, true, this.ticket);
                    }
                    // this.vvsApp.somethingWentWrong();
                    logger.error(error);
                }
            );
        } else {
            this.vvsApp.presentSingleAlert("The change must be greater or equal to 0");
        }
        // this.vvsApp.presentSingleAlert("Payment logic to be implemented!");
        // this.vvsApp.presentSingleAlert("Payment was successful");
        // this.dismiss(true);

        // this.vvsApp
        //     .httpService
        //     .payWithCash();
    }

    ionViewCanLeave() {
        return this.itCanLeave;
    }

    ionViewDidLeave() {
        // this.numbersColumn = undefined;
        // this._cols = undefined;
    }

    ngOnInit(): void {
        // debugger;
        setTimeout( () => {
            const height = Math.abs(this.keyboard.el.nativeElement.offsetTop - this.paymentInfo.nativeElement.offsetTop);
            // debugger;
            this.renderer.setStyle(this.paymentInfo.nativeElement, "height", height + "px");
        },100);

        // // Subscriber way
        // this.keyboard.onClick.subscribe((key) => {
        //     logger.l('From subscriber: ', key);
        // });
    }

    // transformAmount(element: any){
    //     this.cashAmount = this.currencyPipe.transform(this.cashAmount, 'USD');
    //     // Remove or comment this line if you dont want 
    //     // to show the formatted amount in the textbox.
    //     element.target.value = this.cashInput;
    // }

    // public showKeyboard() {
    //     this.keyboard.show();
    // }

    // /**
    //  * [numberClick description]
    //  * @param  {number} key [description]
    //  * @return {[type]}     [description]
    //  */
    // public numberClick(key: number) {
    //     logger.l('From event: ', key, this.cashAmount);
    //     this.cashAmount = this.cashAmount + key;
    // }

    // public hideKeyboard() {
    //     this.keyboard.hide();
    // }


    numberClick(key: string|number) {
        // logger.l('From event: ', key, this.cashAmount);
        // this.cashAmount = this.cashAmount + key;

        const cashAmount = toNumber(this.cashAmount);

        if ( key === "left" && this.cashAmountString.length > 0 ) {
            this.cashAmountString = this.cashAmountString.substring(0, this.cashAmountString.length - 1);
            // return;

        } else if ( key === "right" ) {
            this.submit();
            // return;

        } else if ( this.cashAmountString.length > 3 ) {
            // tslint:disable-next-line: no-debugger
            debugger;
            // return;

        } else if ( key === "0" && this.cashAmountString.length === 0 ) {

        } else {
            switch (key) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
                    this.cashAmountString += key;
                    break;
            }
        }

        this.cashAmountNumber = Number(this.cashAmountString);
        this.cashAmount = this.currencyPipe.transform(this.cashAmountNumber, 'USD');

    }

    ionViewWillEnter() {
        // this.vvsApp.presentLoading("",3000);
    }
    ionViewDidLoad() {
        // logger.l("dollarArray: ", dollarArray);
        // logger.l("dollarArrayLodash: ", times(200, i => { return {text:"$"+i+".00",value:i}; }));
        // this.didLoad = true;
        // this.refresh();
        // Subscriber way
        // logger.l(this.keyboard);
        // this.keyboard.clickSub.subscribe((key) => {
        //     logger.l('From subscriber: ', key);
        // });
    }

    // refresh() {
    //     setTimeout( () => {
    //         // logger.debug(e.REFRESH);
    //         // logger.debug(this._cols);
    //         this._cols
    //             .forEach( (column:PickerColumnCmp) => {
    //                 column.refresh();
    //                 column.colHeight = 100;
    //
    //
    //                 // column.colHeight()
    //
    //             });
    //
    //         // this._cols.first.setSelected(1,100);
    //         // this._cols.first.setSelected(0,100);
    //
    //
    //     }, 200);
    // }


    // numbersColumn:PickerColumn  = {
    //                                   name:"dollar",
    //                                   selectedIndex: 0,
    //                                   options:times(200, i => ({text:"$"+i+".00",value:i}) ),
    //                                   columnWidth:'100%'
    //                               };

}

