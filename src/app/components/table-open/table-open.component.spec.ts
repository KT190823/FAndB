import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOpenComponent } from './table-open.component';

describe('TableOpenComponent', () => {
  let component: TableOpenComponent;
  let fixture: ComponentFixture<TableOpenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableOpenComponent]
    });
    fixture = TestBed.createComponent(TableOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
