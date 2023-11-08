import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoryProcessComponent } from './list-history-process.component';

describe('ListHistoryProcessComponent', () => {
  let component: ListHistoryProcessComponent;
  let fixture: ComponentFixture<ListHistoryProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListHistoryProcessComponent]
    });
    fixture = TestBed.createComponent(ListHistoryProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
