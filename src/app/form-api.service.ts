import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {
  constructor(private httpClient: HttpClient) {
  }

  getForm(id) {
    return this.httpClient.get(`forms/${id}`);
  }

  createForm(name, schema) {
    return this.httpClient.post('forms', {
      data: {
        type: 'forms',
        attributes: {
          name: name,
          schema: schema
        }
      }
    });
  }

  index(offset, limit, sort, filter) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort) {
      params = params.set('sort', sort);
    }

    for (let f in filter) {
      params = params.set(`filter[${f}]`, filter[f]);
    }

    return this.httpClient.get('forms', { params });
  }

  updateForm(id, attributes) {
    let updatedAttributes = {};

    return this.httpClient.patch(`forms/${id}`, {
      data: {
        id: id,
        type: 'forms',
        attributes: attributes
      }
    });
  }

}
