import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WidgetFactory } from './widget-library/widget-factory';

export class FormWidgetOptions {
  schema: any;
  name: string;
  value: any;
}

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

  @Input() options: FormWidgetOptions;
  @Output() valueChange = new EventEmitter<any>();

  constructor(private widgetFactory: WidgetFactory) { }

  ngOnInit() {
  }

  get fieldTitle(): string {
    if (this.options.schema.title) {
      return this.options.schema.title;
    }

    return this.options.name;
  }

  updateFieldValue(value) {
    this.valueChange.emit(value);
  }

  trackByFn(index, item) {
    return index;
  }

  itemFieldName(index) {
    return `${this.options.name}[${index}]`;
  }

  childWidgetOptions(item, i) {
    return {
      name: this.itemFieldName(i),
      schema: this.options.schema.items,
      value: item
    };
  }

}
