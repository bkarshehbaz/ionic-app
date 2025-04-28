import { IImage } from './image.interface';
import { ICoordinates } from './misc.interfaces';
export interface ICarPhoto extends ICoordinates, IImage {
    // data: string;
    // title?: string;
    // index: number;
	added?: boolean;
}	
