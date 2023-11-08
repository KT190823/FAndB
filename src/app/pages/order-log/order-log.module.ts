import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderLogRoutingModule } from './order-log-routing.module';
import { OrderLogComponent } from './order-log.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [OrderLogComponent],
  imports: [
    CommonModule,
    OrderLogRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class OrderLogModule {}
