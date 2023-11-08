import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SpeedDialFabModule } from '../components/speed-dial-fab/speed-dial-fab.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppNavBarModule } from '../components/app-nav-bar/app-nav-bar.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRightColumnModule } from '../components/app-right-column/app-right-column.module';

import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { HistoryProcessComponent } from './history-process/history-process.component';
import { ListHistoryProcessComponent } from './history-process/list-history-process/list-history-process.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { PrinterProvider } from '../shared/services/print/print.interface.service';

@NgModule({
  declarations: [
    PagesComponent,
    HistoryProcessComponent,
    ListHistoryProcessComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SpeedDialFabModule,
    MatGridListModule,
    AppNavBarModule,
    AppRightColumnModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    NgIf,
  ],
  providers: [PrinterProvider],
})
export class PagesModule {}
