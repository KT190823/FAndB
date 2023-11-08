import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../shared/services/order/order.service';
import { Order } from '../../shared/services/order/order';
import { OrderManagerService } from '../../shared/services/order/order-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from 'src/app/components/dialog/delete-item/delete-item.component';
import { DebtorOrderComponent } from 'src/app/components/dialog/debtor-order/debtor-order.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private orderManagerService: OrderManagerService,

    public dialog: MatDialog
  ) {}
  customPatterns = {
    '0': { pattern: new RegExp('-?') },
    '9': { pattern: new RegExp('[0-9]') },
  };
  form: FormGroup | any;
  order: Order | any;
  ngOnInit(): void {
    this.form = this.fb.group({
      total: this.fb.control(0),
      moneyReceive: this.fb.control(0),
      moneyBack: this.fb.control(0),
    });
    this.form.disable();

    this.orderService
      .getOrderById(this.route.snapshot.paramMap.get('id'))
      .subscribe((data) => {
        this.order = { ...data.result };
        this.form.get('total').setValue(data.result.subTotal);
      });
  }

  get total() {
    return this.form.get('total') as FormControl;
  }

  get moneyReceive() {
    return this.form.get('moneyReceive') as FormControl;
  }

  get moneyBack() {
    return this.form.get('moneyBack') as FormControl<number>;
  }

  pressNum(num: string) {
    let newResult = this.moneyReceive.value + '';
    if (num !== '-1') {
      if (this.moneyReceive.value != 0) {
        newResult = newResult.slice(0, newResult.length - 3) + num + '000';
      } else {
        newResult = num + '000';
      }
    } else {
      newResult = '0';
    }
    this.moneyReceive.setValue(Number(newResult));
    let mBack: number =
      Number(newResult) - this.total.value > 0
        ? Number(newResult) - this.total.value
        : Number(newResult) - this.total.value;
    this.moneyBack.setValue(mBack);
  }

  onSubmit(money: number) {
    if (this.moneyBack.value < 0) {
      alert('Vui lòng nhập số tiền');
    } else if (this.moneyReceive.value < this.total.value) {
      alert('Số tiền không hợp lệ');
    } else {
      this.order.status = 30;
      this.order.paymentMethod = money;
      this.orderService.updateOrder(this.order).subscribe((data) => {
        this.orderManagerService.sendTable('');
      });
      this.router.navigate([`/pages/order`]);
      alert('Đã thanh toán thành công');
    }
  }

  debtor() {
    const dialogRef = this.dialog.open(DebtorOrderComponent, {
      data: {
        orderid: this.order.id,
        debtorname: this.order.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.debtorname) {
        this.order.status = 30;
        this.order.paymentMethod = 40;
        this.order.description = result.debtorname;
        this.orderService.updateOrder(this.order).subscribe((data) => {
          this.orderManagerService.sendTable('');
        });
        this.router.navigate([`/pages/order`]);
        alert('Đã thanh toán thành công');
      }
    });
  }
}
