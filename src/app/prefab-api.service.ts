import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefabApiService {

  constructor(private httpClient: HttpClient) { }

  getPrefabByUid(namespace, tag) {
    return this.index(0, 1, null, { filter: { namespace, tag } });
  }

  index(offset, limit, sort, query) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort && sort.length > 0) {
      params = params.set('sort', sort);
    }

    const filter = (query.filter || {});

    for (let f in filter) {
      params = params.set(`filter[${f}]`, filter[f]);
    }

    const generate = (query.generate || {});

    for (let g in generate) {
      params = params.set(`generate[${g}]`, generate[g]);
    }

    return this.httpClient.get('prefabs', { params });
  }
}
