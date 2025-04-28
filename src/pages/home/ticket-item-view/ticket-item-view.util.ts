import * as moment from 'moment';

export const getTimeDifference = (timestamp: string) => {
    return Date.now() - Number(timestamp);
};

export const fixDigit = (val: any): string => {
    return val.toString().length === 1 ? "0" + val : val;
};

export const getTimeDiffInMinute = (timestamp: string) => {
    return Math.floor(getTimeDifference(timestamp) / 1000 / 60);
};

export const getFormattedHTML = (timestamp: string) => {
    // return "";
    let difference = getTimeDifference(timestamp);

    // console.log({now: new Date().getTime(), value, difference});

    const minutes = Math.floor(difference / 1000 / 60);


    if (minutes > 59) {
        return `<span class="blink_red">${moment(Number(timestamp)).fromNow(true).toUpperCase()}</span>`;
    } else {

        const classToUse = minutes > 4 ? "blink_red" : "blink_off";

        const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24;

        const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60;

        const minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60;

        const secondsDifference = Math.floor(difference / 1000);

        return `<span class="${classToUse}">${fixDigit(hoursDifference)}:${fixDigit(minutesDifference)}:${fixDigit(secondsDifference)}</span>`;
    }

};
