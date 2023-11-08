import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLogComponent } from './order-log.component';

describe('OrderLogComponent', () => {
  let component: OrderLogComponent;
  let fixture: ComponentFixture<OrderLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderLogComponent]
    });
    fixture = TestBed.createComponent(OrderLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
