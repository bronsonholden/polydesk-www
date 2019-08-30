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

  selectFormSubmission() {
    const formId = get(this.field, 'formId');

    this.selectDialogService.selectFormSubmission(formId, {
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((res: any) => {
      console.log(res);
    });

    // this.formSubmissionApiService.getFormSubmissionsForForm(this.field.formId).subscribe((result: any) => {
    //   let data = result.data.map(item => get(item.attributes.data, this.field.selectKey)).filter(key => key);
    //
    //   console.log(data);
    // }, err => {
    //   console.log(err);
    // });
  }

}
