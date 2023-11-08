import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends BaseService {
  protected url: string = 'api/services/app/File';

  createUrlImage(request: any): Observable<any> {
    return this.http.post(`${this.url}/Upload`, request);
  }
}
