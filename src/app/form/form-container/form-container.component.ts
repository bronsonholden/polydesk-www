import { Component, OnInit, Input } from '@angular/core';
import { get, set } from 'lodash-es';

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
  schema: any;

  constructor() { }

  ngOnInit() {
    this.schema = this.schemaMap[this.schemaPointer];
  }

  getFieldName(field, i) {
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
      obj = set(this.data, section.dataSource, {});
    }

    return obj;
  }

  getFieldValue(field) {
    return get(this.data, field);
  }

  setFieldValue(field, value) {
    set(this.data, field, value);
  }

  trackByFn(index, item) {
    return index;
  }

}
