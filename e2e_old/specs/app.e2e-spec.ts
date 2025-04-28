import { browser } from 'protractor';

import { random, sample } from "lodash";

import * as importChance from "chance";


import { nextButtonUtil } from "../../e2e/e2e-classes/tabs/checkin/next-button.e2e-class";

browser.ignoreSynchronization = true;
// browser.manage().window().maximize();
// browser.manage().window().setSize(320,568);
// import LoginPageSpec from "../e2e-classes/login/login-page.e2e-class";
import { companySpec } from "../e2e-classes/login/select-company/company.e2e-class";
import { propertySpec } from "../e2e-classes/login/select-property/property.e2e-class";




// import CompleteProfileSpec from "../e2e-classes/complete-profile-spec.e2e-class";
import { checkinSpec } from "../e2e-classes/tabs/checkin/checkin.e2e-class";

import { firstNameItem } from "../e2e-classes/tabs/checkin/steps/customer/items/inputs/first-name.e2e-class";
import { lastNameItem } from "../e2e-classes/tabs/checkin/steps/customer/items/inputs/last-name.e2e-class";
import { phoneNumberItem } from "../e2e-classes/tabs/checkin/steps/customer/items/inputs/phone-number.e2e-class";
import { roomNumberItem } from "../e2e-classes/tabs/checkin/steps/customer/items/inputs/room-number.e2e-class";
import { ticketNumberItem } from "../e2e-classes/tabs/checkin/steps/customer/items/inputs/ticket-number.e2e-class";



import { vehicleColorItem } from "../e2e-classes/tabs/checkin/steps/car/inputs/vehicle-color.e2e-class";
import { vehicleMakeItem } from "../e2e-classes/tabs/checkin/steps/car/inputs/vehicle-make.e2e-class";
import { vehicleModelItem } from "../e2e-classes/tabs/checkin/steps/car/inputs/vehicle-model.e2e-class";
import { vehicleYearItem } from "../e2e-classes/tabs/checkin/steps/car/inputs/vehicle-year.e2e-class";


import { passwordItem} from "../e2e-classes/login/password-item.e2e-class";
import { submitLoginButton } from "../e2e-classes/login/submit-login.e2e-class";
import { userNameItem } from "../e2e-classes/login/username-item.e2e-class";



import { ILicenseID } from 'vvs-bridge/index';
import { colorIndexes } from '../util/color-indexes';
import { availableCars,  userToLogin} from '../util/util';


// tslint:disable-next-line:prefer-const
let licenseID: ILicenseID;

// tslint:disable-next-line:prefer-const
let randomCustomerData;



// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

// let me = this;
//
// describe("Getting data", () => {
//
//     it("Getting data", (done:DoneFn) => {
//         console.log("Getting random data");
//         // let manateeScannerMock = new ManateeScannerMock();
//         // me = this;
//
//         // });
//     });
// });

describe('App  >>  ', () => {

    // describe("Manual before", () => {
    //
    //     it("LOL", (done:DoneFn) => {
    //         // let data = generateLicenseData();
    //         console.log("data",data);
    //         // generateLicenseData( (data:{licenseData:LicenseRawJSON, chance:any}) => {
    //
    //         // console.log(licenceRawJSON);
    //         // let licenceRawJSON:LicenseRawJSON = JSON.parse(data);
    //         let licenceRawJSON:LicenseRawJSON = data.licenseData;
    //         console.log("licenceRawJSON",licenceRawJSON);
    //         // let chance = data.chance;
    //
    //         licenseID = <LicenseID>{};
    //
    //
    //         licenseID.state = (licenceRawJSON && licenceRawJSON.hasOwnProperty('State')) ? licenceRawJSON.State : "";
    //
    //         let fields = (licenceRawJSON && licenceRawJSON.hasOwnProperty('Fields')) ? licenceRawJSON.Fields : [];
    //
    //         // map(fields, (field:LicenseFieldItem)=>{
    //         //      if(licenseCodes.hasOwnProperty(field.ID)) {
    //         //          licenseID[licenceRawJSON[field.ID]] = (field.Value != 'NONE' || !field.Value) ? field.Value : "";
    //         //      }
    //         // });
    //
    //         map(fields, (field:LicenseFieldItem)=>{
    //              if(realLicenseCodes.hasOwnProperty(field.ID)) {
    //                  licenseID[realLicenseCodes[field.ID]] = (field.Value != 'NONE' || !field.Value) ? field.Value : "";
    //              }
    //         });
    //
    //         // randomCustomerData = {};
    //
    //         // randomCustomerData.phoneNumber = chance.phone();
    //
    //         console.log(licenseID);
    //         browser.sleep(1000);
    //         done();
    //     });
    // });


    browser.sleep(2000);
    // tslint:disable-next-line:no-console
    console.log("licenseID from APP",licenseID);

    const loginOn:boolean = true;

    if(loginOn) {
        companySpec.run();
        // LoginPageSpec.runLoginSpec();

        userNameItem.run("smooth");
        passwordItem.run("savestheday");
        submitLoginButton.run();

        propertySpec.run(userToLogin.userFirstName);
    } else {
        browser.sleep(2000);

        browser.get('/');
        // browser.get('#/');
        // browser.get('#/nav/n4/TabsPage');

        browser.sleep(2000);

    }

    // HomeSpec.runHomeSpec();
    // StagedTab.run();


    // CompleteProfileSpec.runCompleteProfileSpec();
    //
    // CompleteProfileSpec.runCheckOutClickDescribe();
    //
    // ModalFooter.runCancelSpec();
    // ModalFooter.runSubmitSpec();

    // TabsSpec.runTabsSpec();

    // LogsPageSpec.runLogsSpec();

    // HomeSpec.runHomeSpec();

    const chance = new importChance.Chance();
    const makeModelColor = sample(availableCars);


    const form:any = {};
    form.name = chance.name();
    form.last = chance.last();
    form.ticketnumber = random(10000,29999) + "";
    form.phone = chance.phone();
    form.room = random(1000,9999) + "";
    form.year = random(2012,2018);
    form.make = makeModelColor.make;
    form.model = makeModelColor.model;
    form.color = makeModelColor.color;





    checkinSpec.runCheckinSpec();

    ticketNumberItem.run(form.ticketnumber);
    firstNameItem.run(form.name);
    lastNameItem.run(form.last);
    phoneNumberItem.run(form.phone);
    roomNumberItem.run(form.room);

    nextButtonUtil.clickNextButton();

    vehicleYearItem.run(form.year);
    vehicleMakeItem.run(form.make);
    vehicleModelItem.run(form.model);
    vehicleColorItem.run(colorIndexes[form.color]);

    nextButtonUtil.clickNextButton();

});
