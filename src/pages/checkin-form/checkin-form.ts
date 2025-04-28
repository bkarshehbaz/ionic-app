import { Component, Renderer2, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Content, NavController, IonicPage, Toggle } from 'ionic-angular';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { cloneDeep, isEmpty, get } from "lodash";
import * as t from '../../constants/constant-titles';
import * as c from '../../constants/css-values';
import * as cat from '../../constants/event-categories';
import * as msf from '../../constants/msf';
// import { debounceTime } from 'rxjs/operators/debounceTime';
// import { tap } from 'rxjs/operators/tap';
import { takeWhile, debounceTime, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
    ICarPhotosStepOutput,
    ICarStepModel,
    ICarStepOutput,
    ICurrentStep,
    ICustomerStepModel,
    ICustomerStepOutput,
    ILicenseID,
    INote,
    IStep,
} from '../../lib/vvs-bridge';

import { Logger } from "../../providers/vvs-controller/util/logger";
import { pages } from '../index';
import { Debounce } from 'lodash-decorators/debounce';
import { Delay } from 'lodash-decorators/delay';
import { KeyboardService } from '../../providers/keyboard/keyboard-service';
import { CheckInFormProvider } from './checkin-form.provider';
import { IPresentConfirm } from '../../providers/vvs-controller/view/alert';
import { Taptic } from '../../providers/haptic-service';
import { Throttle } from 'lodash-decorators';

const logger = Logger.get("MultiStepForm");


export type TicketCombined = ICustomerStepModel & ICarStepModel & any[] & INote & { notes: string } & number & ILicenseID;

//NOTE maybe later, all the validators can be in service provider.
@IonicPage({
    name: "checkin-form"
})
@Component({
    selector: 'checkin-form',
    templateUrl: './checkin-form.html',
    providers: [
        CheckInFormProvider
    ]
})
export class MultiStepForm implements OnDestroy {

    // @ViewChild('autoToggle') autoToggle: Toggle;
    title: string = 'Check-In';
    step: IStep = msf.customer;
    // nextStatus: boolean = false;
    onKeyboardHideTimeout: any; //NodeJS.Timer;
    // thisClass: string = "";
    customerPrevStatus: boolean = true;
    prevStatus: boolean = msf.customer.prevStatus;
    isScanning: boolean = false;
    minute: number = 60 * 1000;
    handleNotEditingSubject = new Subject<any>();
    // showUnfinishedTicketDialogSubject = new Subject<ICurrentStep>();
    isNative = true;
    @ViewChild(Content) content: Content;
    // private keyboardHideSub;
    // private keybaordShowSub;


    constructor(
        public vvsApp: VVSApp,
        public formProvider: CheckInFormProvider,
        private navCtrl: NavController,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
    ) {

        this.handleNotEditingSubject
            .pipe(debounceTime(300), takeWhile(_ => !this.isDestroyed))
            .subscribe(() => this.handleNotEditing());
    }

    // get busyMode() {
    //     return this.formProvider.busyMode;
    // }

    toggleClick() {

        const options: IPresentConfirm = {
            title: 'Are you want to toggle the busy mode?',
            message: "",
            // submitText: t.AGREE,
            submitCB: (data) => {
                // debugger;
                // this.submit.emit(modalFooterOptions.submit);
                // this.autoToggle.checked = !this.autoToggle.checked;
                setTimeout(() => {
                    this.formProvider.busyMode = !this.formProvider.busyMode;
                    this.content.resize();
                    this.cdr.detectChanges();
                })
            }
        };

        this.vvsApp.presentConfirm(options);

    }

    ngOnInit() {
        this.isDestroyed = false;
        this.setCurrentStep(msf.customer);
        this.formProvider.resetForm();

        setTimeout(() => {
            this.content.resize();
            this.cdr.detectChanges();
        })
    }

    ngOnDestroy() {
        this.isDestroyed = true;
    }

    ionViewDidLoad() {
        this.scrollContentElement = this.content.getScrollElement();
        this.vvsApp.reactive.form
            .pipe(takeWhile(_ => !this.isDestroyed))
            .subscribe(
                (event) => {
                    if (event.category === cat.NEW_SCAN_TICKET) {
                        // logger.info("NEW_SCAN_TICKET");
                        this.step = cloneDeep(msf.customer);

                        this.formProvider.clearLastTicket();
                        this.formProvider.resetForm();
                        // this.vvsApp.lss.resetForm();

                        setTimeout(() => {
                            // this.vvsApp.lss.newCheckIn(event.data);
                            this.formProvider.newCheckIn(event.data.ticketNumber, event.data.license);
                        });

                        // this.vvsApp.lss.validateAt(cat.VALIDATE_CUSTOMER);
                    }
                },
                logger.error
            );
    }

    ionViewDidLeave() {
        this.removeKeyboardListeners();
    }


    // TODO add footer photos bar height
    addKeyboardListeners() {

        KeyboardService.showBar();

        const show = KeyboardService.onShow(this.renderer)
            .pipe(tap(x => this.isShown = true))
            .subscribe((e) => this.onKeyboardShow(e));

        const hide = KeyboardService.onHide(this.renderer)
            .pipe(tap(x => this.isShown = false))
            .subscribe(() => this.onKeyboardHide());

        KeyboardService.setSubscriptions(show, hide);

        KeyboardService.showBar();

    }

    removeKeyboardListeners() {
        KeyboardService.unsubscribe();
        // this.keyboardHideSub.unsubscribe();
        // this.keybaordShowSub.unsubscribe();
    }


    onKeyboardHide() {
        if (this.step.name === msf.carnotes.name) { return; }
        // logger.info("onKeyboardHide");
        this.onKeyboardHideTimeout && clearTimeout(this.onKeyboardHideTimeout);
        this.onKeyboardHideTimeout = setTimeout(() => {
            // logger.info("onKeyboardHide - timeout");
            this.renderer.setStyle(this.scrollContentElement, c.paddingBottom, c.zpx);
        }, 750);
        // this.content.scrollToTop();
    }

    // tslint:disable-next-line: member-ordering
    isShown = false;

    /**
     * [onKeyboardShow description]
     * @method onKeyboardShow
     * @param  {Event}        e event from the keyboard plugin which includes the keyboard height
     * @return {void}         undefined
     */
    onKeyboardShow(e: { keyboardHeight: number }) {
        if (this.step.name === msf.carnotes.name) { return; }
        // logger.info("onKeyboardShow");
        this.onKeyboardHideTimeout && clearTimeout(this.onKeyboardHideTimeout);

        // alert(JSON.stringify(e));
        if (this.isShown === true || KeyboardService.isVisible() === true) {
            return;
        }
        const scrollContentInitialMarginBotton = 0; // 113;
        this.renderer.setStyle(this.scrollContentElement, c.paddingBottom, (e.keyboardHeight - scrollContentInitialMarginBotton) + c.px);
        this.updateScroll("", 250);
    }
    updateScroll(from: string, timeout: number) {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, timeout);
    }

    /**
     * should call this.switchClass
     * if customerName, then switchClass(carName)
     * if carName, then switchClass(carNotes)
     * if carNotesName, then cll prepareTicket
     * @method goToNextStep
     * @return void
     */
    // @Delay(200)
    @Throttle(100)
    goToNextStep() {
        // this.doValidate();

        setTimeout(() => {
            if (!this.canGoNext()) {

                this.vvsApp.toast(t.CANT_GO_NEXT, 1500);
                // debugger;
                Taptic.error();

                // this.doValidate();
            } else {
                switch (this.step.name) {
                    case msf.customer.name:
                        this.switchClass(msf.car);
                        break;

                    case msf.car.name:
                        this.switchClass(msf.carnotes);
                        break;

                    case msf.carnotes.name:
                        this.prepareTicket();
                        break;
                }
            }
        });



        // }, 200);

    }

    @Throttle(100)
    goToPreviousStep() {
        switch (this.step.name) {
            case msf.customer.name:

                break;

            case msf.car.name:
                this.switchClass(msf.customer);
                break;

            case msf.carnotes.name:
                this.switchClass(msf.car);
                break;
        }
    }

    @Throttle(100)
    submitBusyMode() {
        if (this.formProvider.currentProperty === 1000000000 && this.BMStatus.customerValid) {

            this.prepareTicket();
            return;
        }
        if (!this.BMStatus.customerValid) {
            return;
        }

        this.prepareTicket();

    }

    // doValidate() {
    //     // this.vvsApp.lss.validateAt(this.step.name);
    //     this.formProvider.validateAt(this.step.name);
    // }


    switchClass($step: IStep) {
        if (this.step.index < $step.index) {
            if ((this.step.name !== msf.carnotes.name) && !this.canGoNext()) {
                // this.vvsApp.lss.validateAt(this.step.name);
                // this.doValidate();
                this.vvsApp.toast(t.CANT_GO_NEXT, 2500);
                // debugger;
                return;
            }

        } else if (this.step.index > $step.index) {
            if ((this.step.name !== msf.customer.name) && this.prevStatus === false) {
                return;
            }
        }
        this.setCurrentStep($step);
        // this.vvsApp.lss.setCurrentStep($step);
    }

    canGoNext() {
        // const nextStatus = get(this.formProvider, "ticket.CurrentStep.formstep.nextStatus");
        // logger.info("canGoNext", nextStatus, this.formProvider);
        // logger.info("canGoNext 294", this.formProvider.ticket);
        // logger.info("canGoNext 295", this.formProvider.ticket.CurrentStep);
        // logger.info("canGoNext 295", this.formProvider.ticket.CurrentStep.formstep);
        // return nextStatus || false;
        return this.formProvider.canGoNext.value;
    }

    prepareTicket() {
        this.navCtrl.push(
            pages.reviewticket,
            {
                newticket: true,
                ticket: this.formProvider.getTicket(),
                busyMode: this.formProvider.busyMode
            }
        );
    }

    ionViewDidEnter() {
        this.vvsApp.httpService.doSync();
    }

    ionViewWillEnter() {
        this.addKeyboardListeners();

        this.isNative = this.vvsApp.isNative();

        // this.vvsApp.presentLoading('',2000);

        // logger.debug("this.vvsApp.getActiveNav()", this.vvsApp.getActiveNav());
        if (!isEmpty(this.vvsApp.newTicketNumberFromScan)) {

            const { ticketNumber, license } = this.vvsApp.newTicketNumberFromScan;

            if (ticketNumber || license) {
                this.step = cloneDeep(msf.customer);
                // this.formProvider.resetFormToDefault();
                this.formProvider.newCheckIn(ticketNumber, license);
                this.vvsApp.newTicketNumberFromScan = {} as any;
            } else {
                logger.error(this.vvsApp.newTicketNumberFromScan);
            }

        } else if (this.vvsApp.comingFromReviewTicket || this.vvsApp.lastNotifyForm < 4000) {
            logger.i("Resuming");
            setTimeout(() => {
                this.vvsApp.comingFromReviewTicket = false;
            }, 2500);
        } else {
            // logger.warn("ionViewDidEnter","NOT rootParams.ticketNumber");
            this.formProvider
                .getEditWithNoChanges()
                .then((val) => {
                    if (val) {
                        // logger.warn("ionViewDidEnter","it was editing");
                        this.resetToDefault();
                    } else {
                        //   this.handleNotEditing();
                        this.handleNotEditingSubject.next();
                    }
                })
                .catch(logger.e);
        }

    }

    // validateCurrentStep = ($c: ICurrentStep) => $c && $c.timestamp && $c.formstep && $c.formstep.name;

    handleNotEditing() {
        // logger.info("handleNotEditing");
        this.formProvider
            .getCurrentStep()
            .then((currentStep = {} as ICurrentStep) => {
                // NOTE: important, check nullity against currentStep
                const currentTime = new Date().getTime();

                const { timestamp, formstep } = currentStep;

                if (timestamp && formstep && formstep.name) {

                    const diffTime = currentTime - currentStep.timestamp;

                    // logger.l(diffTime < (this.minute * 1));
                    // logger.l(diffTime < (this.minute * 3));


                    if (diffTime < (this.minute * 1)) { // NOTE: load last unsubmitted ticket to the currentStep.
                        // NOTE: leave this empty

                    } else if (diffTime < (this.minute * 3)) { // NOTE: ask user if want to continue, and if yes, load customer step instead of currentStep

                        if (currentStep.formstep.name === msf.customer.name) {
                            /**
                             * this is an extra check. If it's being less than three minute and currentStep=customer,
                             * but there is no data, then don't ask.
                             * Maybe we can do nothing in here
                             */
                        } else {
                            // this.showUnfinishedTicketDialogSubject.next(currentStep);
                            this.showUnfinishedTicketDialog(currentStep);
                        }

                    } else {
                        this.resetToDefault2();
                    }

                } else {
                    this.resetToDefault2();
                }

            })
            .catch(logger.e);
    }


    setCurrentStep($step: IStep, validate: boolean = true) {
        this.step = cloneDeep($step);
        this.prevStatus = this.step.prevStatus;
        this.step.nextStatus = false;

        this.formProvider.setCurrentStep(this.step);

        if (validate === true) {
            this.formProvider.validateAt(this.step.name);
        } else {
            this.formProvider.validateAt(this.step.name);
        }

        this.cdr.detectChanges();

    }

    // tslint:disable-next-line: member-ordering
    BMStatus = {
        customerValid: true,
        photosValid: this.formProvider.currentProperty === 1000000000 ? false : true
    };

    @Debounce(150)
    onBMCustomerNotify(data: ICustomerStepOutput = {}): void {
        logger.info("onBMCustomerNotify", data);
        this.BMStatus.customerValid = data.nextStatus || false;
        this.onCustomerNotify();
    }

    onBMPhotosNotesNotify(data: ICarStepOutput = {}): void {
        logger.info("onBMPhotosNotesNotify", data);
        this.BMStatus.photosValid = data.nextStatus || false;
        this.onPhotosNotesNotify();
    }

    // tslint:disable-next-line:member-ordering
    // customerStep: ICustomerStepModel = {licenseID: {}} as ICustomerStepModel;
    @Debounce(150)
    onCustomerNotify(data: ICustomerStepOutput = {}): void {
        this.step.nextStatus = data.nextStatus || false;
        // this.step.nextStatus && KeyboardService.hide();
    }

    // tslint:disable-next-line:member-ordering
    // carStep: ICarStepModel = {} as ICarStepModel;
    onCarNotify(data: ICarStepOutput = {}): void {
        this.step.nextStatus = data.nextStatus || false;
    }

    onPhotosNotesNotify(data: ICarStepOutput = {}): void {
        this.step.nextStatus = data.nextStatus || false;
    }

    // tslint:disable-next-line:member-ordering
    // carPhotosStep: ICarPhotosStepOutput = {};
    onCarPhotosNotify(data: ICarPhotosStepOutput): void {
        this.step.nextStatus = data.nextStatus || false;
    }

    lastNotify() {
        this.vvsApp.lastNotifyForm = Date.now();
    }

    showConfirm(title: string, cb: (val: boolean) => void) {
        const options: IPresentConfirm = {
            title,
            message: "",
            cancelText: t.NO,
            submitText: t.YES,
            cancelCB: () => cb(false),
            submitCB: () => cb(true)
        };

        this.vvsApp.presentConfirm(options);
    }

    resetToDefault2() {
        // this.vvsApp.lss.resetFormToDefault();
        // this.formProvider.resetFormToDefault();
        this.setCurrentStep(msf.customer, false);
    }

    resetToDefault() {
        logger.l("resetToDefault called");

        // this.vvsApp.lss.resetForm();
        this.formProvider.resetForm();
        this.setCurrentStep(msf.customer, false);
        this.step.nextStatus = false;
        this.formProvider.resetForm();
        this.step.nextStatus = false;

    }

    clearForm() {
        Taptic.warning();
        this.showConfirm(t.RESET_TICKET, val => val && this.resetToDefault());
    }

    @Debounce(300)
    showUnfinishedTicketDialog(currentStep: ICurrentStep) {
        this.showConfirm(t.UNFINISHED_TICKET, (val: boolean) => {

            // val ? this.resetToDefault;

            if (val === false) {

                this.resetToDefault();
                // setTimeout( () => {
                //     this.reloadMSF();
                // },250);

            } else {
                this.setCurrentStep(msf.customer);

                switch (currentStep.formstep.name) {
                    case msf.customer.name:
                        break;

                    case msf.car.name:
                        this.step = cloneDeep(msf.customer);
                        this.goToNextStep();
                        break;

                    case msf.carnotes.name:
                        this.goToNextStep();
                        setTimeout(() => {
                            this.goToNextStep();
                        }, 1000);

                        break;
                }
            }

        });
    }

    setCar = () => this.switchClass(msf.car);
    setCustomer = () => this.switchClass(msf.customer);
    setCarNotes = () => this.switchClass(msf.carnotes);

    debugMe() {
        this.formProvider.debugMe();
    }

    private scrollContentElement: HTMLElement;
    private isDestroyed = false;

}
