import { browser } from 'protractor';

import { segmentUtil } from "../../components/segment/segment.e2e-class";
import { e2eUtil } from "../../util/util.e2e-class";


class HomeSpec {

    runHomeSpec() {

        describe( 'HomeSpec', () => {

            it('Click Home', (done:DoneFn) => {
                browser.sleep(500);
                e2eUtil.clickTabNumber(0, done);
            });

            it('should have a title saying Home', (done: DoneFn) => {
                browser.sleep(1000);
                e2eUtil.checkTitle("Home",done);
            });

            it('Should have 4 segment buttons', (done: DoneFn) => {

                segmentUtil.expectSegmentCountToBe(4,done);

            });

            it("Segment Title should be ok", (done:DoneFn) => {

                segmentUtil.verifySegmentTitles(done);
            });

            it("Segment status should be ok and Staged", (done:DoneFn) => {

                segmentUtil.verifyStagedSegmentStatus(done);

            });


        });

    }

}
export const homeSpec = new HomeSpec();
