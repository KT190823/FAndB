import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { lastValueFrom, from } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    let authorization: string = '';
    await this.authService.getUser().then((user: any) => {
      authorization = user?.token_type + ' ' + user?.access_token;
    });
    request = request.clone({
      setHeaders: {
        Authorization: authorization,
      },
    });

    return await lastValueFrom(next.handle(request));
  }
}
