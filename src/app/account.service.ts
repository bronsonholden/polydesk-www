import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public account: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.root.params.subscribe(params => {
      const accountIdentifier = this.route.snapshot.root.children[0].params.account;

      if (accountIdentifier) {
        this.account = accountIdentifier;
      }
    });
  }
}
