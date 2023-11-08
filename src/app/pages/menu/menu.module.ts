import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { AddComponent, MenuComponent } from './menu.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {register} from 'swiper/element/bundle';
register();
@NgModule({
  declarations: [
    MenuComponent, 
    AddComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatChipsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    NgFor,
    MatIconModule,
    FormsModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    ToolbarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonToggleModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule { }
