import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { OrderLogService } from 'src/app/shared/services/order-log/order-log.service';

@Component({
  selector: 'app-order-log',
  templateUrl: './order-log.component.html',
  styleUrls: ['./order-log.component.scss'],
})
export class OrderLogComponent {
  orders: any;
  form: FormGroup | any = null;
  dataSource: any;
  sub: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  startDay = moment().startOf('day').fromNow();
  displayedColumns: string[] = [
    'dateOfLog',
    'rowId',
    'table',
    'section',
    'employee',
    'product',
    'action',
  ];
  columnsToDisplayWithDetails = [...this.displayedColumns];

  range = new FormGroup({
    start: new FormControl(moment(moment.now() - 604800016).toISOString()),
    end: new FormControl(new Date().toISOString()),
  });

  constructor(
    private layoutService: LayoutService,
    private orderLogService: OrderLogService
  ) {}

  ngOnInit(): void {
    this.layoutService.clearRightColumnComponent();
    this.onClose();
  }

  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  onClose(){
    if(this.range.get('start')?.value && this.range.get('end')?.value){
      this.orderLogService.postLogColumnName([this.range.get('start')?.value, this.range.get('end')?.value]).subscribe((items) => {
        this.orders = items.result.reverse();
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
