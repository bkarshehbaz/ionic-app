
// import ListItemUtil from "../list-item-util";

import * as _ from "lodash";
import { segmentUtil } from "../../../components/segment/segment.e2e-class";
import { ticketItemOptions } from "../ticket-item-options.e2e-class";
import { ticketItemViews } from "../ticket-item-views.e2e-class";

export class SegmentBase {

    segment:string;
    constructor(segment:string) {
        this.segment = segment;
    }

    run() {

        describe(_.capitalize(this.segment) + " Segment", () => {

            it("Segment Title should be ok", (done:DoneFn) => {

                segmentUtil.verifySegmentTitles(done);
            });

            it("Segment status should be ok and Staged", (done:DoneFn) => {

                segmentUtil.verifySegmentStatus(this.segment, done);
            });

            let lastClicked:number;
            it("Click randomItem", (done:DoneFn) => {
                ticketItemViews.clickRandomItem(done)
                               .then( (index:number) => {
                                    console.log("index", index);
                                    lastClicked = index;
                                    done();
                               })
                               .catch( reason => done.fail(reason) );
            });

            it("Expect ticketItemOptions to be opened", (done:DoneFn) => {
                ticketItemOptions.expectToBeDisplayed(done);
            });



            it("Click randomItem", (done:DoneFn) => {
                ticketItemViews.clickItemByIndex(done, lastClicked);
                              //  .then( (index:number) => {
                              //       console.log("index", index);
                              //       done();
                              //  })
                              //  .catch( reason => done.fail(reason) );
            });

            it("Expect ticketItemOptions to be opened", (done:DoneFn) => {
                ticketItemOptions.expectToNotBeDisplayed(done);
            });





            it("Click randomItem", (done:DoneFn) => {
                ticketItemViews.clickRandomItem(done)
                               .then( (index:number) => {
                                    console.log("index", index);
                                    lastClicked = index;
                                    done();
                               })
                               .catch( reason => done.fail(reason) );
            });

            it("Expect ticketItemOptions to be opened", (done:DoneFn) => {
                ticketItemOptions.expectToBeDisplayed(done);
            });
            it("Click details", (done:DoneFn) => {
                ticketItemOptions.click("details", done);
            });




            it('ItemUtil Basic Test', function(done:DoneFn) {

                // ItemUtil.verifyItemBasic(done);
                done();

            });



        });

    }

}
