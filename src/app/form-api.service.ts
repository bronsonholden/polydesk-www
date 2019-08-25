import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
