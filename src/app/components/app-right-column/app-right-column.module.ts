import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRightColumnComponent } from './app-right-column.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PortalModule } from '@angular/cdk/portal';
import { InvoiceModule } from '../invoice/invoice.module';

@NgModule({
  declarations: [AppRightColumnComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    PortalModule,
    InvoiceModule,
  ],
  exports: [AppRightColumnComponent],
})
export class AppRightColumnModule {}
