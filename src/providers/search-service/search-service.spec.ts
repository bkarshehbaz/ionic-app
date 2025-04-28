import {} from "jasmine";
import { CONFIGURE_TESTBEST } from '../vvs-controller/vvs-controller.util.spec';
import { VVSApp } from './../vvs-controller/vvs-controller';
import {SearchService} from './search-service';

describe("SearchService", () => {

    let vvsApp: VVSApp;
    let searchService: SearchService;

    beforeEach( (done: DoneFn) => {

        CONFIGURE_TESTBEST([])
            .then( (data) => {
                vvsApp = data.vvsApp;
                searchService = new SearchService(data.vvsApp);

                done();
            })
            .catch(done.fail);

    });

    it("should create", (done: DoneFn) => {
        expect(searchService).toBeTruthy();
        expect(searchService.initIndexChat).toBeTruthy();
        expect(searchService.initIndexRecentActivity).toBeTruthy();
        expect(searchService.initIndexTicket).toBeTruthy();
        expect(searchService.initModelIndex).toBeTruthy();
        expect(searchService.initMakeIndex).toBeTruthy();
    });

});
