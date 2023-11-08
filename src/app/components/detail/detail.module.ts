import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [provideNgxMask()],
})
export class DetailModule {}
