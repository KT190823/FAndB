import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KitchenOrderService extends BaseService {
  protected url: string = 'api/services/app/KitchenOrder';
  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
  }
  getByOrderId(id: number): Observable<any> {
    return this.get(`${this.url}/GetByOrderId?Id=${id}`, id);
  }
  getDefaultKitchenOrderByOrderId(id: number): Observable<any> {
    return this.get(`${this.url}/GetDefaultKitchenOrderByOrderId?Id=${id}`, id);
  }
  getById(id: number): Observable<any> {
    return this.get(`${this.url}/Get?Id=${id}`, id);
  }
  createItem(request: any): Observable<any> {
    return this.post(`${this.url}/Create`, request);
  }
  updateItem(request: any): Observable<any> {
    return this.put(`${this.url}/Update`, request);
  }
  deleteItem(id: number): Observable<any> {
    return this.delete(`${this.url}/Delete?Id=${id}`, id);
  }
}
