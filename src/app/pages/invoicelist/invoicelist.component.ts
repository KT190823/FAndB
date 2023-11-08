import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order/order.service';
import { Order } from '../../shared/services/order/order';
import { DetailComponent } from '../../components/detail/detail.component';
import { LayoutService } from '../../shared/services/layout.service';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import * as moment from 'moment';
import { TableService } from 'src/app/shared/services/table/table.service';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss'],
})
export class InvoicelistComponent implements OnInit, OnDestroy {
  orders: any;
  table: any = null;
  form: FormGroup | any = null;
  dataSource: any;
  sub: any[] = [];
  startDay = moment().startOf('day').fromNow();
  displayedColumns: string[] = [
    'status',
    'id',
    'tableItemName',
    'createdAt',
    'employeeName',
    'subTotal',
    'paymentMethod',
  ];
  columnsToDisplayWithDetails = [...this.displayedColumns, 'details'];

  range = new FormGroup({
    start: new FormControl(moment(moment.now() - 604800016).toISOString()),
    end: new FormControl(new Date().toISOString()),
  });

  constructor(
    private orderService: OrderService,
    private layoutService: LayoutService,
    private orderManager: OrderManagerService
  ) {}

  ngOnInit(): void {
    this.layoutService.clearRightColumnComponent();
    this.sub.push(
      this.orderManager.getData().subscribe(() => this.filterData())
    );
  }
  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  bill(id: any) {
    this.layoutService.updateRightColumnComponent(DetailComponent);
    this.orderManager.sendData(id);
    this.orderManager.sendMode('trigger');
  }

  total() {
    let sum = 0;
    for (var i = 0; i < this.orders?.length; i++) {
      sum += this.orders[i].subTotal;
    }
    return sum;
  }

  getOrders() {
    this.orderService.getAll().subscribe((data) => {
      this.orders = data.result.items.filter(
        (x) => x?.status >= 10 && x?.status <= 30
      );
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }

  filterData() {
    let description: any = this.range.get('end') as FormControl;
    description.valueChanges.pipe().subscribe((newDescription: string) => {
      description.setValue(newDescription, { emitEvent: false });
      this.orderService.getAllItem().subscribe((data) => {
        this.orders = data.result.items.filter(
          (x) =>
            Date.parse(x?.createdAt) >
              Date.parse(this.range?.get('start')?.value!) &&
            Date.parse(x?.createdAt) <
              Date.parse(this.range?.get('end')?.value!) + 86399999 &&
            x?.status >= 10 &&
            x?.status <= 30
        );
        this.dataSource = new MatTableDataSource(this.orders);
      });
    });
    this.orderService.getAllItem().subscribe((data) => {
      this.orders = data.result.items.filter(
        (x) =>
          Date.parse(x?.createdAt) >
            Date.parse(this.range?.get('start')?.value!) &&
          Date.parse(x?.createdAt) <
            Date.parse(this.range?.get('end')?.value!) &&
          x?.status >= 10 &&
          x?.status <= 30
      );
      this.dataSource = new MatTableDataSource(this.orders);
    });
  }
  legth() {
    return this.orders?.length;
  }
  total1() {
    let sum = 0;
    for (var i = 0; i < this.orders?.length; i++) {
      if (this.orders[i]?.status == 30) {
        sum += this.orders[i].subTotal;
      }
    }
    return sum;
  }
  total2() {
    let sum = 0;
    for (var i = 0; i < this.orders?.length; i++) {
      if (this.orders[i]?.status == 10) {
        sum += this.orders[i].subTotal;
      }
    }
    return sum;
  }
  khuvuc(id: any) {}
  ban(id: any) {}
  tienmat(payment: number) {
    let sum = 0;
    this.orders?.forEach((order) => {
      if (order.paymentMethod == payment) {
        sum += 1;
      }
    });
    return sum;
  }
  totalPayment(payment: number) {
    let sum = 0;
    this.orders?.forEach((order) => {
      if (order.paymentMethod == payment) {
        sum += order.subTotal;
      }
    });
    return sum;
  }
}
