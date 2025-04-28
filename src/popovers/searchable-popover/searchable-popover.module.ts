import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../app/shared/shared.module';
import { SearchablePopover } from './searchable-popover';

@NgModule({
	declarations: [
		SearchablePopover
	],
	imports: [
		IonicPageModule.forChild(SearchablePopover),
		SharedModule
	],
    entryComponents: [
		SearchablePopover
	],
	exports: [
		SearchablePopover
	]
})
export class SearchablePopoverModule { }
