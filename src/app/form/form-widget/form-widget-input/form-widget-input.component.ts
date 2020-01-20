import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material/form-field';

import { get } from 'lodash';

@Component({
  selector: 'app-form-widget-input',
  templateUrl: './form-widget-input.component.html',
  styleUrls: ['./form-widget-input.component.scss']
})
export class FormWidgetInputComponent extends FieldType implements OnInit {
  @ViewChild(MatInput, <any> { static: true }) formFieldControl!: MatInput;

  constructor() {
    super();
  }

  ngOnInit() {
    this.formControl.setValue(get(this.model, this.field.key));
  }

  get type() {
    return this.to.type || 'text';
  }
}
