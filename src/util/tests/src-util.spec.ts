import {} from "jasmine";
import { getGMapUrl } from '../get-googlemap-url';
import { IFullTicket } from './../process-full-ticket';
import { unmaskPhoneNumber } from './../unmask-phone-number';

import { parseJSON } from '../parse-json';

// import {} from '@types/jasmine';
import { keyBy, sample } from "lodash";
import { ICustomer } from '../../lib/vvs-bridge';
import { checkValue } from "../check-value";
// import { generateSSTV } from '../generate-single-small-ticket-view';
import { initializeMap, loginUser } from "./data.spec";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('Lib.ts  >>  ', () => {

    it("checkValue", () => {

        // positive
        expect(checkValue('1' === '1')).toBe(true);  // tslint:disable-line:ter-no-self-compare

        // negative
        expect(checkValue('1' === '1', undefined)).toBe(false); // tslint:disable-line:ter-no-self-compare

	});

	it("get-googlemap-url", () => {

		// Arrange
		const expected = '?center=location&zoom=18&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7Clocation';

		// Act
		const x = getGMapUrl('location');

		// Assert
		expect(x).toBe(expected);

	});

    it("doScroll", () => {

    });

    // it("generate-single-small-ticket-view || generateSSTV", () => {

    //     // Arrange
    //     // const rawImages = "[{\"uid\": \"fde687fe-c78a-4cff-8fc3-d7899c9f5be5\", \"index\": 0}, {\"uid\": \"36a7ea1f-090b-48a5-be9b-52b7e0dc8d76\", \"index\": 1}]";
    //     const ticketID = 1000000165;

    //     const ticket = initializeMap.CurrentTicket[ticketID];

    //     // tslint:disable-next-line:no-console
    //     // console.log({ticket, tickets: initializeMap.CurrentTicket});

    //     const iFullTicket = {} as IFullTicket;
    //     iFullTicket.ticket = ticket;
    //     iFullTicket.customer = initializeMap.Customer[ticket.customerID];
    //     iFullTicket.car = initializeMap.Car[ticket.carID];
    //     iFullTicket.ticketType = {} as any;
    //     iFullTicket.ticketType = {} as any;
    //     iFullTicket.make = {} as any;
    //     iFullTicket.model = {} as any;
    //     iFullTicket.color = {} as any;
    //     iFullTicket.ticketSequence = initializeMap.TicketSequence[ticketID];
    //     iFullTicket.loginUser = loginUser as any;
    //     iFullTicket.loginUser.CurrentProperty = loginUser.properties[0] as any;
    //     // iFullTicket.loginUser.CurrentProperty = sample(initializeMap.Property);

    //     // Act
    //     const iTicketSmallItem: ITicketSmallItem = generateSSTV(iFullTicket);

    //     // Assert
    //     // tslint:disable-next-line:no-console
    //     console.log({iTicketSmallItem});
    // });

    xit("getBalance", () => {});
    xit("getCustomerFullname", () => {});
    xit("getCustomerFullticket", () => {});
    xit("getFullTicket", () => {});
    xit("getHomeSegmentsForTicket", () => {});

    // xit("getParseImages", () => {

    //     // Arrange
    //     const rawImages = "[{\"uid\": \"fde687fe-c78a-4cff-8fc3-d7899c9f5be5\", \"index\": 0}, {\"uid\": \"36a7ea1f-090b-48a5-be9b-52b7e0dc8d76\", \"index\": 1}]";

    //     // Act
    //     // getParseImages();

    //     // Assert

    // });

    xit("getProfilePhoto", () => {});
    xit("getRecentActivityItem", () => {});
    xit("getRowFormatted", () => {});
    xit("getRowFormatted2D", () => {});
    xit("getUserInitials", () => {});
    // xit("getValue", () => {});
    xit("isAllValid", () => {});
    xit("isNumber", () => {});
    xit("isValid", () => {});

    it("parseJSON", () => {

        // Arrange
        const rawImages = "[{\"uid\": \"fde687fe-c78a-4cff-8fc3-d7899c9f5be5\", \"index\": 0}, \
                            {\"uid\": \"36a7ea1f-090b-48a5-be9b-52b7e0dc8d76\", \"index\": 1}]";

        // Act
        const images = parseJSON(rawImages) as Array<{ uid: string, index: number}>;

        // Assert
        expect(images.length).toBe(2);
        expect(images[0].uid).toBe("fde687fe-c78a-4cff-8fc3-d7899c9f5be5");
        expect(images[1].uid).toBe("36a7ea1f-090b-48a5-be9b-52b7e0dc8d76");

    });

    xit("processFullTicket", () => {});
    xit("resetPhotos", () => {});
    xit("returnFirstIfTrue", () => {});
    xit("scannedLicense", () => {});
    xit("scannedTicket", () => {});
    xit("scannedVIN", () => {});
    xit("tabsEliminator", () => {});
    xit("toStringTrim", () => {});

    describe("unmaskPhoneNumber", () => {

        it("positive", () => {
            const phoneNumber = unmaskPhoneNumber("(704) 713-5608");

            expect(phoneNumber).toBe("7047135608");
        });

        it("negative", () => {

        });

    });

    xit("uuid", () => {});
    xit("validations", () => {});
    xit("vvs-validations", () => {});


});

