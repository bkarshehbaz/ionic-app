import { forEach } from "lodash";
import { carplaceholder } from "../constants/constants";
import { ICarPhoto } from "../lib/vvs-bridge";

const photos: string[] = ["Front", "Back", "Left", "Right", "Extra"];
export const resetPhotos = () => {
    const cards: ICarPhoto[] = [];
    forEach(photos, (title, index) => {
        cards.push({ uri: carplaceholder, index } as ICarPhoto);
        // cards.push({ uri: carplaceholder, title, index, added: false} as ICarPhoto);
    });
    return cards;
};
