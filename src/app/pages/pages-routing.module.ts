import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HistoryProcessComponent } from './history-process/history-process.component';
import { ListHistoryProcessComponent } from './history-process/list-history-process/list-history-process.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'settings',

        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'find',
        loadChildren: () =>
          import('./find/find.module').then((m) => m.FindModule),
      },
      {
        path: 'app-speed-dial-fab',
        loadChildren: () =>
          import('../components/speed-dial-fab/speed-dial-fab.component').then(
            (m) => m.SpeedDialFabComponent
          ),
      },
      {
        path: 'toolbar',
        loadChildren: () =>
          import('../components/toolbar/toolbar.module').then(
            (m) => m.ToolbarModule
          ),
      },
      {
        path: 'example',
        loadChildren: () =>
          import('./example/example.module').then((m) => m.ExampleModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'hello',
        loadChildren: () =>
          import('./hello/hello.module').then((m) => m.HelloModule),
      },
      {
        path: 'qrcode',
        loadChildren: () =>
          import('./qrcode/qrcode.module').then((m) => m.QrcodeModule),
      },
      {
        path: 'order-log',
        loadChildren: () =>
          import('./order-log/order-log.module').then((m) => m.OrderLogModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./payment/payment.module').then((m) => m.PaymentModule),
      },
      {
        path: 'dialog',
        loadChildren: () =>
          import('../components/dialog/dialog.module').then(
            (m) => m.DialogModule
          ),
      },

      {
        path: 'nodata',
        loadChildren: () =>
          import('../components/nodata/nodata.module').then(
            (m) => m.NodataModule
          ),
      },
      {
        path: 'invoice-list',
        loadChildren: () =>
          import('./invoicelist/invoicelist.module').then(
            (m) => m.InvoicelistModule
          ),
      },
      {
        path: 'price-table',
        loadChildren: () =>
          import('./price-table/price-table.module').then(
            (m) => m.PriceTableModule
          ),
      },
      {
        path: 'print',
        loadChildren: () =>
          import('../components/print/print.module').then((m) => m.PrintModule),
      },
      {
        path: 'edit-products',
        loadChildren: () =>
          import('../components/edit-products/edit-products.module').then(
            (m) => m.EditProductsModule
          ),
      },
      {
        path: 'history-process/:id',
        component: HistoryProcessComponent,
      },
      {
        path: 'history-process',
        component: ListHistoryProcessComponent,
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
