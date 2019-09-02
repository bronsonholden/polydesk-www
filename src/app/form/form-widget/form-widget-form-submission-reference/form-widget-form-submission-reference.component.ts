import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { SelectDialogService } from '../../../select-dialog.service';
import { FormSubmissionApiService } from '../../../form-submission-api.service';
import { get } from 'lodash';

@Component({
  selector: 'app-form-widget-form-submission-reference',
  templateUrl: './form-widget-form-submission-reference.component.html',
  styleUrls: ['./form-widget-form-submission-reference.component.scss']
})
export class FormWidgetFormSubmissionReferenceComponent extends FieldType implements OnInit {

  formSubmission: any;

  constructor(private formSubmissionApiService: FormSubmissionApiService,
              private selectDialogService: SelectDialogService) {
    super();
  }

  ngOnInit() {
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
  }

  selectedFormSubmissionKey() {
    if (this.formSubmission) {
      return get(this.formSubmission.attributes, this.field.selectKey);
    }
  }

  selectFormSubmission() {
    const formId = get(this.field, 'formId');

    this.selectDialogService.selectFormSubmission(formId, {
      selectKey: this.field.selectKey,
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((res: any) => {
      this.formSubmission = res;
      this.formControl.setValue(res.id);
    });
  }

}
