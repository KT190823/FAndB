import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintComponent } from './print.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

const routes: Routes = [
  { path: 'print-invoice', component: PrintInvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintRoutingModule {}
