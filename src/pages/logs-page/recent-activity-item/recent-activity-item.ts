import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { IRecentActivity, IRecentActivityItem } from '../../../lib/vvs-bridge';
import { IRecentActivityItemClick } from './recent-activity-item.options';
import { values, orderBy } from 'lodash';
import * as cf from "../../../constants/constant-fields";

@Component({
    selector: "recent-activity-item",
    templateUrl: "./recent-activity-item.html"
})
export class RecentActivityItem {

	_recentActivities: IRecentActivityItem[];
	@Input()
	set recentActivities(val) {
        this._recentActivities = !val ? [] : values(orderBy(val, [cf.recentActivityID], [cf.desc]));
	}
	get recentActivities() {
		return this._recentActivities;
    }

    @Input() min: number = 0;
    @Input() max: number = 10;
    @Input() myLimit : number = 10;
    @Input() noOptions : boolean;
    @Output() onOptionClickEvent = new EventEmitter<IRecentActivityItemClick>();
    @Output() shownCount: EventEmitter<number> = new EventEmitter<number>();

    // @ViewChildren("spans")
    // set spans(val: QueryList<any>) {
    //     // console.log(val);
    //     if (val) {
    //         this.shownCount.emit(val.length);
    //     }
    // }


    constructor() {}

    trackById(index: number, item: IRecentActivity) {
        return item && item != null ? item.recentActivityID : null;
    }

    onOptionClicked(ev: Event, rAI: IRecentActivityItem) {
        this.onOptionClickEvent.emit({ ev, rAI });
    }

}
