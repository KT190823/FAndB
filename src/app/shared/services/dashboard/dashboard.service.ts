import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  protected url: string = 'api/services/app/Dashboard';

  getTop10OrderDetail(request: any) {
    return this.get(
      this.url + `/GetTop10OrderDetail?request=${request}`,
      request
    );
  }
  getTop5Category(request: any) {
    return this.get(this.url + `/GetTop5Category?request=${request}`, request);
  }
  postSheet1(fromDate: string, toDate: string, tenantId: number) {
    return this.post(
      this.url +
        `/Sheet1?fromDate=${fromDate}&toDate=${toDate}&tenantId=${tenantId}`,
      null
    );
  }
  postSheet2() {
    return this.post(this.url + `/Sheet2`, null);
  }
}
