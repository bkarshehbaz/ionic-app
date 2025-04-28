import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
// import { RecentActivityExpanded } from './recent-activity-expanded/recent-activity-expanded';
import { PullRequestModal } from './pull-request';
import { CardNotesPhotosViewModule } from '../../components/card-notes-photos-map-view/cards-notes-photos-map-view.module';

@NgModule({
    declarations: [
		PullRequestModal,
	],
    imports: [
		IonicPageModule.forChild(PullRequestModal),
		SharedModule,
		CardNotesPhotosViewModule
    ],
    entryComponents: [
		PullRequestModal
	]
})
export class PullRequestModule { }
