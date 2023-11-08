import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KitchenOrderManager {
  //#region id Item
  private itemSource = new BehaviorSubject<any | null>(null);
  private itemGet = this.itemSource.asObservable();

  sendItem(request: any) {
    this.itemSource.next(request);
  }

  getItem() {
    return this.itemGet;
  }
  //#endregion

  //#region delete Item
  private itemDeleteSource = new BehaviorSubject<any | null>(null);
  private itemDeleteGet = this.itemDeleteSource.asObservable();

  sendItemDelete(request: any) {
    this.itemDeleteSource.next(request);
  }

  getItemDelete() {
    return this.itemDeleteGet;
  }
  //#endregion
}
