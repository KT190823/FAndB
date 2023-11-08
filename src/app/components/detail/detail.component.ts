import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { OrderDetailService } from '../../shared/services/order/order-detail.service';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';
import { OrderService } from '../../shared/services/order/order.service';
import { TableService } from '../../shared/services/table/table.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { NodataComponent } from '../nodata/nodata.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../dialog/delete-item/delete-item.component';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  order: any = null;
  table: any = null;
  sub: any[] = [];
  constructor(
    private orderService: OrderService,
    private orderManagerService: OrderManagerService,
    private tableSerivce: TableService,
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private router: Router,
    private pagesService: PagesService
  ) {}

  ngOnInit(): void {
    this.sub.push(
      this.orderManagerService.getData().subscribe((id) => {
        this.orderService.getOrderById(id).subscribe((data) => {
          this.order = data.result;
          this.tableSerivce
            .getById(this.order.tableItemId)
            .subscribe((datetable) => {
              this.table = datetable.result;
            });
        });
      })
    );
  }
  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  deleteinv() {
    this.order.status = 100;
    this.orderService.updateOrder(this.order).subscribe();
    alert('Đã xoá thành công');
    this.layoutService.updateRightColumnComponent(NodataComponent);
    this.orderManagerService.sendData(11);
  }
  getHistoryProcess(orderId: number) {
    this.router.navigate([`pages/history-process/${orderId}`]);
  }

  openDeleteItem(comfirm: boolean): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: { delete: comfirm },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteinv();
      }
    });
  }
  close() {
    this.pagesService.sendData('');
  }
}
