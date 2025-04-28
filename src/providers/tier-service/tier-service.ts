import { VVSApp } from "../vvs-controller/vvs-controller";
import { Observable, Observer } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Logger } from "../vvs-controller/util/logger";

const logger = Logger.get("TierService");

const tiers = {

    tier1: {
        DISABLE_SCAN_CAPABILITY: true,
        DISABLE_CALENDAR_EVENT: true,
    },

    tier2: {

    },

    tier3: {

    }

};

export class TierService {

    public static instance: TierService;
    public static get(vvsApp: VVSApp): TierService {
        return TierService.instance || ( TierService.instance = new TierService(vvsApp) );
    }

    observer: Observer<number>;

    constructor(private vvsApp: VVSApp) {

        (new Observable( observer => this.observer = observer) )
        .pipe(
            debounceTime(100),
            // distinctUntilChanged()
        )
        .subscribe(
            (value) => {
                // atacalo Majimbu
                // configure tiers in the server and 
                // return configuration on select property
                logger.info("atacalo Majimbu ", value);
            },
            (error) => {

            }
        );
    }

}
