import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
// import { RecentActivityExpanded } from './recent-activity-expanded/recent-activity-expanded';
import { ImageViewer } from './image-viewer';

@NgModule({
    declarations: [
		ImageViewer,
	],
    imports: [
		IonicPageModule.forChild(ImageViewer),
		SharedModule
    ],
    entryComponents: [
		ImageViewer
	],
	exports: [
		ImageViewer
	]
})
export class ImageViewerModule { }
