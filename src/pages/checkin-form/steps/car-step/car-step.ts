import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DateTime, Item, ModalOptions, PopoverOptions } from 'ionic-angular';
import { VVSApp, IMakeModelResult } from '../../../../providers/vvs-controller/vvs-controller';
import { delay, forEach, /*isNil,*/ toString, values, isEmpty, set, get, map as _map, find, includes, lowerCase, mean, debounce } from 'lodash';
// import { invalid } from "../../../../constants/constants";
import * as cat from '../../../../constants/event-categories';
import * as cf from '../../../../constants/constant-fields';
import * as t from '../../../../constants/constant-titles';
import { ICarStepModel, ICarStepOutput, IColor, NumericMap, ICarStepControl, IUser, /*IMake, IModel*/ } from '../../../../lib/vvs-bridge';
import { checkValue, toStringTrim } from '../../../../util/index';
// import * as cspEnum from './car-step.options';
import { Logger } from '../../../../providers/vvs-controller/util/logger';
import { pages } from '../../../../pages/index';
import { ISearchablePopoverCallbackResult } from '../../../../popovers/searchable-popover/searchable-popover';
import { CheckInFormProvider } from '../../checkin-form.provider';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, tap, takeWhile } from 'rxjs/operators';
import { Taptic } from '../../../../providers/haptic-service';
import { RollbarService } from '../../../../services/rollbar';
// import { ManateeCode } from '../../../../providers/manatee-scanner/manatee-scanner';
import { CameraService } from '../../../../providers/camera-service/camera-service';
import { HttpHeaders } from '@angular/common/http';
import { Debounce } from 'lodash-decorators';
import { IOpenALPR, IOpenALPRResult, IOpenALPRVehicle, vinAPIConstants, VINAPIResponse, VINAPIResult } from './car-step.options';
import { equalsIgnoreCase } from '../../../../util/equals-ignore-case';
import { ENV } from '../../../../environments';
import { httpRetry } from '../../../../operators/http-retry/http-retry.operator';
import { to } from '../../../../util/to';
import { fixBarCode } from '../../../../util/fix-vin';

const logger = Logger.get("car-step");

@Component({
	selector: "car-step",
	templateUrl: "./car-step.html"
})
export class CarStep {

	@ViewChild("dateTimePicker") dateTimePicker: DateTime;

	@ViewChild("makeItem") makeItem: Item;
	@ViewChild("modelItem") modelItem: Item;

	// validations: cspEnum.CarValidationInterface = {} as cspEnum.CarValidationInterface;

	// makes: IMake[]  = [];
	// models: IModel[] = [];
	// colors: IColor[] = [];
	// ticketTemp: any;


	// vinTimeOut: any;
	isGettingVINFromServer: boolean = false;
	lastVinNumber: string;

	// validateMeTimeout: any;
	// blurTimeout: any;

	// validationTries = 0;

	myForm: FormGroup;

	editMode = false;

	@Output() notify: EventEmitter<ICarStepOutput> = new EventEmitter();

	_currentStep: boolean;
	isFormLoading: boolean = true;

	@Input()
	set currentStep(val: boolean) {

		if (val == true) {

			this.formProvider.updateNextStatus(this.myForm.valid);
		}
		this._currentStep = val;
	}
	get currentStep() {
		return this._currentStep;
	}


	// tslint:disable-next-line: member-ordering
	constructor(
		public formBuilder: FormBuilder,
		private formProvider: CheckInFormProvider,
		public vvsApp: VVSApp,
		private cdr: ChangeDetectorRef,
	) {

		this.createForm();

		this.myForm.controls['electric'].valueChanges
			.pipe(
				takeWhile(_ => !this.isDestroyed),
			)
			.subscribe(
				(data) => this.cdr.detectChanges(),
			)

		this.myForm.valueChanges
			.pipe(
				takeWhile(_ => !this.isDestroyed),
				tap(() => {
					this.formProvider.updateNextStatus(this.myForm.valid)
				}),
				debounceTime(500)
			)
			.subscribe(
				() => {
					this.onValueChanges();
				},
				logger.error
			);


		this.myForm.statusChanges
			.subscribe(
				() => {
					this.notify.emit({ nextStatus: this.myForm.valid });
				},
				logger.error
			);

		// this.f.manual.valueChanges
		// .subscribe(
		// 	(next) => {
		// 		logger.info("this.f.manual.valueChanges", next);
		// 		if (next == "1") {
		// 			setTimeout( () => this.manualInput && this.manualInput.nativeElement.click(), 200 );
		// 		} else {
		// 			setTimeout( () => this.autoInput && this.autoInput.nativeElement.click(), 200 );
		// 		}
		// 	}
		// );
	}

	onValueChanges() {
		const form: ICarStepControl<any> = this.myForm.getRawValue();
		const ticket = form as ICarStepModel;
		this.formProvider.setCarStep(ticket);

		// debugger;
		this.notify.emit({ nextStatus: this.myForm.valid });

		// this.detectChanges();

	}


	// detectChanges = debounce( () => {
	// 	this.cdr.detectChanges();
	// });

	createForm() {
		this.myForm = this.formBuilder.group({
			manual: ['0', [Validators.required]],
			electric: [false, [Validators.required]],
			// fueltype: ['0', [Validators.required] ],
			makeName: ['', [Validators.required]],
			makeID: ['', [Validators.required]],
			modelName: ['', [Validators.required]],
			modelID: ['', [Validators.required]],
			colorName: ['', [Validators.required]],
			colorID: ['', [Validators.required]],
			carYear: [''],
			vinNumber: [''],
			licensePlate: this.formProvider.currentProperty === 1000000000 ? [''] : ['', [Validators.required, Validators.minLength(5)]]
		});

		// [
		// 	this.f.makeName,
		// 	this.f.modelName,
		// 	this.f.colorName,
		// 	this.f.vinNumber
		// ].map( x => x.disable({emitEvent: true}));
	}


	ngOnDestroy() {
		this.isDestroyed = true;
	}

	isDestroyed = false;

	ngOnInit() {
		this.isDestroyed = false;

		this.f.manual.setValue('0');
		this.f.electric.setValue(false);

		this.formProvider.getCarStep()
			.then((val) => {
				if (val) {
					this.setValues(val);

					this.editMode = val.status != "adding";

					// debugger;

					if (val.status != "adding") {
						setTimeout(() => {
							// logger.l("car-step constructor", this.vvsApp.getActivePageName());
							this.editMode = this.editMode || this.vvsApp.getActivePageName().name == "ModalCmp";
						}, 100);
					}
				} else {
					this.reset();
					this.notify.emit({ nextStatus: false });
				}
			})
			.catch(logger.e);

		this.formProvider.FormStepObserver
			.subscribe((event) => {

				this.notify.emit({ nextStatus: this.myForm.valid });

				switch (event.category) {

					case cat.RESET_FORM:
						this.reset();
						break;

					case cat.VALIDATE_CAR:
						this.formProvider.updateNextStatus(this.myForm.valid);
						break;

					case cat.BLUR_ON_CAR:
					case cat.BLUR:
						// this.onBlurClick();
						break;
				}

			});


		this.myForm.valueChanges
			.pipe(
				debounceTime(250),
				tap(() => {
					// debugger;
					// set(this.formProvider, "ticket.CurrentStep.formstep.nextStatus", this.myForm.valid);

					this.formProvider.updateNextStatus(this.myForm.valid);
				}),
				// throttleTime(250)
			)
			.subscribe(
				(next) => {
					this.formProvider.updateNextStatus(this.myForm.valid);

				}
			)
		// this.initValidations();

		// //NOTE initialize makes and models with the common ones.
		// this.vvsApp
		// 	.lss
		// 	.getColorData()
		// 	.then( ($c: NumericMap<IColor>) => {
		// 		this.colors = values($c);
		// 	})
		// 	.catch(logger.e);

	}

	reset() {
		this.myForm.reset();
		this.f.manual.setValue('0');
		this.f.electric.setValue(false);
		this.lastVinNumber = "";
	}

	setValues(ticket: ICarStepModel) {
		const {
			manual, electric,
			makeName,
			makeID,
			modelName,
			modelID, colorName,
			colorID,
			carYear,
			vinNumber,
			licensePlate
		} = ticket;

		const vals = {
			manual: manual || 0,
			electric: electric || 0,
			makeName,
			makeID,
			modelName,
			modelID,
			colorName,
			colorID,
			carYear,
			vinNumber,
			licensePlate,
		};

		forEach(vals, (val, key) => {
			vals[key] = toString(val);
		});

		(vals as any).electric = vals.electric == 0 ? false : true;

		this.myForm.setValue(vals);

		if (ticket.status == "editing") {
			// this.vvsApp.presentSingleAlert("Editing test");
			[
				this.f.makeName,
				this.f.modelName,
				this.f.colorName,
			].map(x => x.markAsTouched());
		}

	}

	isEmpty() {
		return isEmpty(this.formProvider.ticket.CarStep);
	}

	canPresent() {
		if (this.vvsApp.popovers[pages.searchable] || this.vvsApp.modals[pages.colorpopover]) {
			return false;
		}
		return true;
	}

	onChange(ev: any) {
		Taptic.selection();
	}

	async presentColorPopover(event?: Event) {

		if (!this.canPresent()) {
			this.vvsApp.toast("presenting");
			logger.info(this.vvsApp);
			return;
		}

		const [colors] = await to(this.vvsApp.lss.getColorData());

		const data: { colors: IColor[], callback: (d: any) => void } = {
			colors: values(colors),
			callback: (_data) => {
				this.f.colorName.markAsTouched();
				this.f.colorName.setValue(_data.colorName);
				this.f.colorID.setValue(_data.colorID);
			}
		};
		const options: ModalOptions = { cssClass: 'color-popover' };

		this.vvsApp.presentModal(pages.colorpopover, data, undefined, options);

	}

	presentSearchablePopover(event: Event, searchableType: string, opts: PopoverOptions) {

		if (!this.canPresent()) {
			this.vvsApp.toast("presenting");
			logger.info(this.vvsApp);
			return;
		}

		if (searchableType && searchableType === cf.model && !(this.f.makeID.valid)) {
			this.vvsApp.toast(t.PLEASE_SELECT_A_MAKE_FIRST, 3000);
			return;
		}

		const data = {
			searchableType,
			make: { makeName: this.f.makeName.value, makeID: this.f.makeID.value },
			lastSearchKeyword: searchableType === cf.make
				? this.formProvider.ticket.lastMakeFilterKeyword
				: this.formProvider.ticket.lastModelFilterKeyword,

			callback: (_data: ISearchablePopoverCallbackResult) => {

				if (searchableType) {

					if (searchableType === cf.make) {
						this.f.makeName.markAsTouched();
						this.f.makeName.setValue(_data.makeName);
						this.f.makeID.setValue(_data.makeID);

						this.f.modelName.setValue("");
						this.f.modelID.setValue("");

						this.formProvider.ticket.lastMakeFilterKeyword = _data.lastMakeFilterKeyword;

						opts = {} as PopoverOptions;
						opts.cssClass = "searchable-popover-right";

						delay(() => this.presentSearchablePopover(event, cf.model, opts), 300);

					} else if (searchableType === cf.model) {
						this.f.modelName.markAsTouched();
						this.f.modelName.setValue(_data.modelName);
						this.f.modelID.setValue(_data.modelID);

						this.formProvider.ticket.lastModelFilterKeyword = _data.lastModelFilterKeyword;

						// if(isEmpty(this.f.carYear.value)) {
						// 	delay( () => !isNil(this.dateTimePicker) && this.dateTimePicker.open(), 300);
						// }
					}

					logger.l("car-step-searchable post", this.myForm.getRawValue());

				} else {
					RollbarService.error("No searchableType provided|car-step|434");
				}

			}
		};

		opts = opts || { cssClass: 'searchable-popover' };

		this.vvsApp.presentPopover(pages.searchable, data, event, opts);

	}



	scanManateeVIN() {

		// this.getDataFromServer("JTDBT4K34CL011780");
		// if("true")return;

		/**
		 * for testing
		 */
		// this.f.vinNumber.setValue("");
		// this.f.makeID.setValue("")
		// this.f.makeName.setValue("")
		// this.f.modelID.setValue("")
		// this.f.modelName.setValue("")
		// this.f.carYear.setValue("")
		/**
		 * for testing
		 */

		this.notify.emit({ nextStatus: null/*, isScanning: true title: t.SCANNING_VIN,*/ });
		Taptic.light();

		this.vvsApp.barcodeScanner.scan()
			.then((response) => {
				if (response && (response.format == 'CODE_39' || response.format == 'CODE_128')) {
					if (response.text) {
						this.getDataFromServer(response.text);
					} else {
						RollbarService.warn("scanManateeVIN no response");
					}
				} else {
					this.vvsApp.presentSingleAlert("Scan a valid VIN");

				}
			})

		// this.vvsApp.manatee.startScanning()
		// .then((response) => {
		// 	if (response.type == ManateeCode.vin) {
		// 		if (response && response.code) {
		// 			this.getDataFromServer(response.code);
		// 		} else {
		// 			RollbarService.warn("scanManateeVIN no response");
		// 		}
		// 	} else {
		// 		this.vvsApp.presentSingleAlert("Scan a valid VIN");
		// 	}

		// 	this.notify.emit({ nextStatus: null/*, isScanning: false, title: t.ADD_CAR*/ });
		// })
		// .catch(logger.e);
	}

	@Debounce(300)
	getDataFromServer(barcode: string): void {
		barcode = fixBarCode(barcode);

		// if (this.vvsApp.user.username == "estrel") {
		// 	this.vvsApp.presentSingleAlert(JSON.stringify({
		// 		barcode,
		// 		len: barcode.length,
		// 	}, null, 3));
		// }

		// logger.warn("getDataFromServer", barcode, !checkValue(barcode), !this.fixBarCode(barcode));

		// if ( !this.verifyBarcode(barcode) || this.lastVinNumber === barcode ) {
		if (this.lastVinNumber === barcode) {
			return;
		}

		this.isGettingVINFromServer = true;
		this.lastVinNumber = barcode;

		this.vvsApp.httpService
			.getCarInfoRestful(barcode)
			.subscribe(
				async (data: any) => {
					this.f.vinNumber.setValue(barcode);
					await to(this.updateVINView(data, barcode));
					// try {
					// } catch(e) {
					// 	RollbarService.error(e);
					// 	logger.error(e);
					// }
				},
				error => {
					RollbarService.warn(error);
					this.isGettingVINFromServer = false;
					this.lastVinNumber = "";
				},
				() => {
					// logger.debug(e.FINISHED);
					this.isGettingVINFromServer = false;
				}
			);

		// }, 300);
	}

	isManual(v: string) {
		return v.includes(vinAPIConstants.manual)
			|| v.includes(vinAPIConstants.standard)
			|| v.includes(vinAPIConstants.stick);
	}

	updateVINView(results: VINAPIResponse, barcode: string) {
		if (results && results.Count != 0 && results.Results && results.Results.length > 0) {

			const result: VINAPIResult = results.Results[0];

			return this.setDataFromSource(result, barcode);
		}
	}

	async setDataFromSource(result: { Make: string, ModelYear: string | number, Model: string, TransmissionStyle?: string }, barcode?: string) {

		logger.info("setDataFromSource(?)", result);

		// debugger;

		if (toStringTrim(result.ModelYear).length == 4) {
			this.f.carYear.markAsTouched();
			this.f.carYear.setValue(result.ModelYear + "");
		}


		if (result.TransmissionStyle) {
			const style = toString(result.TransmissionStyle).toLowerCase();
			this.f.manual.setValue(this.isManual(style) ? 1 : 0);
		}

		let searchResult: IMakeModelResult;
		[searchResult] = await to<IMakeModelResult>(this.vvsApp.searchService.get_MakeModelIDs_by_Names(result.Make, result.Model));

		// try {
		// } catch(e) {
		// 	RollbarService.warn(e);
		// }

		// if (this.vvsApp.user.username == "estrel") {
		// 	this.vvsApp.presentSingleAlert(JSON.stringify({result, barcode}, null, 3));
		// }

		if (!searchResult) {
			logger.warn("No results");
			return;
		}


		const { make, model } = searchResult || {} as any;

		// debugger;

		if (!make || !make.makeID) {
			this.makeItem.getNativeElement().click();
		} else {
			this.f.makeName.markAsTouched();
			this.f.makeName.setValue(make.makeName);
			this.f.makeID.setValue(make.makeID);

			if (!model || !model.modelID) {
				this.modelItem.getNativeElement().click();
			} else {
				this.f.modelName.markAsTouched();
				this.f.modelName.setValue(model.modelName);
				this.f.modelID.setValue(model.modelID);
			}
		}

	}

	get f(): ICarStepControl<FormControl> {
		return this.myForm.controls as any;
	}

	getValidClass(key: string) {
		const control = this.f[key];

		if (control) {
			if (control.valid && control.touched) {
				return "vvs-valid";
			} else {
				return "vvs-noop";
			}
		}

		return "vvs-invalid";
	}

	onCarYearSelected(ev: any) {
		if (ev && isEmpty(toString(this.f.colorID.value))) {
			this.presentColorPopover();
		}
	}

	// tslint:disable: jsdoc-format
	// tslint:disable: max-line-length

	/**
	 *
	 *
	FROM: https://rapidapi.com/apibroker/api/license-plate-search/pricing


	unirest.get("https://apibroker-license-plate-search-v1.p.rapidapi.com/api?state=NC&plate=PAY9133")
	.header("X-RapidAPI-Host", "apibroker-license-plate-search-v1.p.rapidapi.com")
	.header("X-RapidAPI-Key", "4cd3e2854fmsh8631d8733bf8847p1a0801jsn8fb0ce105b30")
	.end(function (result) {
		console.log(result.status, result.headers, result.body);
	});

	Response Code: 200
	Response Headers
	"cache-control": "private, must-revalidate"
	"content-type": "text/plain; charset=UTF-8"
	"date": "Wed, 24 Apr 2019 03:54:50 GMT"
	"expires": "-1"
	"pragma": "no-cache"
	"server": "RapidAPI-1.0.15"
	"set-cookie": "XSRF-TOKEN=eyJpdiI6IlBRVXZreDRYT3ZLQXFVbzEwMkFEWUE9PSIsInZhbHVlIjoiR2Q5N0VCS1VsWExjV2VhY2ZORFZvZEVYdytmZ3hxcDVROFoySjZ6MmJIaXRRMDBcL3RvcU9iemtlRGR2QXFYeDZLN0h4TENYenRCSFBmNDE4ZDBNS093PT0iLCJtYWMiOiIyZjRlYTQ4NWRmM2UwMDZhZmI4ZjgxNGM4NjI1MDYyMTY5ZGJmZmVhMzUwNDYxOTcyNjNlOGFmNjMxMmM0YmFlIn0%3D; expires=Wed, 24-Apr-2019 05:54:50 GMT; Max-Age=7200; path=/find_by_plate_api_v1_session=eyJpdiI6IlRpd1dFZUppalBZVkZ3RHF5UEs5d0E9PSIsInZhbHVlIjoiQlBPRnhTMGhxVVN3ampRZDE4XC9DeHZvK3ppQit1RFVuUCtUNmNrVVppdHRyNTcxZzEybDBndHJLcFd1REtoRyt4RVF1TmtWTHJlVU1JN0c2S1FDQzRRPT0iLCJtYWMiOiIzMzRmMmI3MThmOWE3MTRjZmM0YjM0NzQ4ODlmNDVhMDlkZjUyYmYwNGNlNzU4NGQ0YzlmOGQ1MzhhN2ExNjk2In0%3D; expires=Wed, 24-Apr-2019 05:54:50 GMT; Max-Age=7200; path=/; httponly"
	"vary": "Accept-Encoding,User-Agent"
	"x-rapidapi-region": "AWS - us-east-1"
	"x-rapidapi-version": "1.0.15"
	"x-ratelimit-requests-limit": "5"
	"x-ratelimit-requests-remaining": "3"
	"content-length": "294"
	"connection": "Close"
	{\charges\:0.0200000000000000004163336342344337026588618755340576171875,\plate\:\PAY9133\,\state\:\NC\,\country\:\US\,\reports\:[{\make\:\Chevrolet\,\model\:\Cavalier\,\year\:2002,\body_class\:\Coupe 2D\,\manufacturer\:null,\vehicle_type\:\\,\plant_country\:\United States\,\plant_city\:null}]}
	 */
	/**
	 * Beta
	 */
	// tslint:enable: jsdoc-format
	// tslint:enable: max-line-length

	scanTag() {
		CameraService.takePicture() // .takePicture({ quality: 75, defaultDimensions: true })
			.then((data) => {

				function dataURItoBlob(dataURI) {
					const byteString = atob(dataURI.split(',')[1]);
					const ab = new ArrayBuffer(byteString.length);
					const ia = new Uint8Array(ab);
					for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
					return new Blob([ab], { type: 'image/jpeg' });
				}

				const img = dataURItoBlob(data);

				const formdata: FormData = new FormData();
				formdata.append("image", img, "image.jpeg");

				const headers = new HttpHeaders();
				headers.append("content-type", "multipart/form-data");


				let url = ENV.OPEN_ALPR_URL + "/v2/recognize";
				url += "?recognize_vehicle=1&country=us&topn=1&secret_key=sk_bdef18c7ad19000dfce6ace8";
				// const params = {
				// 	recognize_vehicle: "1",
				// 	country: "us",
				// 	topn: "1",
				// 	secret_key: "sk_bdef18c7ad19000dfce6ace8"
				// }
				// url += _map(parameters, (val,key) => `${key}=${value}`).join;

				this.vvsApp.http.post(url, formdata, { headers })
					.pipe(
						httpRetry({
							takeCount: 3,
							interval: 1000,
							intervalRate: 1.3
						}),
					)
					.subscribe(
						(_data: IOpenALPR) => {

							// const confidence = get(_data, `results["0"].candidates["0"].confidence`);
							// _data.results;

							const { vehicle, confidence, plate } = (get(_data, `results["0"]`) || {}) as IOpenALPRResult;

							// this.vvsApp.presentSingleAlert("Results count: " + JSON.stringify(get(_data, "results") || [], null, 3));
							// this.vvsApp.presentSingleAlert("Confidence level: " + confidence);

							this.parseVehicle(vehicle, plate);

						},
						(error: any) => {
							this.vvsApp.presentSingleAlert("Please retry");
							// alert("ERRO url: " + url);
							// alert("ERROR: " + JSON.stringify(error, null, 3));
							RollbarService.error(error);
							// debugger;
						}
					);

				// this.openALPR.scan(imageData, scanOptions)
				//     .then((result: [OpenALPRResult]) => alert(JSON.stringify(result, null, 3)))
				//     .catch((error: Error) => console.error(error));
			})
			.catch(logger.error);
	}

	async parseVehicle(vehicle: IOpenALPRVehicle, plate: string) {
		vehicle = vehicle || {} as IOpenALPRVehicle;

		const colorName = get(vehicle, "color[0].name");
		const makeName = get(vehicle, "make[0].name");
		const modelName = get(vehicle, "make_model[0].name");

		// tslint:disable-next-line: radix
		const ModelYear = mean(toString(vehicle.year).split("-").map(x => parseInt(x)).filter(x => !isNaN(x)));

		const colors = await this.vvsApp.lss.getColorData();

		const found_color: IColor = find(
			colors,
			_color =>
				equalsIgnoreCase(_color.colorName, colorName) || includes(lowerCase(_color.colorName), lowerCase(colorName))
		);

		if (found_color) {
			this.f.colorName.markAsTouched();
			this.f.colorID.setValue(found_color.colorID);
			this.f.colorName.setValue(found_color.colorName);
		}

		// const tmp = await this.vvsApp.searchService.get_MakeModelIDs_by_Names(makeName, modelName.replace(makeName, "").replace("_", ""));

		this.f.licensePlate.setValue(plate);

		this.setDataFromSource({
			Make: makeName,
			Model: modelName ? modelName.replace(makeName, "").replace("_", "") : "",
			ModelYear
		})
			.catch(logger.error);

	}

	setTransmissionStyle($event, value) {
		$event && $event.preventDefault();
		this.f.manual.setValue(value);
	}


	// setFueltype($event, value) {
	// 	$event && $event.preventDefault();
	// 	this.f.fueltype.setValue(value);	
	// }

	setElectric($event, value) {
		$event && $event.preventDefault();
		this.f.electric.setValue(value);
	}

}
