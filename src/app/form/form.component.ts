import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WidgetFactory } from './form-widget/widget-library/widget-factory';
import { WidgetRegistry } from './form-widget/widget-library/widget-registry';
import * as Ajv from 'ajv';
import * as traverseSchema from 'json-schema-traverse';
import { get, set } from 'lodash-es';
import { LAYOUT_SCHEMA } from './layout.schema';

/**
 * Primary form component. Wraps a single form container, which generate
 * the entire form view.
 *
 * Some notes on the terms/properties for forms:
 *  - layout: A JSON object that describes how the form should appear.
 *  - schema: A JSON schema object that specifies the data.
 *  - data: The parent data object. FormWidgets and FormContainers have
 *          a similar variable, but that only references the object/array
 *          being displayed.
 *  - schemaPointer: A path/pointer to a field schema within the root schema.
 *  - schemaMap: Maps schema pointers (see above) to a JSON schema object for
 *               that field/property. Propagated throughout all components
 *               in a single form.
 *  - fieldName: All widgets have a field name that is unique across all
 *               widgets in that container. It is used with Lodash get/set to
 *               read/write data to the root data object. It doesn't need to
 *               be unique across the entire form for that.
 *
 * Two way data binding is implemented with custom methods. Using [(ngModel)]
 * doesn't suffice, as we need to dynamically assign which object properties
 * are bound to components. Lodash get/set are used for this purpose.
 */
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
