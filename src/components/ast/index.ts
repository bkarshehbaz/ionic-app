import { Component } from "@angular/core";

@Component({
    selector: "ast",
    template: `
        <span class="required-asterisk">*</span>
    `,
    styles: [`
        .required-asterisk {
            color: #f53d3d;
        }
    `]
})
export class AstComponent {}
