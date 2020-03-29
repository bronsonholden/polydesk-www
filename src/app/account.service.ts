import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public account: string | null = null;

  constructor() { }
}
