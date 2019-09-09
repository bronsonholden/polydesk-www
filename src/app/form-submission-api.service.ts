import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionApiService {
  constructor(private httpClient: HttpClient) {
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
