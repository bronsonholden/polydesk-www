import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent implements OnInit {

  form = new FormGroup({});
  @Input() model: any;
  @Input() fields: FormlyFieldConfig[];
  @Output() formSubmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    this.formSubmit.emit(this.model);
  }

}
