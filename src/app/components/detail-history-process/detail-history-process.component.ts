import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { OrderManagerService } from 'src/app/shared/services/order/order-manager.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { TableService } from 'src/app/shared/services/table/table.service';
import { DeleteItemComponent } from '../dialog/delete-item/delete-item.component';
import { NodataComponent } from '../nodata/nodata.component';
import { KitchenOrderService } from '../../shared/services/kitchen/kitchen-order.service';
import { KitchenOrderManager } from '../../shared/services/kitchen/kitchen-order-manager.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-detail-history-process',
  templateUrl: './detail-history-process.component.html',
  styleUrls: ['./detail-history-process.component.scss'],
})
export class DetailHistoryProcessComponent implements OnInit, OnDestroy {
  sub: any[] = [];
  kitchenOrder: any;
  constructor(
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private router: Router,
    private kitchenOrderService: KitchenOrderService,
    private kitchenOrderManager: KitchenOrderManager,
    private pagesService: PagesService
  ) {}

  ngOnInit(): void {
    this.sub.push(
      this.kitchenOrderManager.getItem().subscribe((orderId: any) => {
        this.kitchenOrderService.getById(orderId).subscribe((item: any) => {
          this.kitchenOrder = item.result;
        });
      })
    );
  }
  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  deleteinv() {
    alert('Đã xoá thành công');
    this.layoutService.updateRightColumnComponent(NodataComponent);
    this.kitchenOrderService.deleteItem(this.kitchenOrder.id).subscribe((item) => {
      this.kitchenOrderManager.sendItemDelete(true);
    })
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
