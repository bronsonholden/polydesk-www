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

    const restrictedUrls = [
      apiBase, // AngularToken methods will prepend apiBase
      'auth',
      'confirmations'
    ];

    for (let url of restrictedUrls) {
      if (request.url.startsWith(url)) {
        return next.handle(request);
      }
    }

    // Only prepend for API requests (which expect JSON)
    if (request.responseType !== 'json') {
      return next.handle(request);
    }

    let parts = [apiBase, this.accountService.account, request.url].filter(part => part);

    const clonedRequest = request.clone({
      url: parts.join('/')
    });

    return next.handle(clonedRequest);
  }
}
