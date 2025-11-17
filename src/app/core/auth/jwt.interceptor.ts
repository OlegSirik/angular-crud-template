import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private cfg: ConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let headers: any = {
      'X-Tenant-Id': this.auth.tenant || this.cfg.defaultTenant,
      'X-Client-Id': this.auth.client || this.cfg.defaultClient,
      'X-Account-Id': this.auth.accountId || ''
    };

    if (this.auth.token) { headers['Authorization'] = `Bearer ${this.auth.token}`; }

    const clone = req.clone({ setHeaders: headers });
    return next.handle(clone);
  }
}
