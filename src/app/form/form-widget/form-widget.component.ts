import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WidgetFactory } from './widget-library/widget-factory';

@Component({
  selector: 'app-form-widget',
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.scss']
})
export class FormWidgetComponent implements OnInit {

  @ViewChild('target', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private widgetFactory: WidgetFactory) { }

  ngOnInit() {
    this.widgetFactory.createWidget('text', this.container);
  }

}
