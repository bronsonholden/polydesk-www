import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WidgetFactory } from './widget-library/widget-factory';

/**
 * A FormWidget is a component that dynamically creates form controls based
 * on its assigned schema. For arrays, it creates a list of child FormWidgets
 * and assigns those the schema appropriate for the items in the array.
 */
@Component({
  selector: 'app-form-widget',
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.scss']
})
export class FormWidgetComponent implements OnInit {

  @ViewChild('target', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() fieldSchema: any;
  @Input() fieldName: string;
  @Input() fieldValue: any;
  @Output() fieldValueChanged = new EventEmitter<any>();

  constructor(private widgetFactory: WidgetFactory) { }

  ngOnInit() {
  }

  get fieldTitle(): string {
    if (this.fieldSchema.title) {
      return this.fieldSchema.title;
    }

    return this.fieldName;
  }

  updateFieldValue(value) {
    this.fieldValueChanged.emit(value);
  }

  trackByFn(index, item) {
    return index;
  }

  itemFieldName(index) {
    return `${this.fieldName}[${index}]`;
  }

}
