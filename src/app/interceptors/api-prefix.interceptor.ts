import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ConfigService } from '../core/services/config.service';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private cfg: ConfigService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const url = req.url.startsWith('http') ? req.url : `${this.cfg.apiUrl}${req.url}`;
    return next.handle(req.clone({ url }));
  }
}
