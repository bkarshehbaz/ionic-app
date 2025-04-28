import { by, promise, WebElement } from 'protractor';
import { IRecentActivityType } from 'vvs-bridge';

import { ItemUtil } from "../../components/item/item.e2e-class";
import { e2eUtil } from "../../util/util.e2e-class";

import * as _ from 'lodash';

// tslint:disable-next-line:max-line-length
const recentActivityTypes:{[key:number]: IRecentActivityType} = {"1000000000":{"recentActivityTypeID":1000000000,"recentActivityTypeName":"SIGNIN","color":"#00477e","recentActivityMessage":"#{userFirstName} #{userLastName} has signed in","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000001":{"recentActivityTypeID":1000000001,"recentActivityTypeName":"SIGNOUT","color":"#ffab00","recentActivityMessage":"#{userFirstName} #{userLastName} has signed out","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000002":{"recentActivityTypeID":1000000002,"recentActivityTypeName":"CHECKIN","color":"#4CAF50","recentActivityMessage":"#{userFirstName} #{userLastName} has checked in ticket number #{ticketNumber}","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000003":{"recentActivityTypeID":1000000003,"recentActivityTypeName":"CHECKOUT","color":"#F44336","recentActivityMessage":"#{userFirstName} #{userLastName} has checked out ticket number #{ticketNumber}. Customer will be returning.","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000004":{"recentActivityTypeID":1000000004,"recentActivityTypeName":"PARK","color":"#00BCD4","recentActivityMessage":"#{userFirstName} #{userLastName} has parked ticket number #{ticketNumber}","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000005":{"recentActivityTypeID":1000000005,"recentActivityTypeName":"PULL","color":"#FF9800","recentActivityMessage":"#{userFirstName} #{userLastName} has pulled ticket number #{ticketNumber}","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000006":{"recentActivityTypeID":1000000006,"recentActivityTypeName":"PAY","color":"#92B558","recentActivityMessage":"#{userFirstName} #{userLastName} has completed transaction for ticket number #{ticketNumber}","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000007":{"recentActivityTypeID":1000000007,"recentActivityTypeName":"EDIT","color":"#672e3b","recentActivityMessage":"#{userFirstName} #{userLastName} has edited ticket number #{ticketNumber} with changes","isActive":1,"createDate":"2017-05-14T23:16:47.000Z","modDate":"2017-05-14T23:16:47.000Z"},"1000000008":{"recentActivityTypeID":1000000008,"recentActivityTypeName":"CHECKOUT_DEPARTURE","color":"#F2552C","recentActivityMessage":"#{userFirstName} #{userLastName} has checked out ticket number #{ticketNumber}. Customer will not be returning.","isActive":1,"createDate":"2017-05-16T20:31:08.000Z","modDate":"2017-05-16T20:31:08.000Z"},"1000000009":{"recentActivityTypeID":1000000009,"recentActivityTypeName":"RECOVERY","color":"#009688","recentActivityMessage":"#{userFirstName} #{userLastName} has recovered ticket number #{ticketNumber} from the archives.","isActive":1,"createDate":"2017-05-16T20:31:08.000Z","modDate":"2017-05-16T20:31:08.000Z"}};

export class LogItem extends ItemUtil {

    constructor($itemQuery:string, index:number) {
        super($itemQuery, index);
    }

    getHexColor():promise.Promise<string> {
        let hexColor:string;
        return this.getItemByCurrentIndex()
            .then( (logItem:WebElement) => {

                return logItem.getAttribute("style")
                       .then( (attr:string) => {
                           // tslint:disable-next-line:no-console
                           console.log("attr*********  ",attr,"  ********attr*************");
                           const styleArray = attr.split(";");
                           _.map(styleArray, (style:string) => {
                              const key = style.split(":")[0];
                              const value = style.split(":")[1];
                              // tslint:disable-next-line:no-console
                              console.log("key", key, "value", value);
                              // console.log('key == "border-left-color"', key == "border-left-color");
                              if(key === "border-left-color") {
                                  hexColor = this.rgb2hex(value.trim());
                                  // tslint:disable-next-line:no-console
                                  console.log("hexColor",hexColor);
                              }

                              // console.log("hexColor",hexColor);
                              // let recentActivityType:RecentActivityType = _.find(recentActivityTypes, (rAT:any) => {
                              // tslint:disable-next-line:max-line-length
                              //                                                 // console.log("rAT.color",rAT.color.toLowerCase(),"hexColor",hexColor.toLowerCase(), "rAT.color == hexColor",rAT.color.toLowerCase() == hexColor.toLowerCase());
                              //                                                 return rAT.color.toLowerCase() == hexColor.toLowerCase();
                              //                                             });
                              // // console.log("recentActivityType", recentActivityType);
                              // // recentActivityType.recentActivityTypeName;
                              // if(recentActivityType.recentActivityTypeName == "SIGNIN") {
                              //
                              // }
                              // else if(recentActivityType.recentActivityTypeName == "SIGNOUT") {
                              //
                              // }
                              // else{
                              //
                              // }

                           });
                           return hexColor;

                          //  done();
                       })
                       .catch(console.error);

            })
            .catch(console.error);
    }

    getMessage() {

    }

    getRecentActivityType() {
        
    }

    getTicketNumber() {
        this.getItemByCurrentIndex()
            .then( (logItem:WebElement) => {
                return logItem.findElement(by.css(".ticketNumber"))
                              .then( (ticketNumber:WebElement) => {
                                  if(ticketNumber) {
                                      // done.fix

                                  }
                              })
                              .catch( reason => e2eUtil.expectToNotBeFound(reason) );
            })
            .catch(console.error);
    }

    rgb2hex(rgb) {
       rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
       return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

}
