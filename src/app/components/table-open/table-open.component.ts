import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../shared/services/layout.service';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';
import { OrderService } from '../../shared/services/order/order.service';
import { TableService } from '../../shared/services/table/table.service';
import { InvoiceComponent } from '../invoice/invoice.component';
import { SectionService } from '../../shared/services/table/section.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-table-open',
  templateUrl: './table-open.component.html',
  styleUrls: ['./table-open.component.scss'],
})
export class TableOpenComponent implements OnInit, OnDestroy {
  tableid: any;
  table: any;
  section: any;
  sub: any;
  username: any;
  constructor(
    private layoutService: LayoutService,
    private tableSerivce: TableService,
    private orderManager: OrderManagerService,
    private orderService: OrderService,
    private sectionService: SectionService,
    private authService: AuthService,
    private pagesService: PagesService
  ) {}
  ngOnInit(): void {
    this.authService
      .getUser()
      .then((user) => (this.username = user?.profile?.name));
    this.sub = this.orderManager.getData().subscribe((data) => {
      this.tableid = data;
    });
    this.tableSerivce.getById(this.tableid).subscribe((data) => {
      this.table = data.result;
      this.sectionService
        .getById(this.table?.tableSectionId)
        .subscribe((data) => {
          this.section = data.result;
        });
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createdInvoice() {
    let newOrder = {
      id: 0,
      codeNumber: 'abc',
      description: '',
      createdAt: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
      }),
      clientId: 0,
      subTotal: 0,
      discRate: 0,
      status: 10,
      tip: 0,
      tax: 0,
      branchCode: '',
      employeeEmail: '',
      employeeName: this.username,
      isDeleted: 0,
      tableItemId: this.tableid,
      orderDetail: [],
    };
    this.orderService.postOrder(newOrder).subscribe((data) => {
      this.layoutService.updateRightColumnComponent(InvoiceComponent);
      this.orderManager.sendData(data.result.id);
      this.orderManager.sendTable(data.result.tableItemId);
    });
  }

  close() {
    this.pagesService.sendData('');
  }
}
