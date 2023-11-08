import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-debtor-order',
  templateUrl: './debtor-order.component.html',
  styleUrls: ['./debtor-order.component.scss'],
})
export class DebtorOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<DebtorOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(data: string) {
    if (!data) {
      alert('Vui lòng nhập tên người nợ');
    }
  }
}

export interface DialogData {
  orderid: number | any;
  debtorname: string;
}
