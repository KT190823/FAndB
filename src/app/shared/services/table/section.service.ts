import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends BaseService {
  protected url: string = 'api/services/app/TableSection';
  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
  }
  getById(id: number): Observable<any> {
    return this.get(`${this.url}/Get?Id=${id}`, id);
  }
  createSection(request: any): Observable<any> {
    return this.post(`${this.url}/Create`, request);
  }
  updateSection(request: any): Observable<any> {
    return this.put(`${this.url}/Update`, request);
  }
  deleteSection(id: number): Observable<any> {
    return this.delete(`${this.url}/Delete?Id=${id}`, id);
  }

  getAllWithoutItem(request: number[]): Observable<any> {
    let urlItems:string = '';
    for(let i = 0; i < request.length; i++) {
      urlItems += 'listInputSection=' + request[i].toString();
      if(i != request.length - 1){
        urlItems+='&';
      }
    }
    return this.get(`${this.url}/GetListWithoutItem?${urlItems}`);
  }
}
