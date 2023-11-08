import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FbItemManager {
  //#region Fb Item
  private itemSource = new BehaviorSubject<any | null>(null);
  private itemGet = this.itemSource.asObservable();

  sendItem(request: any) {
    this.itemSource.next(request);
  }

  getItem() {
    return this.itemGet;
  }
  //#endregion

  //#region edit Fb Item
  private idItemSource = new BehaviorSubject<any | null>(null);
  private idItemGet = this.idItemSource.asObservable();

  sendIdItem(request: any) {
    this.idItemSource.next(request);
  }

  getIdItem() {
    return this.idItemGet;
  }
  //#endregion
}
