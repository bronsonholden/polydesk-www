import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldType } from '@ngx-formly/material';
import { SelectDialogService } from '../../../select-dialog.service';
import { FormSubmissionApiService } from '../../../form-submission-api.service';
import { JsonAccessorService } from '../../../json-accessor.service';
import { get } from 'lodash';

@Component({
  selector: 'app-form-widget-form-submission-reference',
  templateUrl: './form-widget-form-submission-reference.component.html',
  styleUrls: ['./form-widget-form-submission-reference.component.scss']
})
export class FormWidgetFormSubmissionReferenceComponent extends FieldType implements OnInit {

  formSubmission: any;
  formSubmissionCreating = false;

  constructor(private formSubmissionApiService: FormSubmissionApiService,
              private httpClient: HttpClient,
              private selectDialogService: SelectDialogService,
              private jsonAccessorService: JsonAccessorService) {
    super();
  }

  ngOnInit() {
    this.loadFormSubmission(this.formControl.value);

    this.formControl.valueChanges.subscribe(value => {
      this.loadFormSubmission(value);
    });
  }

  loadFormSubmission(formSubmissionId) {
    if (formSubmissionId) {
      this.formSubmissionApiService.getFormSubmission(formSubmissionId).subscribe((result: any) => {
        this.formSubmission = result.data;
      });
    }
  }

  selectColor() {
    if (this.required) {
      return 'warn';
    } else {
      return '';
    }
  }

  clearFormSubmissionSelection() {
    this.formSubmission = null;
    this.formControl.setValue(null);
    this.formSubmissionCreating = false;
  }

  selectedFormSubmissionKey() {
    if (this.formSubmission) {
      return this.jsonAccessorService.access(this.formSubmission.attributes, this.field.selectKey, '');
    }
  }

  getFormId() {
    return get(this.field, 'formId');
  }

  formSubmissionSelected() {
    return this.formSubmission;
  }

  createInlineFormSubmission(data) {
    const formId = this.getFormId();
    const params = {
      data: {
        type: 'form-submissions',
        attributes: {
          data: data.model,
          state: data.draft ? 'draft' : 'published'
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

    this.httpClient.post('form-submissions', params).subscribe((result: any) => {
      this.formSubmissionCreating = false;
      this.formSubmission = result.data;
      this.formControl.setValue(result.data.id);
    }, (err: any) => {
      err.error.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  createNewInlineFormSubmission() {
    this.formSubmissionCreating = true;
  }

  selectFormSubmission() {
    const formId = get(this.field, 'formId');

    this.selectDialogService.selectFormSubmission(formId, {
      selectKey: this.field.selectKey,
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((res: any) => {
      if (res) {
        this.formSubmission = res;
        this.formControl.setValue(res.id);
      }
    });
  }

}
