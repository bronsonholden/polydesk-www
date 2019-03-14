import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WidgetFactory } from './widget-library/widget-factory';

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
    //this.widgetFactory.createWidget('text', this.container);
  }

  updateFieldValue(value) {
    this.fieldValueChanged.emit(value);
  }

}
