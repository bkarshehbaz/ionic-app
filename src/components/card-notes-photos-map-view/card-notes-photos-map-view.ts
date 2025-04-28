import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ICardNotesPhotosView } from "./card-notes-photos-map-view.options";
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import * as cf from '../../constants/constant-fields';
import { findIndex, isEmpty, map, upperFirst, isArray, throttle } from 'lodash';
import { IImageViewer } from '../../lib/vvs-bridge';
import { checkValue } from "../../util/index";

import { Logger } from "../../providers/vvs-controller/util/logger";
import { pages } from '../../pages/index';
import { SegmentButton } from 'ionic-angular';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { carplaceholder } from '../../constants/constants';

const logger = Logger.get("CardNotesPhotosView");

interface CardViewTab {
	title: string;
	disabled: boolean;
	value: string;
}

@Component({
	selector: "card-notes-photos-map-view",
	templateUrl: "./card-notes-photos-map-view.html"
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNotesPhotosView {

	tabs: CardViewTab[];

	selectedProperty: any;
	isDestroyed = false;

	tmp: Subject<any>;

	@Input() marginTop: number = 12;

	private _activeSegment: string;
	@Input()
	set activeSegment(val: string) {
		this._activeSegment = val;
		this.refreshChanges();
	}
	get activeSegment() {
		return this._activeSegment;
	}

	refreshChanges = throttle(() => {
		this.cdr.detectChanges();
	}, 100);

	@Input()
	set config(config: ICardNotesPhotosView) {
		logger.info("set config");

		if ((config as any) === false) {
			this._config = {} as any;
		} else {
			this._config = config;
			this._config.class = "card-notes";

			this.tmp.next({});

		}
	}

	get config() {
		return this._config;
	}

	get carplaceholder() {
		return carplaceholder;
	}
	constructor(private vvsApp: VVSApp, private cdr: ChangeDetectorRef) {

		this.tmp = new Subject<any>();

		this.tmp
			.pipe(
				takeWhile(_ => !this.isDestroyed),
				debounceTime(300)
			)
			.subscribe(
				(data) => {
					this.getTabs();
				},
				logger.error
			);

		this.selectedProperty = JSON.parse(localStorage.getItem('selectedProperty'));
	}

	isShowPaymentStatus() {
		console.log("selectedProperty in card", this.selectedProperty);
		console.log("config", this.config);
		if (this.selectedProperty && this.selectedProperty.hotelID && this.config && this.config.ticket && this.config.ticket.TicketType && this.config.ticket.TicketType.isHotel == 1) {
			return false;
		} else {
			return true;
		}
	}

	onSelect(segmentButton: SegmentButton) {
		logger.info("onSelect", segmentButton);
		if (segmentButton.value == this.activeSegment) {
			return;
		}
		this.activeSegment = segmentButton.value;
		setTimeout(() => {
			this.activeSegment = segmentButton.value;
			this.cdr.detectChanges();
		});
	}

	ngOnDestroy() {
		this.isDestroyed = true;
	}

	getTabs() {
		logger.info("getTabs()");

		if (this.isDestroyed) {
			return;
		}

		const statusObject = this.determineIfDisable(this._config);

		if (statusObject) {
			const status = statusObject.status;
			const values = [cf.notes, cf.photos, cf.map, cf.recent, cf.payment];

			const index = statusObject.index;

			this.tabs = map(values, (value, k) => {

				return {
					title: upperFirst(value),
					value,
					disabled: status[k]
				};

			});

			if (!this.activeSegment) {
				this.activeSegment = this.tabs[index].value;
			}

			this.cdr.detectChanges();

			setTimeout(() => {
				if (!this.isDestroyed) {
					if (!this.activeSegment) {
						this.activeSegment = this.tabs[index].value;
					}

					this.cdr.detectChanges();
				}
			}, 100);
		}

	}

	determineIfDisable({ currentTicketID, notes, images, mapUrl, recentActivityItems, isParked } = {} as ICardNotesPhotosView) {
		logger.i({ notes, images, mapUrl, recentActivityItems });
		const status: boolean[] = [];
		status[0] = isEmpty(notes) || (isArray(notes) && isEmpty(notes[0]));
		status[1] = isEmpty(images);
		status[2] = !mapUrl; // !(isParked && !isEmpty(mapUrl));
		status[3] = false; // there will always be at least one recent activity
		status[4] = false;

		let index = findIndex(status, (val: boolean) => val === false);
		logger.l("determineIfDisable >>> indexFound", index);
		index = index === -1 ? 0 : index;
		status[index] = false;

		logger.l("determineIfDisable >>> status, index", status, index);


		return { status, index };

	}

	//http://www.codingandclimbing.co.uk/blog/ionic-2-open-native-maps-application-22
	openMapsApp() {
		// var coords = item.lat + "," + item.lng;
		// let coords = this.config.location;
		logger.l(this.config.location);
		if (checkValue(this.config.location)) {
			// logger.debug(this.config.platform);

			this.config.platform.includes(cf.ios)
				? window.open("http://maps.apple.com/?q=" + this.config.location, cf._system)
				: this.config.platform.includes(cf.android)
					? window.open("geo:" + this.config.location)
					: window.open("http://maps.google.com/?q=" + this.config.location, cf._system);

		}
	}

	onPhotoClick({ images, index }: ICardNotesPhotosView) {
		logger.l("onPhotoClick", { images, index });
		const config: IImageViewer = {
			initialSlideIndex: index,
			// currentTicketID: currentTicketID || this.config.currentTicketID,
			images
		};

		this.vvsApp.presentPopover(pages.imagesviewer, { config }, {} as any, { cssClass: "vvs-image-viewer" });
	}

	// onPhotoClick({ images, index, currentTicketID }: ICardNotesPhotosView) {
	//     const modal = this.vvsApp.modalCtrl.create(GalleryModal, { 
	// 		photos: images.map( x => {
	// 			return {
	// 				url: x.uri
	// 			};
	// 		})
	// 	});
	// 	modal.present();
	// }


	expandRecentActivities(event: Event) {

		const data = {
			recentActivities: this.config.recentActivityItems,
			ticketNumber: this.config.ticketNumber
		};

		const options = { cssClass: 'recent-activity-expanded' };

		this.vvsApp.presentPopover(pages.recentactivityexpanded, data, event, options);

	}

	private _config: ICardNotesPhotosView;

}
