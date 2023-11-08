import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableOpenComponent } from './table-open.component';

const routes: Routes = [{ path: '', component: TableOpenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableOpenRoutingModule { }
