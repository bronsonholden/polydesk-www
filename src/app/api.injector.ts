import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularTokenService } from 'angular-token';
import { AccountService } from './account.service';

@Injectable()
export class ApiInjector implements HttpInterceptor {
  constructor(private tokenService: AngularTokenService,
              private accountService: AccountService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiBase = this.tokenService.tokenOptions.apiBase;

    if (request.url.startsWith(apiBase) || request.responseType !== 'json') {
      return next.handle(request);
    }

    const clonedRequest = request.clone({
      url: `${apiBase}/${this.accountService.account}/${request.url}`
    });

    return next.handle(clonedRequest);
  }
}
