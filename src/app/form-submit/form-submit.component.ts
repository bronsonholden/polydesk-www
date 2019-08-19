import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss']
})
export class FormSubmitComponent implements OnInit {

  form = new FormGroup({});
  @Input() model: any;
  @Input() fields: FormlyFieldConfig[];
  @Input() options: FormlyFormOptions;
  @Input() formName: string;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private location: Location) { }

  ngOnInit() {
  }

  submitForm() {
    this.formSubmit.emit({
      model: this.model,
      draft: false
    });
  }

  saveDraft() {
    this.formSubmit.emit({
      model: this.model,
      draft: true
    });
  }

  goBack() {
    this.location.back();
  }

}
