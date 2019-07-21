import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-form-widget-object',
  templateUrl: './form-widget-object.component.html',
  styleUrls: ['./form-widget-object.component.scss']
})
export class FormWidgetObjectComponent extends FieldType {
  defaultOptions = {
    defaultValue: {}
  };
}
