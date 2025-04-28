import { Then, CallbackStepDefinition } from "cucumber";
import { SegmentUtil } from "../../pages/components/segment/segment.e2e-class";

Then(/^Segment Title should be ok$/, (done: CallbackStepDefinition) => {
	SegmentUtil.get().verifySegmentTitles(done);
});

Then(/^Segment status should be ok and Staged$/, (done: CallbackStepDefinition) => {
	SegmentUtil.get().verifySegmentStatus("staged", done);
});

Then(/^Segment status should be ok and Pull$/, (done: CallbackStepDefinition) => {
	SegmentUtil.get().verifySegmentStatus("pull", done);
});

Then(/^Segment status should be ok and All Cars$/, (done: CallbackStepDefinition) => {
	SegmentUtil.get().verifySegmentStatus("allcars", done);
});

Then(/^Segment status should be ok and My Cars$/, (done: CallbackStepDefinition) => {
	SegmentUtil.get().verifySegmentStatus("mycars", done);
});
