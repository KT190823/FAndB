import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriceTableComponent } from './price-table.component';
import { NewPriceComponent } from './new-price/new-price.component';
import { ListItemsComponent } from './list-items/list-items.component';

const routes: Routes = [
  {
    path: '',
    component: PriceTableComponent,
    children: [
      {
        path: 'list',
        component: ListItemsComponent,
      },
      {
        path: ':id',
        component: NewPriceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceTableRoutingModule {}
