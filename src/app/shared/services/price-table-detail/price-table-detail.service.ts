import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceTableDetailService extends BaseService {
  protected url: string = 'api/services/app/PriceTable_Detail';

  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
  }
  getAllByPriceTableId(id: number): Observable<any> {
    return this.get(`${this.url}/GetAllByPriceTableId?Id=${id}`, id);
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
