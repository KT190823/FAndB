import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeRoutingModule } from './qrcode-routing.module';
import { QrcodeComponent } from './qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [QrcodeComponent],
  imports: [
    CommonModule,
    QrcodeRoutingModule,
    QRCodeModule,
    MatButtonModule,
    ToolbarModule,
    ClipboardModule,
  ],
})
export class QrcodeModule {}
