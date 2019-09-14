import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss']
})
export class FormSubmitComponent implements OnInit {

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() formId: any;
  @Input() allowDrafts = true;
  @Input() model: any = {};
  @Input() options: any = {};

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

  cancelSubmission() {
    this.formCancel.emit();
  }

}
