export interface CarValidationInterface {
	vinNumber: string;
	manual: string;
	make: string;
	model: string;
	carYear: string;
	color: string;
}
export interface VINAPIResponse {
	Count: number;
	Results: VINAPIResult[];
}

export interface VINAPIResult {
	TransmissionStyle: string;
	Make: string;
	Model: string;
	ModelYear: string;
}

export let vinAPIConstants = {
	Count: "Count",
	Make: "Make",
	ModelYear: "ModelYear",
	Model: "Model",
	TransmissionStyle: "TransmissionStyle",
	manual: "manual",
	standard: "standard",
	stick: "stick"
};

export interface CarValidatorInterface {
	color: () => boolean;
	make: (fromScanner?: boolean) => boolean;
	model: (fromScanner?: boolean) => boolean;
	manual: (fromScanner?: boolean) => boolean;
	vin: (fromScanner?: boolean) => boolean;
	year: (cY?: any, openColor?: boolean) => boolean;
}

export const vinNumberPos: CarStepPosition = 1;
export const manualPos: CarStepPosition = 2;
export const makePos: CarStepPosition = 3;
export const modelPos: CarStepPosition = 4;
export const carYearPos: CarStepPosition = 5;
export const colorPos: CarStepPosition = 6;

export type CarStepPosition = 1 | 2 | 3 | 4 | 5 | 6;

export interface IOpenALPR {
	uuid: string; // "",
	data_type: string; // "alpr_results",
	epoch_time: number; // 1555988667396;
	processing_time: {
		total: number; // 1074.3150000052992,
		plates: number; // 494.5282897949219;
		vehicles: number; // 533.155999990413;
	};
	img_height: number; // 1936;
	img_width: number; // 2592;
	results: IOpenALPRResult[];
	credits_monthly_used: number; // 2;
	version: number; // 2;
	credits_monthly_total: number; // 2000;
	error: false;
	regions_of_interest: [
		{
			y: number; // 0;
			x: number; // 0;
			height: number; // 1936;
			width: number; // 2592;
		}
	];
	credit_cost: number; // 2;
}

export interface IOpenALPRVehicle {
	orientation: [
		{
			confidence: number; // 55.511016845703125;
			name: string; // "135"
		}
	];
	color: [
		{
			confidence: number, // 94.7281723022461;
			name: string; // "silver-gray"
		}
	];
	make: [
		{
			confidence: number; // 81.1092300415039;
			name: string; // "ds-automobiles"
		}
	];
	body_type: [
		{
			confidence: number, // 99.96471405029297;
			name: string; // "sedan-compact"
		}
	];
	year: [
		{
			confidence: number; // 78.58572387695312;
			name: string; // "2010-2014"
		}
	];
	make_model: [
		{
			confidence: number, // 91.69254302978516;
			name: string; // "citroen_ds3"
		}
	];
}

export interface IOpenALPRResult {
	plate: string; // "87RSR",
	confidence: number; // 94.8199234008789;
	region_confidence: number; // 47;
	vehicle_region: {
		y: number; // 28;
		x: number; // 335;
		height: number; // 1627;
		width: number; // 1627;
	};
	region: string; // "nj",
	plate_index: number; // 0;
	processing_time_ms: number; // 106.83382415771484;
	candidates: [
		{
			matches_template: number; // 0;
			plate: string; // "87RSR",
			confidence: number, // 94.8199234008789;
		}
	];
	coordinates: [
		{
			y: number; // 1042;
			x: number, // 935;
		},
		{
			y: number; // 1022;
			x: number; // 1354;
		},
		{
			y: number; // 1184;
			x: number; // 1363;
		},
		{
			y: number; // 1204;
			x: number, // 944;
		}
	];
	vehicle: IOpenALPRVehicle;
	matches_template: number; // 0;
	requested_topn: number; // 1;
}
