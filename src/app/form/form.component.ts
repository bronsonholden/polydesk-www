import { Component, OnInit, Input } from '@angular/core';
import { WidgetFactory } from './form-widget/widget-library/widget-factory';
import { WidgetRegistry } from './form-widget/widget-library/widget-registry';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  layoutSchema = {
    type: 'array',
    items: {
      type: 'object'
    }
  };

  constructor(private widgetRegistry: WidgetRegistry, private widgetFactory: WidgetFactory) {
  }

  ngOnInit() {
  }

}
