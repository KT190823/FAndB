import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss'],
})
export class PrintInvoiceComponent implements OnInit {
  form: any;
  orderDetails: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add '' to the class.
  }

  totalItem(i: number) {
    let total =
      (this.orderDetails?.controls[i]?.get('qty')?.value *
        this.orderDetails?.controls[i]?.get('price')?.value *
        (100 - this.orderDetails.controls[i]?.get('discount')?.value)) /
      100;
    return total;
  }
  totalSub() {
    let total = 0;
    for (let i = 0; i < this.orderDetails.controls.length; i++) {
      total += this.totalItem(i);
    }
    return total;
  }

  totalAll() {
    return Math.round(
      this.totalSub() * (1 + this.form?.get('tax').value / 100)
    );
  }
}
