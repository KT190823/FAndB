import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [provideNgxMask()],
})
export class InvoiceModule {}
