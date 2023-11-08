import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderLogComponent } from './order-log.component';

const routes: Routes = [{ path: '', component: OrderLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderLogRoutingModule { }
