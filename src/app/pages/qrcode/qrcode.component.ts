import { Component } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent {
  nav = {
    icon: 'menu',
    routers: '/order',
    name: 'Home',
  };

  value = window.location.origin + `/pages/find`;
}
