import { Injectable } from '@angular/core';
import { ResourceApi } from './resource-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService extends ResourceApi {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  resourceName() {
    return 'accounts';
  }

}
