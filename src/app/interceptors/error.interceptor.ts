import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snack: MatSnackBar) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      let msg = 'Server error';
      if (err.status === 0) msg = 'Server unreachable';
      else if (err.status === 401) msg = 'Unauthorized';
      else if (err.status === 403) msg = 'Forbidden';
      else if (err.status === 404) msg = 'Not found';
      else if (err.error?.message) msg = err.error.message;
      this.snack.open(msg, 'Close', { duration: 4000 });
      return throwError(() => err);
    }));
  }
}
