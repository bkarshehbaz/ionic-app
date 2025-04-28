import { INote, IRecentActivityItem, IImage } from "../../lib/vvs-bridge";
import { Observable } from "rxjs";
import { IFullTicket } from "../../util";

export interface ICardNotesPhotosView {
    voucherPhotoURL?: string;
	currentTicketID: number;
	chatID?: number;

    location?: string;
    platform?: string[];
    images?: IImage[];
    notes?: INote[];
    photosStatus?: boolean;
    disableMap?: boolean;
    mapUrl?: string;
    mapStatus?: boolean;
    propertyID?: number;
    infoCategories?: string;
    editing?: boolean;
    activeSegment?: string;
    recentActivityItems?: Observable<IRecentActivityItem[]>;
    ticketNumber?: string;

    // new
    parkLocationName?: string;

    //

    class?: "chat" | "card-notes";
	index?: number;

    isParked?: boolean;
    
    ticket?: IFullTicket;

}
