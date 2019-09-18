import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FolderContentApiService {

  constructor(private httpClient: HttpClient) { }

  index(offset, limit, sort, filter) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort) {
      params = params.set('sort', sort);
    }

    for (let f in filter) {
      params = params.set(`filter[${f}]`, filter[f]);
    }

    return this.httpClient.get('content', { params });
  }
}
