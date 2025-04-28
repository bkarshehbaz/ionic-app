import { browser } from 'protractor';

import { e2eUtil } from "../../util/util.e2e-class";

import { LogItem } from "./log-item.e2e-class";
import { logItems } from "./log-items.e2e-class";

class LogPageSpec {

    runLogsSpec() {

        describe("LogsSpec", () => {

            it('Click LogsTab', (done:DoneFn) => {
                e2eUtil.clickTabNumber(4, done);
            });

            it("HexColor should throw no error", (done:DoneFn) => {
                // new LogsItem("recent-activity-item ion-item", 2).getHexColor(done);
                logItems.getRandomItemIndex()
                         .then( (randomItemIndex:any) => {
                            const logItem = new LogItem("recent-activity-item ion-item", randomItemIndex);
                            logItem.getHexColor()
                                   .then( (hexColor:string) => {
                                       expect(hexColor).toBe(jasmine.any(String));
                                       expect(hexColor.length).toBe(7);
                                   })
                                   .catch( reason => done.fail(reason) );
                         });
                browser.pause();
            });
        });

    }
}
export const logPageSpec = new LogPageSpec();
