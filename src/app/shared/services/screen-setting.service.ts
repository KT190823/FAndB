import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private componentSource = new BehaviorSubject<any | null>(null);
  private currentComponent = this.componentSource.asObservable();

  constructor() {}

  updateSettingComponent(message: any) {
    this.componentSource.next(message);
  }
  clearSettingComponent() {
    this.componentSource.next(null);
  }
  getSettingComponent() {
    return this.currentComponent;
  }
}
