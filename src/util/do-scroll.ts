import { toString } from "lodash";

export const doScroll = (event: Event, term: string, max: number, cb: () => void) => {
    const { scrollHeight: sH, scrollTop: sT, clientHeight: cT } = event.target as HTMLElement;
    (sH - sT === cT) && toString(term).length < max && cb();
};
