import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.snackBar.open('Unable to connect to API server', 'OK', {
          duration: 5000
        });
        return;
      }

      let messages = error.error.errors.map(item => {
        if (typeof item === 'string') {
          return item;
        }

        if (typeof item.detail === 'string') {
          return item.detail;
        }

        if (typeof item.title === 'string') {
          return item.title;
        }

        return 'Unknown error occurred';
      });

      messages.forEach(message => {
        this.snackBar.open(message, 'OK', {
          duration: 5000
        });
      });

      return throwError(error);
    }));
  }
}
