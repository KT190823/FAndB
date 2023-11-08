import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableOpenRoutingModule } from './table-open-routing.module';
import { TableOpenComponent } from './table-open.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    TableOpenComponent
  ],
  imports: [
    CommonModule,
    TableOpenRoutingModule,
    MatCardModule,
    MatRippleModule
  ]
})
export class TableOpenModule { }
