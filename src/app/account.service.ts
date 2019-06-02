import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public account: string | null = null;

  constructor(private router: Router) {
    // Sets account when navigating
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const route = this.router.routerState.snapshot.root;

      if (route.children.length > 0) {
        this.account = route.children[0].params.account;
      } else {
        this.account = null;
      }
    });
  }
}
