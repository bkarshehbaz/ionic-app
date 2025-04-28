import { Component, Input } from '@angular/core';
import { INote } from '../../lib/vvs-bridge/ionic/misc.interfaces';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { isArray, values } from 'lodash';

const logger = Logger.get("NotesRow");

@Component({
    selector: "notes-row",
    templateUrl: "./notes-row.html"
})
export class NotesRow {

	private _notes: INote[];

	@Input()
	set notes(val: INote[]) {
		if (!isArray(val)) {
			logger.error("Notes is not an array", val);
			this._notes = values(val);
		} else {
			this._notes = val;
		}
	}
	get notes() {
		return this._notes;
	}

    constructor() {

    }



}
