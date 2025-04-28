
const segmentStatus = {
    staged:  [true,  false, false, false],
    pull:    [false, true , false, false],
    allcars: [false, false, true , false],
    mycars:  [false, false, false, true ]
};
class HomeUtil {

    getSegmentStatus() {
        return segmentStatus;
    }

    // clickOnSegmentButtonAndValidateStatus(segment:string,done:DoneFn) {
    //     browser.findElements(by.css('ion-segment-button'))
    //            .then( (ionSegmentButtons:WebElement[]) => {
    //                let stagedSegment  = ionSegmentButtons[0];
    //                let pullSegment    = ionSegmentButtons[1];
    //                let allCarsSegment = ionSegmentButtons[2];
    //                let myCarsSegment  = ionSegmentButtons[3];
    //
    //                e2eUtil.clickElement(stagedSegment)
    //                       .then( () => {
    //
    //                           e2eUtil.verifySegmentStatus(ionSegmentButtons,segmentStatus[segment])
    //                                  .then( () => {
    //                                      done();
    //                                  });
    //                       });
    //            });
    // }

    // verifyLisItemRequiredValues(done:DoneFn) {
    //     browser.findElements(by.css("ion-item"))
    //            .then( (ionItems:WebElement[]) => {
    //
    //
    //                ionItems.map( (ionItemSliding:WebElement) => {
    //
    //                     e2eUtil.expectToBeDisplayed(true, ionItemSliding);
    //
    //                     e2eUtil.expectToBeDisplayed(ionItemSliding.findElement(by.css('ticket-number')));
    //                });
    //                done();
    //            });
    // }
}
export const homeUtil = new HomeUtil();
