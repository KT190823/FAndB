import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceComponent } from '../../components/invoice/invoice.component';
import { LayoutService } from '../../shared/services/layout.service';
import { TableService } from '../../shared/services/table/table.service';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';
import { OrderService } from '../../shared/services/order/order.service';
import { TableOpenComponent } from 'src/app/components/table-open/table-open.component';
import { SectionService } from 'src/app/shared/services/table/section.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  radius: number | undefined;
  color: string | undefined;
  isSingleClick: Boolean = true;
  isLoading: Boolean = true;
  today = Date.now();
  tables: any[] = [];
  sections: any;
  sub: any[] = [];
  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private tableSerivce: TableService,
    private orderManager: OrderManagerService,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.layoutService.clearRightColumnComponent();
    // this.layoutService.updateRightColumnComponent(NodataComponent);
    this.sub.push(
      this.orderManager.getTable().subscribe((data) => {
        this.isLoading = true;
        this.getTables();
        this.getSections();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.forEach((x) => x.unsubscribe());
  }

  getTables() {
    this.tableSerivce.getAllStatus().subscribe((data) => {
      this.tables = [];
      data.result.forEach((table) => {
        if (table?.tableSectionName) {
          this.tables.push(table);
        }
      });
    });
  }

  getSections() {
    this.sectionService.getAll().subscribe((data) => {
      this.sections = data.result;
      this.sections.items = this.sections.items.reverse();
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }
  //chuc nang
  cokhach(event: any) {
    this.isSingleClick = false;
    event.target.classList.toggle('box-table-active');
  }

  bamvao() {
    const fabElement = document.querySelector('.fab');
    const boxElement = document.querySelector('.box');
    if (fabElement !== null && boxElement !== null) {
      fabElement.classList.toggle('fab-active');
      boxElement.classList.toggle('box-active');
    }
  }
  setting() {
    this.router.navigate([`/settings`]);
  }
  list() {
    this.router.navigate([`/billlist`]);
  }

  bill(table: any) {
    if (table.order?.id) {
      let innerWidth = window.innerWidth;
      this.layoutService.updateRightColumnComponent(InvoiceComponent);
      this.orderManager.sendData(table.order.id);
      if (innerWidth) {
        this.orderManager.sendMode('trigger');
      }
    }
  }
  note() {
    this.router.navigate([`pages/find`]);
  }

  opentable(table: any) {
    let innerWidth = window.innerWidth;
    this.layoutService.updateRightColumnComponent(TableOpenComponent);
    this.orderManager.sendData(table.id);
    if (innerWidth) {
      this.orderManager.sendMode('trigger');
    }
  }

  numtable(sectionid: number) {
    let sum = 0;
    for (var i = 0; i < this.tables?.length; i++) {
      if (sectionid == this.tables[i].tableSectionId) {
        sum += 1;
      }
    }
    return sum;
  }
  numtable1(sectionid: number) {
    let sum = 0;
    for (var i = 0; i < this.tables?.length; i++) {
      if (sectionid == this.tables[i].tableSectionId) {
        if (this.tables[i].order) {
          sum += 1;
        }
      }
    }
    return sum;
  }
  // tablestatus() {
  //   let sum = 0;
  //   this.tableSerivce.getAllStatus().subscribe((data) => {
  //     for (var i = 0; i < data?.result.length; i++) {
  //       if (data?.result[i].order) {
  //         sum += 1;
  //       }
  //     }
  //     return sum;
  //   });
  // }
}
