import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { InvoicelistRoutingModule } from './invoicelist-routing.module';
import { InvoicelistComponent } from './invoicelist.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SpeedDialFabModule } from '../../components/speed-dial-fab/speed-dial-fab.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvoicelistComponent],
  imports: [
    CommonModule,
    InvoicelistRoutingModule,
    MatIconModule,
    MatListModule,
    SpeedDialFabModule,
    ToolbarModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
  ],
})
export class InvoicelistModule {}
