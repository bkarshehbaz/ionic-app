import { Component, Input } from '@angular/core';
import { IFullTicket } from '../../util/process-full-ticket';

@Component({
    selector: "modal-details",
    templateUrl: "./modal-details.html"
})
export class ModalDetails {

    @Input() ticket: IFullTicket;
    @Input() config: any;
}
