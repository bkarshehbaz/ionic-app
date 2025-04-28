import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MaskDirective } from './mask.directive';

@Component({
	template: `
		<input [(ngModel)]="input" mask="(999) 999-9999" [ngModelOptions]="{standalone: true}" type="text">
	` 
})
class TestMaskComponent {

	input: string = "";

}

describe('Mask', () => {

	let component: TestMaskComponent;
	let fixture: ComponentFixture<TestMaskComponent>;
	let dE: DebugElement;
	let inputElement: HTMLInputElement;
  
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [TestMaskComponent, MaskDirective] 
		});
		fixture = TestBed.createComponent(TestMaskComponent); 
		component = fixture.componentInstance;
		dE = fixture.debugElement;
		inputElement = dE.query(By.css('input')).nativeElement;
	});

	it('typing a phone number', () => {
		inputElement.value = "7047135806";
		dE.triggerEventHandler('input', { target: inputElement });
		dE.triggerEventHandler('keyup', { target: inputElement });
		inputElement.dispatchEvent(new Event('input'));
		inputElement.dispatchEvent(new Event('keyup'));
		fixture.detectChanges();
		// tslint:disable-next-line:no-console

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(inputElement.value).toBe("(704) 713-5806");
			expect(component.input).toBe("(704) 713-5806");
		
		});

	});
	
});
