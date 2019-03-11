import { Component, OnInit, Input } from '@angular/core';
import { WidgetFactory } from './form-widget/widget-library/widget-factory';
import { WidgetRegistry } from './form-widget/widget-library/widget-registry';
import * as Ajv from 'ajv';
import { LAYOUT_SCHEMA } from './layout.schema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() layout: any;
  @Input() schema: any;
  @Input() data: any;

  constructor(private widgetRegistry: WidgetRegistry, private widgetFactory: WidgetFactory) {
  }

  ngOnInit() {
  }

}
