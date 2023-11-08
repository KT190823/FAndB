import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductsRoutingModule } from './edit-products-routing.module';
import { EditProductsComponent } from './edit-products.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [EditProductsComponent],
  imports: [
    CommonModule,
    EditProductsRoutingModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
})
export class EditProductsModule {}
