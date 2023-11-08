import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SpeedDialFabModule } from '../../components/speed-dial-fab/speed-dial-fab.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatMenuModule,
    SpeedDialFabModule,
    ToolbarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
})
export class OrderModule {}
