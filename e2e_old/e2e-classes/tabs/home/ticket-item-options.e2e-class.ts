import { browser, WebElement } from 'protractor';

import { e2eUtil } from "../../util/util.e2e-class";

const actions = {
      checkin :0,
      pay     :1,
      checkout:2,
      pull    :3,
      park    :4,
      details :5,
};


class TicketItemOptions {

    click(action:string, done:DoneFn) {
        this.getButtons()
            .then( (buttons:WebElement[]) => {
                const button = buttons[this.getActionIndex(action)];
                e2eUtil.clickElement(button, done);
            });
    }

    getButtons() {
        browser.sleep(1000);
        return e2eUtil.getElements("ticket-item-options button")
                      .then( (ionButtons:WebElement[]) => {
                          return ionButtons;
                      })
                      .catch(console.error);
    }

    expectToBeDisplayed(done:DoneFn) {
        browser.sleep(1000);
        e2eUtil.getElement("ticket-item-options")
               .then( () => done() )
               .catch( reason => done.fail(reason));
    }

    expectToNotBeDisplayed(done:DoneFn) {
        browser.sleep(1000);
        e2eUtil.getElement("ticket-item-options")
               .then( () => done.fail() )
               .catch( reason => done());
    }

    getActions() {
        return actions;
    }
    getActionIndex(action:string):number {
        return actions[action];
    }

}
export const ticketItemOptions = new TicketItemOptions();
