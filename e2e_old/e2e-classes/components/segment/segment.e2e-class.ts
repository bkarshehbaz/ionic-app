import { browser, by, WebElement } from 'protractor';


import * as _ from "lodash";

const segmentStatus = {
    staged:  [true,  false, false, false],
    pull:    [false, true , false, false],
    allcars: [false, false, true , false],
    mycars:  [false, false, false, true ]
};

const segmentKeys = {
    staged:"staged",
    pull:"pull",
    allcars:"allcars",
    mycars:"mycars"
};

class SegmentUtil {

    getSegmentButtons() {
        return browser.findElements(by.css('ion-segment-button'));
    }

    getSegmentButtonsCount() {
        return this.getSegmentButtons()
                   .then( value => value.length)
                   .catch( reason => console.log(reason) );
    }

    expectSegmentCountToBe(count:number,done:DoneFn) {
        this.getSegmentButtonsCount()
            .then( ($count:number) => {
                expect(count).toBe($count);
                done();
            })
            .catch( reason => done.fail(reason));
    }

    verifyStageStatus() {

    }

    verifySegmentTitles(done:DoneFn) {
       this.getSegmentButtons()
           .then( (ionSegmentButtons:WebElement[]) => {
                        Promise.all<any>(
                                     [
                                       ionSegmentButtons[0].getText(),
                                       ionSegmentButtons[1].getText(),
                                       ionSegmentButtons[2].getText(),
                                       ionSegmentButtons[3].getText()
                                     ]
                                   )
                                .then( (values:string[]) => {
                                    expect(values[0]).toEqual("Staged");
                                    expect(values[1]).toEqual("Pull");
                                    expect(values[2]).toEqual("All Cars");
                                    expect(values[3]).toEqual("My Cars");

                                    done();
                                })
                                .catch( reason => done.fail(reason) );
           });
    }

    verifySegmentStatus(segment:string, done:DoneFn) {

        this.getSegmentButtons()
            .then( (ionSegmentButtons:WebElement[]) => {
                Promise.all<any>(
                               [
                                 ionSegmentButtons[0].getAttribute('class'),
                                 ionSegmentButtons[1].getAttribute('class'),
                                 ionSegmentButtons[2].getAttribute('class'),
                                 ionSegmentButtons[3].getAttribute('class')
                               ]
                             )
                          .then( (values:string[]) => {
                             for(let i = 0; i < values.length; i++) {
                                expect(_.includes(values[i].split(" "),"segment-activated")).toEqual(segmentStatus[segment][i]);
                             }
                             done();
                          })
                          .catch( reason => done.fail(reason) );
            });

    }

    verifyStagedSegmentStatus(done:DoneFn) {

        this.getSegmentButtons()
            .then( (ionSegmentButtons:WebElement[]) => {
                Promise.all<any>(
                               [
                                 ionSegmentButtons[0].getAttribute('class'),
                                 ionSegmentButtons[1].getAttribute('class'),
                                 ionSegmentButtons[2].getAttribute('class'),
                                 ionSegmentButtons[3].getAttribute('class')
                               ]
                             )
                          .then( (values:string[]) => {
                             for(let i = 0; i < values.length; i++) {
                                expect(_.includes(values[i].split(" "),"segment-activated")).toEqual(segmentStatus.staged[i]);
                             }
                             done();
                          })
                          .catch( reason => done.fail(reason) );
            });

    }

    verifyPullSegmentStatus(done:DoneFn) {

        this.getSegmentButtons()
            .then( (ionSegmentButtons:WebElement[]) => {
                Promise.all<any>(
                               [
                                 ionSegmentButtons[0].getAttribute('class'),
                                 ionSegmentButtons[1].getAttribute('class'),
                                 ionSegmentButtons[2].getAttribute('class'),
                                 ionSegmentButtons[3].getAttribute('class')
                               ]
                             )
                          .then( (values:string[]) => {
                             for(let i = 0; i < values.length; i++) {
                                expect(_.includes(values[i].split(" "),"segment-activated")).toEqual(segmentStatus.pull[i]);
                             }
                             done();
                          })
                          .catch( reason => done.fail(reason) );
            });

    }

    verifyAllCarsSegmentStatus(done:DoneFn) {

        this.getSegmentButtons()
            .then( (ionSegmentButtons:WebElement[]) => {
                Promise.all<any>(
                               [
                                 ionSegmentButtons[0].getAttribute('class'),
                                 ionSegmentButtons[1].getAttribute('class'),
                                 ionSegmentButtons[2].getAttribute('class'),
                                 ionSegmentButtons[3].getAttribute('class')
                               ]
                             )
                          .then( (values:string[]) => {
                             for(let i = 0; i < values.length; i++) {
                                expect(_.includes(values[i].split(" "),"segment-activated")).toEqual(segmentStatus.allcars[i]);
                             }
                             done();
                          })
                          .catch( reason => done.fail(reason));
            });

    }

    verifyMyCarsSegmentStatus(done:DoneFn) {

        this.getSegmentButtons()
            .then( (ionSegmentButtons:WebElement[]) => {
                Promise.all<any>(
                               [
                                 ionSegmentButtons[0].getAttribute('class'),
                                 ionSegmentButtons[1].getAttribute('class'),
                                 ionSegmentButtons[2].getAttribute('class'),
                                 ionSegmentButtons[3].getAttribute('class')
                               ]
                             )
                        .then( (values:string[]) => {
                           for(let i = 0; i < values.length; i++) {
                              expect(_.includes(values[i].split(" "),"segment-activated")).toEqual(segmentStatus.mycars[i]);
                           }
                           done();
                        })
                        .catch( reason => done.fail(reason) );
            });

    }

    getSegmentKeys() {
        return segmentKeys;
    }
}
export const segmentUtil = new SegmentUtil();
