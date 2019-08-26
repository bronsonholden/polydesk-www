import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionApiService {
  constructor(private httpClient: HttpClient) {
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
