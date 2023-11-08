import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogRoutingModule } from './dialog-routing.module';
import { DialogComponent } from './dialog.component';
import { SwapTableComponent } from './swap-table/swap-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DebtorOrderComponent } from './debtor-order/debtor-order.component';
@NgModule({
  declarations: [
    DialogComponent,
    SwapTableComponent,
    DeleteItemComponent,
    AddCategoryComponent,
    DebtorOrderComponent,
  ],
  imports: [
    CommonModule,
    DialogRoutingModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [SwapTableComponent, DeleteItemComponent],
})
export class DialogModule {}
