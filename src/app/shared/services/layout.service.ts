import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private componentSource = new BehaviorSubject<any | null>(null);
  private currentComponent = this.componentSource.asObservable();

  constructor() {}

  updateRightColumnComponent(message: any) {
    this.componentSource.next(message);
  }
  clearRightColumnComponent() {
    this.componentSource.next(null);
  }
  getRightColumnComponent() {
    return this.currentComponent;
  }
}
