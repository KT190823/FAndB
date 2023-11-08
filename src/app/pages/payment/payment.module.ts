import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    MatRippleModule,
  ],
  providers: [provideNgxMask()],
})
export class PaymentModule {}
