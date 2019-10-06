import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import { merge } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionApiService {
  constructor(private httpClient: HttpClient) {
  }

  index(offset, limit, sort, filter, query) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort && sort.length > 0) {
      params = params.set('sort', sort);
    }

    for (let f in filter) {
      params = params.set(`filter[${f}]`, filter[f]);
    }

    for (let q in (query || {})) {
      params = params.set(q, query[q]);
    }

    return this.httpClient.get('form-submissions', { params });
  }

  createFormSubmission(formId, data, state) {
    const params = {
      data: {
        type: 'form-submissions',
        attributes: {
          data: data,
          state: state
        },
        relationships: {
          form: {
            data: {
              id: formId,
              type: 'forms'
            }
          }
        }
      }
    };

    return this.httpClient.post('form-submissions', params);
  }

  getFormSubmissionsForForm(formId) {
    return this.httpClient.get(`forms/${formId}/form-submissions`);
  }

  getFormSubmission(id) {
    return this.httpClient.get(`form-submissions/${id}`);
  }

  updateFormSubmission(id, attributes) {
    let updatedAttributes = {};

    return this.httpClient.patch(`form-submissions/${id}`, {
      data: {
        id: id,
        type: 'form-submissions',
        attributes: attributes
      }
    });
  }

}
