import { ViewContainerRef, ComponentRef, ComponentFactoryResolver, Injectable } from '@angular/core';
import { TextWidgetComponent } from './text-widget/text-widget.component';
import { WidgetRegistry } from './widget-registry';

@Injectable()
export class WidgetFactory {

  constructor(private widgetRegistry: WidgetRegistry,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  createWidget(widgetId: string, viewContainer: ViewContainerRef): ComponentRef<any> {
    let widgetClass = this.widgetRegistry.widgets[widgetId];
    let factory = this.componentFactoryResolver.resolveComponentFactory(widgetClass);
    return viewContainer.createComponent(factory);
  }

}
