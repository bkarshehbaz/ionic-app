import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';


import { SharedModule } from '../../app/shared/shared.module';
import { LoginPage } from './login-page';

@NgModule({
    declarations: [
		LoginPage,
	],
    imports: [
		IonicPageModule.forChild(LoginPage),
		SharedModule
    ],
    entryComponents: [
		LoginPage,
	]
})
export class LoginPageModule { }
