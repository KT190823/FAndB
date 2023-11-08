import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderManagerService {
  //#region order
  private dataSource = new BehaviorSubject<any | null>(null);
  private dataGet = this.dataSource.asObservable();

  sendData(request: any) {
    this.dataSource.next(request);
  }

  getData() {
    return this.dataGet;
  }
  //#endregion

  //#region table
  private tableSource = new BehaviorSubject<any | null>(null);
  private tableGet = this.tableSource.asObservable();

  sendTable(request: any) {
    this.tableSource.next(request);
  }

  getTable() {
    return this.tableGet;
  }
  //#endregion

  //#region product
  private fbMenu = new BehaviorSubject<any | null>(null);
  private itemGet = this.fbMenu.asObservable();
  addProduct(item: any) {
    this.fbMenu.next(item);
  }
  onAddProduct() {
    return this.itemGet;
  }
  //#endregion
  //#region Mode tab
  private modeSource = new BehaviorSubject<any | null>(null);
  private modeGet = this.modeSource.asObservable();

  sendMode(request: any) {
    this.modeSource.next(request);
  }

  getMode() {
    return this.modeGet;
  }
  //#endregion
}
