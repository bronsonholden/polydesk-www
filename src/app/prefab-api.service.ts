import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResourceApi } from './resource-api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefabApiService extends ResourceApi{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  resourceName() {
    return 'prefabs';
  }

  getPrefabByUid(namespace, tag) {
    return this.index(0, 1, null, { filter: { namespace, tag } });
  }

}
