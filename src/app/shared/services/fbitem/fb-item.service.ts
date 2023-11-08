import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FbItemService extends BaseService {
  protected url: string = 'api/services/app/FbItem';
  getAllWithSectionId(id: number): Observable<any> {
    return this.get(
      `${this.url}/GetAllWithSectionId?MaxResultCount=99999&&input=${id}`,
      id
    );
  }
  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
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
