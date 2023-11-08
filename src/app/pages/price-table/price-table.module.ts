import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceTableRoutingModule } from './price-table-routing.module';
import { PriceTableComponent } from './price-table.component';
import { NewPriceComponent } from './new-price/new-price.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ListItemsComponent } from './list-items/list-items.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FormControlChipModule } from 'src/app/components/form-control-chip/form-control-chip.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [PriceTableComponent, NewPriceComponent, ListItemsComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    PriceTableRoutingModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMaskDirective,
    FormControlChipModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
})
export class PriceTableModule {}
