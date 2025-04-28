import { Subject } from 'rxjs';
import { LocalStorageService } from "../local-storage-service/local-storage-service";
import { NumericMap } from "../../lib/vvs-bridge";
import { keys, isNumber, forEach } from "lodash";
import { StorageKey } from "../local-storage-service/local-storage-service.base";

export class BadgeService {

    // private _count = 0;
	private _subject = new Subject<string>();
	public get subject() {
		return this._subject;
	}

	ids: NumericMap<0|1> = {};

	constructor(private lss: LocalStorageService, private key: StorageKey) {

	}

	refresh() {
		this.lss.vvsApp.ready()
		.then( () => this.lss._getString(this.key) )
		.then( v => this.set(v) );
	}

    add(...ids: number[]) {
		forEach(ids, id => {
			this.ids[id] = 1;
		});
        this.set(keys(this.ids).length);
	}

    clear() {
		this.ids = {};
        this.set(0);
    }

    private set(count: number|string) {
		const nextVal = isNumber(count) ? `${count === 0 ? "" : count}` : count;
		this.subject.next(nextVal);
		this.lss._setString(this.key, nextVal);
    }

}
