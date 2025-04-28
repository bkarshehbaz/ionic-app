import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { IonicImageLoader } from "ionic-image-loader";
import { IonicImageLoader } from "../../lib/ionic-image-loader/src/image-loader.module";
import { IonicModule } from "ionic-angular";
import { AppComponents } from "../../components/index";
import { AppPipes } from "../../pipes/index";
import { debugUs } from "../../debug";
import { AutoResizeTextareaDirective } from "../../directives/autoresize";

const declarations = [
	...AppComponents,
	...AppPipes,
	AutoResizeTextareaDirective
];

debugUs(...declarations);

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		IonicImageLoader,
		// IonicImageCacheModule
	],
	declarations,
	exports: [
		...AppComponents,
		...AppPipes,
		IonicImageLoader,
		AutoResizeTextareaDirective
		// IonicImageCacheModule
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class SharedModule {}
