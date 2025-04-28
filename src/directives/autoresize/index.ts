import {
	Directive,
	HostListener,
	ElementRef,
	Input,
	OnInit
} from '@angular/core';
import { Logger } from '../../providers/vvs-controller/util/logger';

const logger = Logger.get('AutoResizeTextareaDirective');
@Directive({
    selector: '[autoResizeTextarea]'
})
export class AutoResizeTextareaDirective implements OnInit {



    // @Input('autoResizeTextarea') maxHeight: number = 320;
	maxHeight: number = 320;

	_autoResizeTextarea: any;
	@Input("autoResizeTextarea")
	set autoResizeTextarea(val: any) {
		if (val && val.input && val.input.subscribe) {
			val.input.subscribe(
				() => {
					this.adjust(36);
				}
			);
		}
		this._autoResizeTextarea = val;
	}
	get autoResizeTextarea() {
		return this._autoResizeTextarea;
	}

    constructor(public element: ElementRef) {}

	@HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
	}

    ngOnInit(): void {
        setTimeout(() => {
            this.adjust();
        }, 500);
    }

    adjust(height?: number): void {
		logger.info("adjust", height, this.autoResizeTextarea);

        const ta = this.element.nativeElement.querySelector("textarea");
        if (ta) {
            ta.style.overflow = "hidden";
            ta.style.height = null;
            ta.style.height = (height || Math.min(ta.scrollHeight, this.maxHeight)) + "px";
        } else {
            this.element.nativeElement.style.overflow = "hidden";
            this.element.nativeElement.height = null;
            this.element.nativeElement.style.height = (height || Math.min(this.element.nativeElement.scrollHeight, this.maxHeight)) + "px";
		}

		this.autoResizeTextarea && this.autoResizeTextarea.output && this.autoResizeTextarea.output();
    }
}
