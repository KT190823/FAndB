import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicelistComponent } from './invoicelist.component';

const routes: Routes = [{ path: '', component: InvoicelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicelistRoutingModule { }
