import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { DetailHistoryProcessComponent } from '../../../components/detail-history-process/detail-history-process.component';
import { KitchenOrderService } from '../../../shared/services/kitchen/kitchen-order.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { KitchenOrderManager } from '../../../shared/services/kitchen/kitchen-order-manager.service';

@Component({
  selector: 'app-list-history-process',
  templateUrl: './list-history-process.component.html',
  styleUrls: ['./list-history-process.component.scss'],
})
export class ListHistoryProcessComponent {
  orders: any;
  form: FormGroup | any = null;
  dataSource: any;
  sub: any[] = [];
  startDay = moment().startOf('day').fromNow();
  displayedColumns: string[] = ['id', 'orderId', 'version', 'createdAt'];
  columnsToDisplayWithDetails = [...this.displayedColumns, 'details'];

  range = new FormGroup({
    start: new FormControl(moment(moment.now() - 604800016).toISOString()),
    end: new FormControl(new Date().toISOString()),
  });

  constructor(
    private layoutService: LayoutService,
    private kitchenOrderService: KitchenOrderService,
    private kitchenOrderManager: KitchenOrderManager
  ) {}

  ngOnInit(): void {
    this.layoutService.clearRightColumnComponent();
    this.getOrders();
    this.sub.push(
      this.kitchenOrderManager.getItemDelete().subscribe((item: any) => {
        if (item) {
          this.getOrders();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  getOrders() {
    this.kitchenOrderService.getAll().subscribe((items) => {
      this.orders = items.result;
      this.dataSource = new MatTableDataSource(this.orders.items);
    });
  }

  detailHistory(orderId: number) {
    this.kitchenOrderManager.sendItem(orderId);
    this.layoutService.updateRightColumnComponent(
      DetailHistoryProcessComponent
    );
  }
}
