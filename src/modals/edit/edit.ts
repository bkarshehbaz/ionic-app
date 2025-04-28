import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { cloneDeep, forEach, isEmpty, isNil, map, merge, omit, omitBy, pick, toString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Success } from '../../constants/code-messages';
import * as cf from '../../constants/constant-fields';
import * as t from '../../constants/constant-titles';
import { ed, toPick } from '../../constants/constants';
import * as msf from '../../constants/msf';
import {
    ICar,
    ICarPhoto,
    ICarStepModel,
    ICurrentTicket,
    ICustomer,
    ICustomerStepModel,
    IEditCar,
    IEditCustomer,
    IImage,
    ILicenseID,
    INote,
    ITicketSequence,
} from '../../lib/vvs-bridge';
import { IEditNew } from '../../lib/vvs-bridge/api-return';
import { CheckInFormProvider } from '../../pages/checkin-form/checkin-form.provider';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { IPresentConfirm } from '../../providers/vvs-controller/view/alert';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { getRowFormatted, getTimeStamp, IFullTicket, unmaskPhoneNumber } from '../../util';
import { getPushPay, IPushPay } from '../../util/get-push-pay';
import { parseJSON } from '../../util/parse-json';
import { to } from '../../util/to';

// import { LocalStorageService } from '../../providers/local-storage-service/local-storage-service';
// import { forkJoin } from 'rxjs/observable/forkJoin';
// import { IPushPay, getPushPay } from '../../../.tmp/src/util/get-push-pay';
export interface IEditNotesPhotosData {
    TicketSequence: {
        notes: INote[];
        images: IImage[];
        ticketSequenceID: number;
    };
    // photosToS3: IImage[];
    pushPay: IPushPay;
    userID: number;
    currentTicketID: number;
    ticketNumber: string;
}

const logger = Logger.get("EditComponent");

@IonicPage({
    name: "edit"
})
@Component({
    selector: "edit-component",
    templateUrl: "./edit.html",
    providers: [
        CheckInFormProvider
    ]
})
export class EditComponent {

    option: "customer" | "car" | "carnotes";
    title: string = "";
    // itCanLeave: boolean = false;
    isScanning: boolean = false;
    nextStatus: boolean=true;

    from: "modal";

    ticket = {} as IFullTicket;

    constructor(public vvsApp: VVSApp,
        private formProvider: CheckInFormProvider,
        private navParams: NavParams,
        private viewCtrl: ViewController) {

        this.title = this.navParams.get(cf.title);
        const option = this.navParams.get(cf.option);
        this.from = this.navParams.get("from");

        this.ticket = this.navParams.get(cf.ticket);

        this.formProvider.setEditTicket(this.ticket, option)
            .then(() => this.option = option);
    }

    // ionViewCanLeave() {
    //     return this.itCanLeave;
    // }

    dismiss(val: boolean, ticket?: any) {
        // this.itCanLeave = true;
        // this.vvsApp.lss.clearLastTicket();
        // this.vvsApp.lss.removeIsEditing();
        this.formProvider.clearLastTicket();
        this.formProvider.removeIsEditing();

        this.vvsApp.dismissModal(this.viewCtrl, val, ticket, this.from);

        // this.viewCtrl
        //     .dismiss(val)
        //     .then()
        //     .catch(logger.e);
    }


    submit() {
        logger.i({ option: this.option });

        switch (this.option) {
            case msf.customer.name:
                this.prepareCustomerEdit();
                break;

            case msf.car.name:
                this.prepareCarEdit();
                break;

            case msf.carnotes.name:
                this.submitCarNotesEdit();
                break;
        }
    }

    // /* Car Edit opesn*/
    // _prepareCustomerEdit() {
    //     this.vvsApp.getActiveNav().push("ReviewTicketComponent", { type: this.option });
    // }

    /*Customer Edit opens*/
    prepareCustomerEdit() {
        // logger.info("prepareCustomerEdit: " + this.option);
        // this.vvsApp.lss.triggerOnBlur(this.option);
       // console.log("fjjfo3jfoi43jofoh3i4fiho3hfoh34ifho34hfoi34hfoi3hiofho34hfoi34hfo34hfoh34ifho34hfoi34hofhoi34hfio34hoifhio4fhio3hfo3hfo43hfi43hfo3fho3i4hfio34h");
        this.formProvider.triggerOnBlur(this.option);

        this.vvsApp.presentLoading(t.PREPARING_TICKET_CHANGES);

        // debugger;

        Promise.all([
            // this.vvsApp.lss.getCustomerStep(),
            this.formProvider.getCustomerStep(),
            // this.vvsApp.lss.getEditWithNoChanges()
            this.formProvider.getEditWithNoChanges()
        ])
            .then((ceValues) => {

                logger.i({ ceValues });

                // let changes: any  = cloneDeep(ceValues[0]);
                // changes = merge(changes, changes.licenseID);
                // let orig: any = ceValues[1];
                // orig = merge(orig, orig.licenseID);

                const changes: ICustomerStepModel & ILicenseID = merge(
                    {},
                    ceValues[0] as ICustomerStepModel,
                    (ceValues[0] as ICustomerStepModel).licenseID
                );

                const orig: ICustomerStepModel & ILicenseID = merge(
                    {},
                    ceValues[1] as ICustomerStepModel,
                    (ceValues[1] as ICustomerStepModel).licenseID
                );

                delete changes.licenseID;
                delete orig.licenseID;
                //
                // logger.debug("changes");
                // logger.debug(changes);
                // logger.debug("changes");
                //
                // logger.debug("orig");
                // logger.debug(orig);
                // logger.debug("orig");

                const $fChanges = omitBy(changes, (v, k) => toString(orig[k]) === toString(v)) as ICustomerStepModel & ILicenseID;

                if (isEmpty($fChanges)) {
                    // debugger;
                    this.vvsApp.presentSingleAlert(
                        "No changes were made.", "", null, 2500,
                        () => {
                            this.dismiss(true);
                        }
                    );
                    return;
                }

                logger.info("$fChanges", $fChanges);
                // if (isEmpty($fChanges.customerPhone)) {
                // 	delete $fChanges.customerPhone;
                // }

                // using changes.isHotel because isHotel could be gone is $fChanges
                $fChanges.roomNumber = changes.isHotel == 1 ? $fChanges.roomNumber : undefined;

                // tslint:disable: no-multi-spaces
                const msj: string =
                    getRowFormatted(t.TICKET_NUMBER, orig.ticketNumber, $fChanges.ticketNumber) +
                    getRowFormatted(t.FIRST_NAME, orig.customerFirstName, $fChanges.customerFirstName) +
                    // getRowFormatted(t.MIDDLE_NAME  , orig.customerMiddleName , $fChanges.customerMiddleName)  +
                    getRowFormatted(t.LAST_NAME, orig.customerLastName, $fChanges.customerLastName) +
                    getRowFormatted(t.REGISTRATION_NUMBER, orig.confirmation_number, $fChanges.confirmation_number) +
                    getRowFormatted(t.ROOM_NUMBER, orig.roomNumber, $fChanges.roomNumber) +
                    getRowFormatted(t.TICKET_TYPE, orig.ticketTypeName, $fChanges.ticketTypeName) +
                    getRowFormatted(t.EVENT, orig.eventName, $fChanges.eventName) +
                    getRowFormatted(t.PHONE_NUMBER, orig.customerPhone, $fChanges.customerPhone);

                // tslint:enable: no-multi-spaces
                // debugger;

                const title = t.REVIEW_CHANGES;
                const cssClass = "edit-review-alert";

                const options: IPresentConfirm = {
                    title,
                    message: msj,
                    cancelText: t.DISAGREE,
                    submitText: t.AGREE,
                    cssClass,
                    cancelCB: () => {
                        this.vvsApp.dismissLoading('customer-edit');
                    },
                    submitCB: (data) => {
                        this.submitCustomerEditTicket(orig.currentTicketID, orig.ticketNumber, $fChanges);
                    }
                };
                console.log("options", options)
                this.vvsApp.presentConfirm(options);

            })
            .catch(logger.e);
    }

    async submitCustomerEditTicket(currentTicketID: number, ticketNumber: string, changes: ICustomerStepModel) {

        const currentTicketChanges = pick(changes, toPick.currentTicket) as ICurrentTicket;

        const customerChanges = pick(changes, toPick.customer) as ICustomer;

        customerChanges.customerPhone = unmaskPhoneNumber(customerChanges.customerPhone);
        if (isEmpty(customerChanges.customerPhone)) {
            delete customerChanges.customerPhone;
        }

        let data: IEditCustomer = {
            Customer: customerChanges,
            CurrentTicket: currentTicketChanges,
            ticketNumber,
            currentTicketID
        };

        data = (omitBy as any)(data, isNil);
        data.CurrentTicket = (omitBy as any)(data.CurrentTicket, isNil);
        data.Customer = (omitBy as any)(data.Customer, isNil);

        if (isEmpty(data.CurrentTicket)) {
            delete data.CurrentTicket;
        }

        const [ticket] = await to<ICurrentTicket>(this.vvsApp.lss.getCurrentTicketByID(currentTicketID, EditComponent.name));
        data.pushPay = getPushPay(this.vvsApp, ticket);

        if (isEmpty(data.Customer)) {
            delete data.Customer;
        } else {
            data.Customer.customerID = ticket.Customer.customerID;
        }

        // data.Customer.customerID = this.vvsApp.lss.getCustomerIDByTicketID(currentTicketID);

        // customerStep.Customer = <any>omitBy(customerStep.Customer, isNil);
        //
        //
        // customerStep.Customer.ticketTypeName = (customerStep.Customer.ticketTypeID != undefined) ? undefined : customerStep.Customer.ticketTypeName;
        // customerStep.Customer.companyArrivalName = (customerStep.Customer.companyArrivalID != undefined) ? undefined : customerStep.Customer.companyArrivalName;
        // customerStep.Customer.eventPartyName = (customerStep.Customer.companyArrivalID != undefined) ? undefined : customerStep.Customer.eventPartyName;

        this.vvsApp
            .httpService
            .editCustomer(data)
            .subscribe(
                (result: IEditNew) => {
                   
                    this.onEditSuccessful("EditCustomer", result);
                },
                (error: any) => {
                    logger.e(error);
                    this.vvsApp.presentSingleAlert(t.SOMETHING_WENT_WRONG);
                }
            );
    }

    /*Customer Edit closes*/


    // /* Car Edit opesn*/
    // _prepareCarEdit() {
    //     this.vvsApp.getActiveNav().push("ReviewTicketComponent", { type: this.option });
    // }
    prepareCarEdit() {

        // this.vvsApp.lss.triggerOnBlur(this.option);

        this.formProvider.triggerOnBlur(this.option);
        this.vvsApp.presentLoading(t.PREPARING_TICKET_CHANGES);

        Promise.all([
            this.formProvider.getCarStep(),
            this.formProvider.getEditWithNoChanges()
        ])
            .then(([changes, orig]: [ICarStepModel, ICarStepModel]) => {

                logger.i("ceValuesTwo", { ceValuesTwo: cloneDeep([changes, orig]) });

                // const changes: ICarStepModel  = ceValuesTwo[0];
                // const orig = ceValuesTwo[1] as ICarStepModel;
                const $fChanges = omitBy(changes, (v, k) => toString(orig[k]) === toString(v)) as ICarStepModel;


                // NOTE: remove the following when implementing electric
                delete $fChanges.electric;
                // debugger;

                if (isEmpty($fChanges)) {
                    // debugger;
                    this.vvsApp.presentSingleAlert(
                        "No changes were made.", "", null, 2500,
                        () => {
                            this.dismiss(true);
                        }
                    );
                    return;
                }

                // debugger;

                const msj: string =
                    getRowFormatted(t.CAR_YEAR, orig.carYear, $fChanges.carYear) +
                    getRowFormatted(t.CAR_MAKE, orig.makeName, $fChanges.makeName) +
                    getRowFormatted(t.CAR_MODEL, orig.modelName, $fChanges.modelName) +
                    getRowFormatted(
                        t.TRANSMISSION_STYLE,
                        orig.manual == 1 ? t.MANUAL : orig.manual == 0 ? t.AUTO : "",
                        $fChanges.manual == 1 ? t.MANUAL : $fChanges.manual == 0 ? t.AUTO : ""
                    ) +
                    getRowFormatted(t.CAR_COLOR, orig.colorName, $fChanges.colorName);

                const title = t.REVIEW_CHANGES;
                const cssClass = "edit-review-alert";

                const options: IPresentConfirm = {
                    title,
                    message: msj,
                    cssClass,
                    cancelCB: () => {
                        this.vvsApp.dismissLoading('cancelCB');
                    },
                    submitCB: () => {
                        if (orig.status == cf.adding) {
                            this.submitAddCar(orig.currentTicketID, orig.ticketNumber, $fChanges);
                            return;
                        }
                        this.submitCarEditTicket(orig.currentTicketID, orig.ticketNumber, $fChanges);
                    },
                    cancelText: t.GO_BACK,
                    submitText: t.GO
                };

                this.vvsApp.presentConfirm(options)
                    .then(() => this.vvsApp.dismissLoading('present-confirm'));

            })
            .catch(logger.e);
    }

    async submitAddCar(currentTicketID: number, ticketNumber: string, changes: ICarStepModel) {
        logger.i("submitAddCar ceValuesTwo", { changes: cloneDeep(changes) });

        const data = pick(changes, ed.car) as ICar & { currentTicketID: number; busyMode: true };
        data.currentTicketID = currentTicketID;
        data.busyMode = true;

        this.vvsApp.httpService
            .addCar(data)
            .subscribe(
                (result: any) => {
                    // debugger
                    this.vvsApp
                        .ably.update("SuccessCompleteTicket", result as any) // as unknown as IAblyUpdate)
                        .then(() => this.vvsApp.presentSingleAlert(Success.message))
                        .then(() => {
                            this.formProvider.resetForm();
                            this.dismiss(true, result);
                            this.vvsApp.dismissLoading('edit-successfull');
                        })
                        .catch(logger.e);
                },
                (error: any) => {
                    // debugger;
                    logger.e(error);
                    this.vvsApp.presentSingleAlert(t.SOMETHING_WENT_WRONG);
                }
            );

    }

    async submitCarEditTicket(currentTicketID: number, ticketNumber: string, changes: ICarStepModel) {

        logger.i("ceValuesTwo", { changes: cloneDeep(changes) });

        const Car = pick(changes, [...ed.car, "licensePlate"]) as ICar;

        let data: IEditCar = { currentTicketID, ticketNumber, Car };
        data = (omitBy as any)(data, isNil);

        // data.Car.carID = this.vvsApp.lss.getCarIDByTicketID(currentTicketID);
        const [ticket] = await to<ICurrentTicket>(this.vvsApp.lss.getCurrentTicketByID(currentTicketID, EditComponent.name));
        data.Car.carID = ticket.Car.carID;
        data.pushPay = getPushPay(this.vvsApp, ticket);

        this.vvsApp.httpService
            .editCar(data)
            .subscribe(
                (result: IEditNew) => {
                    this.onEditSuccessful("EditCar", result);
                },
                (error: any) => {
                    logger.e(error);
                    this.vvsApp.presentSingleAlert(t.SOMETHING_WENT_WRONG);
                }
            );
    }
    /* Car Edit closes */

    submitCarNotesEdit() {
        this.getCardNotesEditData()
            .then((data: IEditNotesPhotosData) => {

                return this.vvsApp
                    .lss.getCurrentTicketByID(data.currentTicketID, EditComponent.name)
                    .then((ticket: ICurrentTicket) => {
                        let existingPhotos = parseJSON<IImage[]>(ticket.TicketSequence.images as string, []);
                        existingPhotos = map(existingPhotos, x => omit(x, "uri"));
                        data.TicketSequence.images = [
                            ...existingPhotos,
                            ...(data.TicketSequence.images || []),
                        ];

                        const existingNotes = parseJSON<INote[]>(ticket.TicketSequence.notes, []);
                        data.TicketSequence.notes = [
                            ...existingNotes,
                            ...(data.TicketSequence.notes || []),
                        ];
                        data.ticketNumber = ticket.ticketNumber;

                        return data;
                    })
                    .catch(logger.error);

            })
            .then((data: IEditNotesPhotosData) => {
                logger.info("submitCarNotesEdit data", data);
                this.vvsApp
                    .httpService
                    .editPhotoNotes(data)
                    .subscribe(
                        (result: IEditNew) => {
                            this.onEditSuccessful("EditPhotoNotes", result);
                        },
                        logger.e
                    );
            })
            .catch(logger.e);
    }

    getCardNotesEditData() {
        this.formProvider.triggerOnBlur(this.option);
        this.vvsApp.presentLoading("Preparing Ticket Changes...");
        return Promise.all([
            this.formProvider.getCarPhotos(),
            this.formProvider.getNotes(),
            this.formProvider.getEditWithNoChanges()
        ])
            .then(([carPhotos, notes, _ticketSequence]) => {

                const ticketSequence: ITicketSequence = _ticketSequence as any;

                logger.assert(isEmpty(ticketSequence), "ticketSequence must not be empty");
                logger.assert(isNil(ticketSequence.ticketSequenceID), "ticketSequenceID must not be empty");

                logger.i({ carPhotos, notes, ticketSequence });

                if (carPhotos) {
                    forEach(carPhotos, (carPhoto: ICarPhoto, carPhotoIndex: number) => {
                        carPhotos[carPhotoIndex].uid = carPhoto.uid || uuidv4();
                    });
                }

                logger.i({ carPhotos, notes });

                if (isEmpty(notes)) {
                    notes = undefined;
                } else {
                    forEach(notes, (note: INote, _key) => {
                        notes[_key].userID = notes[_key].userID || this.vvsApp.userID; // this.vvsApp.lss.getAsyncLoginUser().userID;
                        notes[_key].date = notes[_key].date || getTimeStamp() + "";
                    });
                }

                const data: IEditNotesPhotosData = {
                    TicketSequence: {
                        notes,
                        images: carPhotos,
                        ticketSequenceID: ticketSequence.ticketSequenceID
                    },
                    pushPay: getPushPay(this.vvsApp, this.ticket),
                    userID: this.vvsApp.userID,
                    currentTicketID: ticketSequence.currentTicketID,
                    ticketNumber: this.ticket.ticketNumber
                };

                logger.assert(this.ticket.currentTicketID != ticketSequence.currentTicketID, "ct.ticketID doesn't ts.ticketID");

                return data;

                // data.TicketSequence.ticketSequenceID = (ticketSequence as ITicketSequence).ticketSequenceID;

            });
    }

    onNotify(data: any): void {
        logger.info("onNotify", data);
        if (data.hasOwnProperty('nextStatus')) {
            this.nextStatus = data.nextStatus;

            // if (this.nextStatus === true) {
            //     KeyboardService.hide();
            // }
        }
    }

    private onEditSuccessful(event: string, result: IEditNew) {
        // tslint:disable-next-line:no-debugger
        // logger.debug();
        // logger.debug(result);
        // if (result.status === 'ok') {
        if (result.RecentActivity) {
            // }
            // if ( (result.CurrentTicket || result.Customer) && result.RecentActivity) {
            //     // this.vvsApp.changeTab(0);
            this.vvsApp
                .ably.update(event, result as any) // as unknown as IAblyUpdate)
                .then(() => this.vvsApp.presentSingleAlert(Success.message))
                .then(() => {
                    this.formProvider.resetForm();
                    this.dismiss(true);
                    this.vvsApp.dismissLoading('edit-successfull');
                })
                .catch(logger.e);
        } else {
            this.vvsApp.presentSingleAlert(t.SOMETHING_WENT_WRONG);
            logger.i({ result });
        }
    }

}
