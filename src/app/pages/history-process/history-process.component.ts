import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { KitchenOrderService } from 'src/app/shared/services/kitchen/kitchen-order.service';

@Component({
  selector: 'app-history-process',
  templateUrl: './history-process.component.html',
  styleUrls: ['./history-process.component.scss'],
})
export class HistoryProcessComponent implements OnInit {
  dataSource: any;
  orderId: number;
  displayedColumns: string[] = [
    'version',
    'name',
    'description',
    'qty',
    'createdAt',
  ];
  constructor(
    private kitchenOrderService: KitchenOrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.kitchenOrderService
      .getByOrderId(this.orderId)
      .subscribe((listProcess) => {
        this.dataSource = new MatTableDataSource(listProcess?.result);
        console.log(listProcess?.result);
      });
  }
}
