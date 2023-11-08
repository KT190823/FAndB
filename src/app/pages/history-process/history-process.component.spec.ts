import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProcessComponent } from './history-process.component';

describe('HistoryProcessComponent', () => {
  let component: HistoryProcessComponent;
  let fixture: ComponentFixture<HistoryProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryProcessComponent]
    });
    fixture = TestBed.createComponent(HistoryProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
