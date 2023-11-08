import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMenuComponent } from './setting-menu.component';

describe('SettingMenuComponent', () => {
  let component: SettingMenuComponent;
  let fixture: ComponentFixture<SettingMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingMenuComponent]
    });
    fixture = TestBed.createComponent(SettingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
