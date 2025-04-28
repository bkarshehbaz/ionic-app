import { isEmpty, toString } from 'lodash';
import { ICustomer, StringMap } from '../lib/vvs-bridge';
import { Logger } from '../providers/vvs-controller/util/logger';

export const fullnames: StringMap<string> = {};
const logger = Logger.get("get-customer-full-name");

export const getCustomerFullName = (customer = {} as ICustomer) => {

    logger.assert(isEmpty(customer), "customer is empty");

    return fullnames[customer.customerID] = toString(customer.customerFirstName)  + " " +
           (
               (toString(customer.customerMiddleName).length > 0) ?
               (toString(customer.customerMiddleName)[0] + ". " ) : ""
           ) +
           toString(customer.customerLastName);
};
