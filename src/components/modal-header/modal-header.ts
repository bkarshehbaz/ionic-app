import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFullTicket } from '../../util/process-full-ticket';

@Component({
    selector: "modal-header",
    templateUrl: "./modal-header.html"
})
export class ModalsHeader {

    @Input() editDisabled: string;
    @Input() ticket: IFullTicket;
    @Output() editTicket: EventEmitter<object> = new EventEmitter();

    editTicketHelper() {
        this.editTicket.emit();
    }

}
