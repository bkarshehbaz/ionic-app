import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement} from "@angular/core";
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ILoginCredentials, ILoginSuccess } from '../../lib/vvs-bridge';
import * as CodeMessages from '../../constants/code-messages';
import { IInitialize } from '../../lib/vvs-bridge/api-return/initialize.interface';
import { rawInitializeData } from '../../util/tests/data.spec';
import { VVSApp } from '../vvs-controller/vvs-controller';

import { CONFIGURE_TESTBEST } from '../vvs-controller/vvs-controller.util.spec';
import { HttpService } from "./http-service";

import { By } from '@angular/platform-browser';
import {} from "jasmine";

describe('HttpService', () => {
    let httpService: HttpService;
    let httpMock: HttpTestingController;
    let debugElement: DebugElement;
    let data: {
        vvsApp: VVSApp;
        fixture: ComponentFixture<any>;
        component: any;
        httpMock: HttpTestingController;
    };

    beforeEach( ((done: DoneFn) => {
        CONFIGURE_TESTBEST([], undefined)
        .then( (_data) => {
            data = _data;
            httpService = HttpService.get(data.vvsApp);
            httpMock = data.httpMock;

            debugElement = data.fixture.debugElement;

            done();
        });

    }));

    // beforeEach(inject([
    //     HttpService,
    //     HttpTestingController
    // ], (_httpService: HttpService,
    //     _httpMock: HttpTestingController) => {

    //         httpMock = _httpMock;

    //     }));

    afterEach(() => {
        httpMock.verify();
    });

    describe('authenticate', () => {

        it('should return a random Chuck Norris quote', (done: DoneFn) => {

            // Arrange
            const mockUser = {} as ILoginCredentials;
            mockUser.username = "admin";
            mockUser.password = "admin";

            const onLoginSuccessSpy = spyOn(httpService, "onLoginSuccess");

            const mockResponse = CodeMessages.Success as ILoginSuccess;


            // Act
            const subscription = httpService.authenticate(mockUser);

            // Assert
            subscription.subscribe(
                (_data) => {
                    expect(onLoginSuccessSpy).toHaveBeenCalled();
                    done();
                },
                done.fail
            );

            // trigger
            httpMock.expectOne({}).flush(mockResponse);

            // // Assert
            // randomQuoteSubscription.subscribe((quote: string) => {
            //     expect(quote).toEqual(mockQuote.value);
            // });
            // httpMock.expectOne({}).flush(mockQuote);

        });

        it('should return a string in case of error', () => {
            // // Act
            // const randomQuoteSubscription = httpService.checkOut({ category: 'toto' });

            // // Assert
            // randomQuoteSubscription.subscribe((quote: string) => {
            //     expect(typeof quote).toEqual('string');
            //     expect(quote).toContain('Error');
            // });
            // httpMock.expectOne({}).flush(null, {
            //     status: 500,
            //     statusText: 'error'
            // });

        });
    });

    describe("initializeTickets", () => {

        it("should return valid data", (done: DoneFn) => {

            // Arrange
            const mockInit = rawInitializeData as IInitialize;
            const onHandleAllTicketData = spyOn((httpService as any).lss, "handleAllTicketData");

            // Act
            const subscription = httpService._initializeTickets();
            data.fixture.detectChanges();

            // Assert
            expect(debugElement.query(By.css(".loading-ios"))).toBeDefined();
            subscription.subscribe(
                 (_data) => {
                    expect(onHandleAllTicketData).toHaveBeenCalled();
                    expect(onHandleAllTicketData).toHaveBeenCalledWith(mockInit);
                    expect(debugElement.query(By.css(".loading-ios"))).toBeNull();
                    done();
                },
                done.fail
            );

            // Trigger
            httpMock.expectOne({}).flush(mockInit);



        });

    });


});
