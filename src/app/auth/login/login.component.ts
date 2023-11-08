import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private overlay: OverlayContainer,
    private authService: AuthService
  ) {}
  hide = true;
  login() {
    this.authService.login();
  }
}
