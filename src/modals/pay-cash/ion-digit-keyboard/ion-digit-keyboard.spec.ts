import {IonDigitKeyboard} from './ion-digit-keyboard';
/* tslint:disable:no-unused-variable */
// tslint:disable-next-line:ordered-imports
import {Component, DebugElement} from "@angular/core";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { CONFIGURE_TESTBEST } from '../../../providers/vvs-controller/vvs-controller.util.spec';
// import { CONFIGURE_TESTBEST } from '../providers/vvs-controller/vvs-controller.util.spec';

// import {} from '@types/jasmine';

@Component({
  template: `<input type="text" hoverfocus>`
})
class TestIonDigitKeyboard {
}

describe('Directive: HoverFocus', () => {

  let component: IonDigitKeyboard;
  let fixture: ComponentFixture<IonDigitKeyboard>;
  let inputEl: DebugElement;

  beforeEach((done: DoneFn) => {

    CONFIGURE_TESTBEST([IonDigitKeyboard, TestIonDigitKeyboard])
    .then( (data) => {
        fixture = data.fixture;
        component = data.component;
        inputEl = fixture.debugElement.query(By.css('input'));

        done();
    });
  });

	//   it('hovering over input', () => {
	//     inputEl.triggerEventHandler('mouseover', null);
	//     fixture.detectChanges();
	//     expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');

	//     inputEl.triggerEventHandler('mouseout', null);
	//     fixture.detectChanges();
	//     expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
	//   });
});
