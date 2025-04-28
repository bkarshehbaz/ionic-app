import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as t from '../../constants/constant-titles';
import * as modalFooterOptions from './modal-footer.options';
import { Logger } from "../../providers/vvs-controller/util/logger";
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { IPresentConfirm } from '../../providers/vvs-controller/view/alert';
import { Throttle } from 'lodash-decorators';

// const logger = Logger.get("modal-footer");

@Component({
    selector: "modal-footer",
    templateUrl: "./modal-footer.html"
})
export class ModalFooter {

	@Input() cancelText = "Cancel";

    @Input() disableSubmit: boolean;
    @Input() presentConfirm: boolean = true;
    @Input() presentCancelConfirm: boolean = true;

    @Output() submit = new EventEmitter<boolean>();
	@Output() cancel = new EventEmitter<boolean>();


    constructor(public vvsApp: VVSApp) {

    }

	@Throttle(300)
    onSubmitClick() {
        if (this.presentConfirm == false) {
			this.submit.emit(modalFooterOptions.submit);
			return;
		}

		const options: IPresentConfirm = {
			title: t.ARE_YOU_SURE_WANT_TO_SUBMIT,
			message: "",
			submitText: t.AGREE,
			submitCB: (data) => {
				this.submit.emit(modalFooterOptions.submit);
			}
		};

		this.vvsApp.presentConfirm(options);

    }

	@Throttle(300)
    onCancelClick() {
		if (this.presentCancelConfirm == false) {
			this.cancel.emit(modalFooterOptions.cancel);
			return;
		}

		const options: IPresentConfirm = {
			title: this.cancelText + "?",
			message: "",
			cancelText: t.NO,
			submitText: t.YES,
			submitCB: (data) => {
				this.cancel.emit(modalFooterOptions.cancel);
			}
		};

		this.vvsApp.presentConfirm(options);

    }
}
