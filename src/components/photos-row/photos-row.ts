import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IImageViewer, IImage, IImageChat } from '../../lib/vvs-bridge';
import { ICardNotesPhotosView } from '../card-notes-photos-map-view/card-notes-photos-map-view.options';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import { Logger } from "../../providers/vvs-controller/util/logger";
import { isArray, values, map, isString } from 'lodash';
import { pages } from '../../pages';
import { parseJSON } from '../../util/parse-json';
const logger = Logger.get("PhotosRow");

@Component({
    selector: "photos-row",
    templateUrl: "./photos-row.html"
})
export class PhotosRow {

	@ViewChild("scrollContent") scrollContent;

	@Input() openPicture = false;
	@Input() showRemoveButton = false;

    @Output() onPhotoClick = new EventEmitter<ICardNotesPhotosView>();

    @Input()
    set config(val: ICardNotesPhotosView) {
        if (val && !isArray(val.images) ) {
            val.images = isString(val.images) ? parseJSON(val.images, []) : values(val.images);
        }
        this._config = val;
    }
    get config(): ICardNotesPhotosView {
        return this._config;
	}

    constructor(public vvsApp: VVSApp) {

	}

	remove(event: any, image: any, i: number) {
		// debugger;
	}

    openImage(index: number, images: IImage[]) {
		if (this.openPicture) {
			logger.l("onPhotoClick", { images, index });
			const config: IImageViewer = {
				initialSlideIndex: index,
				// currentTicketID: undefined,
				images: map(images, image => ({ uri: image.uri })) as any
			};

			this.vvsApp.presentPopover(pages.imagesviewer, { config, ...{ class: "chat" } }, {} as any, {cssClass: "vvs-image-viewer"});
		} else {
			this.onPhotoClick.emit({ index, images, currentTicketID: undefined });
		}
	}

	getSrc(image: IImageChat) {
		if (this.config.class === "chat") {
			return image.uri = this.vvsApp.getChatImage(this.config.chatID, image.uid);
		}
		if (image) {
			return image.uri = this.vvsApp.getImage(this.config.currentTicketID, image.uid);
		}
	}

    private _config: ICardNotesPhotosView = { images: []} as any;

}
