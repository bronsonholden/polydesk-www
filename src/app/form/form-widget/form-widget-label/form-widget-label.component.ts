import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'app-form-widget-label',
  templateUrl: './form-widget-label.component.html',
  styleUrls: ['./form-widget-label.component.scss']
})
export class FormWidgetLabelComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  get text(): any {
    return (<any>this.field).text;
  }

}
