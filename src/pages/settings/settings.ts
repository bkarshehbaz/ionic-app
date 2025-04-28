// import { Component, Renderer2, ViewChild } from '@angular/core';
// import { find, map } from 'lodash';
// import { ENV } from '../../environments/index';
// import { Logger, ILogger } from '../../providers/vvs-controller/util/logger';
// // import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
// import { IonicPage } from 'ionic-angular';

// let logger: ILogger;

// export interface IEnv {
// 	envName: string;
// 	envUrl: string;
// 	checked?: boolean;
// }

// @IonicPage({
// 	name: "settings"
// })
// @Component({
//     selector: 'settings',
//     templateUrl: './settings.html'
// })
// export class SettingsComponent {

// 	envs: [] = [];

// 	properties: string;
// 	loginUser: string;
// 	companySelected: string;

// 	constructor() {
// 		logger = Logger.get(SettingsComponent.name);
// 		this.envs = map(ENV.env, (envUrl, envName) => ({ envName, envUrl, checked: false }));
// 		this.envs.push({ envName: "None", envUrl: "None"});
// 	}

// }
