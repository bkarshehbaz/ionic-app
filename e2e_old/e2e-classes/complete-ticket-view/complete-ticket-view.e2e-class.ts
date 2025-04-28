import { promise, WebElement } from 'protractor';


import { e2eUtil } from "../util/util.e2e-class";

import { ButtonUtil } from "../components/button/button.e2e-class";

class CompleteProfileSpec {

    runCompleteProfileSpec(from?:string) {

        describe("CompleteProfileSpec", () => {

            it("Should be displayed", (done:DoneFn) => {
                e2eUtil.getElement("complete-ticket-view")
                       .then( () => {
                           done();
                       })
                       .catch(console.error);
            });

        });
    }

    runPayClickDescribe() {
        describe( "PayClickDescribe", () => {
            it("Click", (done:DoneFn) => {
                this.clickPay(done);
            });
        });
    }

    runParkClickDescribe() {
        describe( "ParkClickDescribe", () => {
            it("Click", (done:DoneFn) => {
                this.clickPark(done);
            });
        });
    }

    runCheckOutClickDescribe() {
        describe( "CheckOutClickDescribe", () => {
            it("Click", (done:DoneFn) => {
                this.clickCheckOut(done);
            });
        });
    }

    getActionButtons():promise.Promise<WebElement[]> {
        return e2eUtil.getElements("complete-ticket-view .image-to-go-upper button")
                      .then( (actionButtons:WebElement[]) => {
                          return actionButtons;
                      });
    }

    getButtonUtilClassByElemet(webElement:WebElement):ButtonUtil {
        return new ButtonUtil(webElement);
    }

    private clickCheckin(done:DoneFn) {
        this.getActionButtons()
            .then( (actionButtons) => {
                 const checkInButton = actionButtons[e2eUtil.getCompleteTicketButtons().checkIn.index];
                 e2eUtil.clickElement(checkInButton,done);
            })
            .catch(console.error);
    }

    private clickCheckOut(done:DoneFn) {
        this.getActionButtons()
            .then( (actionButtons) => {
                 const checkOutButton = actionButtons[e2eUtil.getCompleteTicketButtons().checkOut.index];
                 e2eUtil.clickElement(checkOutButton,done);
            })
            .catch(console.error);
    }

    private clickPay(done:DoneFn) {
        this.getActionButtons()
            .then( (actionButtons) => {
                 const payButton = actionButtons[e2eUtil.getCompleteTicketButtons().pay.index];
                 e2eUtil.clickElement(payButton,done);
            })
            .catch(console.error);
    }

    private clickPark(done:DoneFn) {
        this.getActionButtons()
            .then( (actionButtons) => {
                 const parkButton = actionButtons[e2eUtil.getCompleteTicketButtons().park.index];
                 e2eUtil.clickElement(parkButton,done);
            })
            .catch(console.error);
    }





}
export const completeProfileSpec = new CompleteProfileSpec();

const acitonButtonsKeys = {
    checkIn :"checkIn",
    pullCar:"pullCar",
    parkCar:"parkCar",
    pay:"pay",
    recover:"recover"
};
