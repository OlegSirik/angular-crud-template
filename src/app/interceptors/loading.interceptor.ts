import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../core/services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private count = 0;
  constructor(private loader: LoaderService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++; this.loader.show();
    return next.handle(req).pipe(finalize(() => { this.count--; if (this.count === 0) this.loader.hide(); }));
  }
}
