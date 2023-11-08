import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlChipComponent } from './form-control-chip.component';

describe('FormControlChipComponent', () => {
  let component: FormControlChipComponent;
  let fixture: ComponentFixture<FormControlChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlChipComponent]
    });
    fixture = TestBed.createComponent(FormControlChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
