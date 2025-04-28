
// import ListItemUtil from "../list-item-util";

import { segmentUtil } from "../../../../components/segment/segment.e2e-class";

import { SegmentBase } from "../segment-base.e2e-class";


class StagedTab extends SegmentBase {}

export const stagedTab = new StagedTab(segmentUtil.getSegmentKeys().staged);
