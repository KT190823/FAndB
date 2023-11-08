import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailHistoryProcessComponent } from './detail-history-process.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DetailHistoryProcessComponent],
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
export class DetailHistoryProcessModule {}
