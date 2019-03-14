import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WidgetFactory } from './form-widget/widget-library/widget-factory';
import { WidgetRegistry } from './form-widget/widget-library/widget-registry';
import * as Ajv from 'ajv';
import * as traverseSchema from 'json-schema-traverse';
import { get, set } from 'lodash-es';
import { LAYOUT_SCHEMA } from './layout.schema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private schemaMap = {};
  private ajv: any = new Ajv();
  private _schema: any;

  @Input() layout: any;
  @Input() data: any;

  @Output() dataChange = new EventEmitter<any>();

  @Input() set schema(value: any) {
    let valid = this.ajv.validateSchema(value);

    if (!valid) {
      return;
    }

    this._schema = value;

    traverseSchema(value, {
      cb: {
        pre: (schema, pointer, rootSchema, parentPointer, parentKey, parentSchema, property) => {
          this.schemaMap[pointer] = schema;
        }
      }
    });
  }

  constructor(private widgetRegistry: WidgetRegistry,
              private widgetFactory: WidgetFactory) {
  }

  ngOnInit() {
  }

}
