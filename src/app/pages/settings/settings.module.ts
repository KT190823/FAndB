import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SettingRoleComponent } from './setting-role/setting-role.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SettingPrintComponent } from './setting-print/setting-print.component';
import { SettingAppComponent } from './setting-app/setting-app.component';
import { SettingPermissionComponent } from './setting-permission/setting-permission.component';
import { SettingMenuComponent } from './setting-menu/setting-menu.component';
import { MatRippleModule } from '@angular/material/core';
import { SettingProductsComponent } from './setting-products/setting-products.component';
import { SettingTableComponent } from './setting-table/setting-table.component';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { PortalModule } from '@angular/cdk/portal';

import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    SettingsComponent,
    SettingRoleComponent,
    SettingPrintComponent,
    SettingAppComponent,
    SettingPermissionComponent,
    SettingMenuComponent,
    SettingProductsComponent,
    SettingTableComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    ScrollingModule,
    ToolbarModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    FormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatRippleModule,
    RouterModule,
    CdkTableModule,
    PortalModule,
    MatSliderModule,
  ],
})
export class SettingsModule {}
