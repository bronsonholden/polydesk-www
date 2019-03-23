import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { get, set } from 'lodash-es';

function buildObject(schema) {
  if (!schema.properties) {
    return null;
  }

  let obj = {};
  let properties = Object.keys(schema.properties);

  for (let property of properties) {
    let child = buildObject(schema.properties[property]);

    if (child) {
      obj[property] = child;
    }
  }

  return obj;
}

function createObject(schema) {
  switch (schema.type) {
    case 'object':
      return buildObject(schema);
    case 'array':
      return [];
    default:
      return null;
  }
}

/**
 * A FormContainer corresponds to a specified form layout. It constructs
 * the form from the sections of the layout (sublayouts are created with
 * child FormContainers), and populates them with the form widgets.
 */
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {

  @Input() layout: any;
  @Input() schemaMap: any;
  @Input() schemaPointer: any = '';
  @Input() data: any;
  @Output() dataChange = new EventEmitter<any>();
  schema: any;

  constructor() { }

  ngOnInit() {
    this.schema = this.schemaMap[this.schemaPointer];
  }

  getFieldName(field, i: number | undefined) {
    if (typeof i === 'number') {
      return `[${i}].${field}`;
    } else {
      return `${field}`;
    }
  }

  getSchemaPointer(section) {
    let pointer = `${this.schemaPointer}/properties/${section.dataSource}`;

    return pointer;
  }

  getFieldSchema(field) {
    let pointer = this.schemaPointer;

    if (pointer !== '' && this.schemaMap[pointer].type === 'array') {
      pointer += '/items';
    }

    return this.schemaMap[`${pointer}/properties/${field}`];
  }

  getDataSource(section) {
    let obj = get(this.data, section.dataSource);

    if (!obj) {
      let schema = this.getFieldSchema(section.dataSource);
      obj = createObject(schema);
      set(this.data, section.dataSource, obj);
    }

    return obj;
  }

  getFieldValue(field) {
    return get(this.data, field);
  }

  setFieldValue(field, value) {
    set(this.data, field, value);
    this.dataChange.emit(this.data);
  }

  trackByFn(index, item) {
    return index;
  }

  getRows(section) {
    const cols = section.columns;
    let rows = [];

    if (!cols) {
      return [
        { fields: section.fields }
      ];
    }

    for (let i = 0; i < section.fields.length; i += cols) {
      rows.push({
        fields: section.fields.slice(i, i + cols)
      });
    }

    return rows;
  }

  getFlexWidth(section) {
    switch (section.columns) {
      case 2:
        return '50';
      case 3:
        return '33.3';
      case 4:
        return '25';
      default:
        return '100';
    }
  }

  widgetOptions(field, i: number | undefined) {
    const fieldName = this.getFieldName(field, i);
    return {
      schema: this.getFieldSchema(field),
      name: fieldName,
      value: this.getFieldValue(fieldName)
    }
  }

}
