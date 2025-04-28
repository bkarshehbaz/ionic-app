import { IImage } from "./image.interface";

export interface IImageViewer {
	images: IImage[];
	// propertyID: number;
	// currentTicketID: number;
	initialSlideIndex: number;
}
