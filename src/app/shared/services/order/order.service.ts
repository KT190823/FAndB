import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { GenericResult } from '../../models/generic-result';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  url = '/api/services/app/Order';

  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
  }

  getAllItem(): Observable<any> {
    return this.get(`${this.url}/GetAllItem?MaxResultCount=99999`);
  }

  getOrderById(id: any): Observable<any> {
    return this.get(`${this.url}/Get?Id=${id}`, id);
  }
  postOrder(request: any): Observable<GenericResult<any>> {
    return this.post<GenericResult<any>>(`${this.url}/Create`, request);
  }
  updateOrder(request: any): Observable<GenericResult<any>> {
    return this.put<GenericResult<any>>(`${this.url}/Update`, request);
  }

  deleteOrder(id: any): Observable<GenericResult<any>> {
    return this.delete(`${this.url}/Delete?Id=${id}`, null);
  }
}
