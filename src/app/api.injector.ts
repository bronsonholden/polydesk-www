import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularTokenService } from 'angular-token';

@Injectable()
export class ApiInjector implements HttpInterceptor {
  constructor(private tokenService: AngularTokenService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiBase = this.tokenService.tokenOptions.apiBase;

    if (request.url.startsWith(apiBase) || request.responseType !== 'json') {
      return next.handle(request);
    }

    const clonedRequest = request.clone({
      url: `${apiBase}/${request.url}`
    });

    return next.handle(clonedRequest);
  }
}
