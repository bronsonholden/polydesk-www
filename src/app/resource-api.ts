import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

export abstract class ResourceApi {

  constructor(protected httpClient: HttpClient) { }

  abstract resourceName(): string;

  index(offset, limit, sort, query) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort && sort.length > 0) {
      params = params.set('sort', sort);
    }

    const hashParams = [
      'generate'
    ];

    const arrayParams = [
      'filter'
    ]

    for (let param of hashParams) {
      const hash = query[param] || {};
      for (let key in hash) {
        params = params.set(`${param}[${key}]`, hash[key]);
      }
    }

    for (let param of arrayParams) {
      const array = query[param] || [];
      for (let val of array) {
        params = params.set(`${param}[]`, val);
      }
    }

    return this.httpClient.get(this.resourceName(), { params });
  }

}
