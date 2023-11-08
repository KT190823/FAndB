import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService extends BaseService {
  protected url: string = 'api/services/app/TableItem';
  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
  }
  getById(id: number): Observable<any> {
    return this.get(`${this.url}/Get?Id=${id}`, id);
  }
  getAllStatus(): Observable<any> {
    return this.get(`${this.url}/GetAllTableStatus`);
  }
  getStatusById(id: number): Observable<any> {
    return this.get(`${this.url}/GetTableStatusById?Id=${id}`, id);
  }
  createTable(request: any): Observable<any> {
    return this.post(`${this.url}/Create`, request);
  }
  updateTable(request: any): Observable<any> {
    return this.put(`${this.url}/Update`, request);
  }
  deleteTable(id: number): Observable<any> {
    return this.delete(`${this.url}/Delete?Id=${id}`, id);
  }
}
