import { Pipe, PipeTransform } from '@angular/core';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { Logger } from '../../providers/vvs-controller/util/logger';

const logger = Logger.get("PaymentTypePipe");

@Pipe({
    name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

    constructor(private vvsApp: VVSApp) {

    }

    transform(paymentTypeID: number, field: string) {
        return this.vvsApp.lss.getPaymentTypeData()
        .then( (paymentTypes) => {
            if (!paymentTypeID || !paymentTypes || !paymentTypes[paymentTypeID]) {
                // debugger;
                return "";
            }
            return paymentTypes[paymentTypeID][field];
        })
        .catch( (error) => {
            logger.error(error, { paymentTypeID });
            return "";
        });
    }

}
