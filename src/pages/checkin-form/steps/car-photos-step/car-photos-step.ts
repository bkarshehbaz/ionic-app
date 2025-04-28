import { Component, ElementRef, Input, QueryList, ViewChildren, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { VVSApp } from "../../../../providers/vvs-controller/vvs-controller";
import { carplaceholder } from '../../../../constants/constants';
import * as cat from '../../../../constants/event-categories';
import { cloneDeep, isArray, isNumber, toArray, pullAt, set, isEmpty, delay } from "lodash";
import { ICarPhoto, INote, ICoordinates, ICarPhotosStepOutput } from '../../../../lib/vvs-bridge';
import { Logger } from "../../../../providers/vvs-controller/util/logger";
// import { getFullName } from '../../../../util/get-full-name';

import { v4 as uuidv4 } from "uuid";

import { CameraService } from '../../../../providers/camera-service/camera-service';
import { ActionSheetButton } from 'ionic-angular';
import { CheckInFormProvider } from '../../checkin-form.provider';
import * as moment from "moment";

const logger = Logger.get("CarPhotosStep");

@Component({
	selector: "car-photos-step",
	templateUrl: "./car-photos-step.html"
})
export class CarPhotosStep {

	@Output() notify: EventEmitter<ICarPhotosStepOutput> = new EventEmitter();

	@ViewChildren("ionCards")
	set ionCards(val: QueryList<ElementRef>) {
		if (val && val.first && val.first.nativeElement) {
			// logger.info(val.first.nativeElement.);
			const elem: HTMLElement = val.first.nativeElement;
			setTimeout(() => {
				this.cardHeight = elem.clientHeight || elem.scrollHeight || elem.offsetHeight || this.cardHeight;
			});
		}
	}

	cardHeight: number;

	@Input() clearMode: boolean = false;

	_currentStep: boolean;
	@Input()
	set currentStep(val: boolean) {
		if (val == true) {
			this.validate();
			delay(() => this.validate(), 1000);

		}
		this._currentStep = val;
	}
	get currentStep() {
		return this._currentStep;
	}

	note = {} as INote;
	notes: INote[] = [];
	carPhotos: ICarPhoto[] = [];

	type: "rcheckin" | "checkin" = "checkin";

	is_iPad: boolean;

	get carplaceholder() {
		return carplaceholder;
	}

	constructor(
		private vvsApp: VVSApp,
		private formProvider: CheckInFormProvider,
		private cdr: ChangeDetectorRef,
	) {
		this.init();

		this.is_iPad = this.vvsApp.platform.is("ipad");

		this.cardHeight = this.is_iPad ? 180 : 120;
	}

	showImageOptions(event: any, index: number) {
		logger.info(this.carPhotos[index]);
		// alert("To be implemented");

		const title = "Actions";

		const buttons: ActionSheetButton[] = [
			{
				text: "Retake",
				handler: () => {
					this.takePicture(index);
				}
			},
			{
				text: "Remove",
				handler: () => {
					pullAt(this.carPhotos, index);
					this.validate();
					this.saveImages();
				}
			}
		];

		this.vvsApp.presentActionSheet(title, buttons);

	}

	init() {
		if (this.formProvider.currentProperty === 1000000000) {
			this.formProvider.updateNextStatus(true);

		}
		if (this.type == "rcheckin") {
			this.carPhotos = [];
			this.note = {} as INote;
		} else {
			Promise.all([
				this.formProvider.getCarPhotos(),
				this.formProvider.getNotes(),
				this.vvsApp.lss.getPropertyUserData()
			])
				.then(([carPhotos, notes, propertyUsers]) => {
					logger.i({ carPhotos, notes });
					if (this.clearMode == false) {
						this.carPhotos = carPhotos || [];
						this.note = {} as INote;
						this.notes = isArray(notes) ? cloneDeep(notes) : [];

						// forEach(this.notes, (note: INote, _key: any) => {
						// 	note.fullName = getFullName(propertyUsers[note.userID]);
						// });
					}
				})
				.catch(logger.e);
		}

		this.formProvider.FormStepObserver
			.subscribe(
				(event) => {

					switch (event.category) {

						case cat.RESET_FORM:
							this.note = {
								data: ""
							} as INote;
							this.notes = [];
							this.carPhotos = []; // resetPhotos();
							// this.formProvider.resetForm
							break;

						case cat.BLUR_ON_CAR_NOTES:
						case cat.BLUR:
							this.saveImages();
							this.validate();
							break;

					}

				},
				logger.e
			);
	}

	takePicture(index?: number) {
		CameraService
			.takePicture()
			.then((uri: string) => {
				const added = true;

				if (isNumber(index)) {
					// imageData is a base64 encoded string
					this.carPhotos[index].uid = this.carPhotos[index].uid || uuidv4();
					this.carPhotos[index].uri = uri;

					// marksimage as added so it can be later filtered out.
					this.carPhotos[index].added = added;
				} else {
					index = this.carPhotos.length;

					this.carPhotos.push({
						uri,
						uid: uuidv4(),
						added,
						index,
						date: moment.utc().toString()
						// title: "Extra"
					});
					this.cdr.detectChanges();
				}

				return this.saveImages();

			})
			.then(() => this.validate())
			.then(() => this.vvsApp.getCurrentLocation())
			.then((coords: ICoordinates) => this.carPhotos[index] = { ...this.carPhotos[index], ...coords })
			.catch(logger.e)
			.then(() => this.saveImages())
			.catch(logger.e);
	}

	saveImages() {
		logger.info("carPhotos", cloneDeep(this.carPhotos));
		return this.formProvider.setCarPhotos(this.carPhotos);
	}

	onImageError(ev: any) {
		ev = ev || { target: {} };
		ev.target.src = carplaceholder;
	}

	validate() {
		this.formProvider.setNotes(cloneDeep([...toArray(this.notes), this.note]));
		const nextStatus = this.formProvider.currentProperty === 1000000000 ? true : !isEmpty(this.carPhotos);
		this.notify.emit({
			nextStatus,
			carPhotos: this.carPhotos,
			notes: [this.note]
		});
		this.formProvider.updateNextStatus(nextStatus);
	}

}
