import { browser, by, WebElement } from 'protractor';
import { includes } from "lodash";
import { CallbackStepDefinition } from 'cucumber';
import { expect } from "../../../config/helpers/chai-imports";

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

export class SegmentUtil {

	private static instance: SegmentUtil;
	public static get() {
		return SegmentUtil.instance || (SegmentUtil.instance = new SegmentUtil());
	}

    getSegmentButtons() {
        return browser.findElements(by.css('ion-segment-button'));
    }

    getSegmentButtonsCount() {
        return this.getSegmentButtons()
                   .then( value => value.length)
                   .catch( reason => console.log(reason) );
    }

    expectSegmentCountToBe(count:number,done: CallbackStepDefinition) {
        this.getSegmentButtonsCount()
            .then( ($count:number) => {
                expect(count).equal($count);
                done();
            })
            .catch( reason => done(reason));
    }

    verifyStageStatus() {

    }

    verifySegmentTitles(done: CallbackStepDefinition) {
       this.getSegmentButtons()
           .then( (ionSegmentButtons:WebElement[]) => {
				Promise.all<any>([
					ionSegmentButtons[0].getText(),
					ionSegmentButtons[1].getText(),
					ionSegmentButtons[2].getText(),
					ionSegmentButtons[3].getText()
				])
				.then( (values:string[]) => {
					expect(values[0]).equal("Staged");
					expect(values[1]).equal("Pull");
					expect(values[2]).equal("All Cars");
					expect(values[3]).equal("My Cars");

					done();
				})
				.catch( reason => done(reason) );
           });
    }

    verifySegmentStatus(segment: "staged" | "pull" | "allcars" | "mycars", done: CallbackStepDefinition) {

        this.getSegmentButtons()
            .then( (ionSegmentButtons:WebElement[]) => {
                Promise.all<any>([
					ionSegmentButtons[0].getAttribute('class'),
					ionSegmentButtons[1].getAttribute('class'),
					ionSegmentButtons[2].getAttribute('class'),
					ionSegmentButtons[3].getAttribute('class')
				])
				.then( (values:string[]) => {
					for(let i = 0; i < values.length; i++) {
					expect(includes(values[i].split(" "),"segment-activated")).equal(segmentStatus[segment][i]);
					}
					done();
				})
				.catch( reason => done(reason) );
            });

    }

    getSegmentKeys() {
        return segmentKeys;
    }
}
