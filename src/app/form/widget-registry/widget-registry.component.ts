import { Component, OnInit } from '@angular/core';
import { DefaultWidgetRegistry } from 'ngx-schema-form';
import { TextWidget } from '../widgets/text/text.widget';

@Component({
  selector: 'app-widget-registry',
  templateUrl: './widget-registry.component.html',
  styleUrls: ['./widget-registry.component.scss']
})
export class WidgetRegistryComponent extends DefaultWidgetRegistry {

  constructor() {
    super();
    this.register('string', TextWidget);
  }

  ngOnInit() {
  }

}
