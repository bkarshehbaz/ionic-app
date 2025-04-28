// import { valid } from '../constants/constants';
// import { checkValue, toStringTrim } from './lib';

// export const ticketNumber = (tN) => (toStringTrim(tN).length === 5 && !Number.isNaN(Number.parseInt(tN))) || toStringTrim(tN).length === 0;
// export const customerFirstName = (fN) => toStringTrim(fN).length > 2;
// export const customerLastName = (lN) => lN && lN.trim().length > 2;
// export const customerPhone = (cP) => cP && /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(cP);
// export const roomNumber = (rN) => rN;
// export const ticketType = (ticketTypeName: string, ticketTypeID: number) => checkValue( ticketTypeName, ticketTypeID );
// export const companyEvent = (companyEventName: string, companyEventID: number) => checkValue( companyEventName, companyEventID );

// export const carYear = (cY) => checkValue(cY) && toStringTrim(cY).length === 4 && parseInt(cY, 10) > 1940;
// export const color = (colorName: string, colorID: number) => checkValue(colorName, colorID);
// export const isValid = (v) => v  === valid;
