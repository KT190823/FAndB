import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/authGuard.guard';
import { AuthService } from './shared/services/auth/auth.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./components/detail/detail.module').then((m) => m.DetailModule),
  },
  {
    path: 'detail-history-process',
    loadChildren: () =>
      import(
        './components/detail-history-process/detail-history-process.module'
      ).then((m) => m.DetailHistoryProcessModule),
  },
  {
    path: 'table-open',
    loadChildren: () =>
      import('./components/table-open/table-open.module').then(
        (m) => m.TableOpenModule
      ),
  },

  { path: '', redirectTo: '/pages/order', pathMatch: 'full' },
  {
    path: 'edit-role',
    loadChildren: () =>
      import('./components/edit-role/edit-role.module').then(
        (m) => m.EditRoleModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService],
})
export class AppRoutingModule {}
