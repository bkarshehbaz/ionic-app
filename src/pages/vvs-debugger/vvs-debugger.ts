import { Component, Input } from '@angular/core';
import { ENV } from '../../environments/index';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';

// export interface IEnv {
// 	envName: string;
// 	envUrl: string;
// 	checked?: boolean;
// }

@IonicPage({
	name: "vvs-debugger"
})
@Component({
    selector: 'vvs-debugger',
	templateUrl: './vvs-debugger.html'
})
export class VVSDebuggerComponent {

	@Input() isPage = true;

	properties: string;
	loginUser: string;
	platform: string;
	device: string;

	data: string;

	constructor(
		public vvsApp: VVSApp,
		private navCtrl: NavController,
		private navParams: NavParams,
		public viewController: ViewController
	) {
		const data = this.navParams.get("data");
		// logger.info("data", this.navParams);
		if (data) {
			(data as any).ENV = ENV;
			this.data = JSON.stringify(data, null, 3);
		}
	}

	// tslint:disable-next-line:use-life-cycle-interface
	ngOnInit() {

		if (ENV.ENABLE_DEBUG_MODE) {
			this.properties = JSON.stringify(ENV, null, 3);
			this.loginUser = JSON.stringify(this.vvsApp.lss.getRawValue("LoginUser"), null, 3);
			this.platform = JSON.stringify({
				isPortrait: this.vvsApp.platform.isPortrait(),
				height: this.vvsApp.platform.height(),
				width: this.vvsApp.platform.width(),
				platforms: this.vvsApp.platform.platforms(),
				versions: (this.vvsApp.platform as any)._versions,
				_nPlt: (this.vvsApp.platform as any)._nPlt,
				_dir: (this.vvsApp.platform as any)._dir
			}, null, 3);

			const {
				cordova,
				model,
				platform,
				uuid,
				version,
				manufacturer,
				isVirtual,
				serial
			} = this.vvsApp.device;

			this.device = JSON.stringify({
				cordova,
				model,
				platform,
				uuid,
				version,
				manufacturer,
				isVirtual,
				serial
			}, null, 3);

			// this.platform ;
			// this.vvsApp.platform
			// console.table(ENV);
			//load script
			const script = document.createElement("script");

			script.onload = () => {
				(window as any).hljs.initHighlighting.called = false;
				(window as any).hljs.initHighlighting();
			};
			script.onerror = function() {
				// tslint:disable-next-line: no-console
				console.error(arguments);
			};

			script.type = "text/javascript";
			script.async = true;
			// tslint:disable-next-line: deprecation
			script.charset = 'utf-8';
			script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js";
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	}

}
