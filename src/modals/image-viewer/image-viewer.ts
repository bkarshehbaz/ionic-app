import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ViewController, IonicPage, Slide, Slides } from 'ionic-angular';
import { VVSApp } from "../../providers/vvs-controller/vvs-controller";
import * as cf from  "../../constants/constant-fields";
import { IImageViewer } from '../../lib/vvs-bridge';
import { ILogger, Logger } from '../../providers/vvs-controller/util/logger';

let logger: ILogger;

@IonicPage({
	name: "image-viewer"
})
@Component({
    selector: "image-viewer",
    templateUrl: "./image-viewer.html"
})
export class ImageViewer {

    // @ViewChild('slider', { read: ElementRef }) slider: Slide;
    @ViewChild(Slides) slides: Slides;

    set config(val: IImageViewer) {
        this._config = val || this._config;
    }
    get config() {
        return this._config;
    }

    constructor(public vvsApp: VVSApp,
                private viewCtrl: ViewController,
                private navParams: NavParams) {

		logger = Logger.get(ImageViewer.name);
		this.config = this.navParams.get(cf.config) || this.config;

    }

    dismiss() {
        this.viewCtrl.dismiss().then(logger.l).catch(logger.e);
    }

    ngAfterViewInit() {
        // this.slides.initialSlide = this.config.initialSlideIndex || 0;
        this.slides.zoom = true;
        this.slides.freeMode = true;
        this.slides.lockSwipes(true);
    }

    private _config: IImageViewer;
    
    // zoom(zoomIn: boolean) {
    //     const zoom = this.slider.nativeElement.zoom;
    //     if (zoomIn) {
    //         zoom.in();
    //     } else {
    //         zoom.out();
    //     }
    // }

}
