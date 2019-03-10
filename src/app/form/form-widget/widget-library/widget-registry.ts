import { Injectable } from '@angular/core';
import { TextWidgetComponent } from './text-widget/text-widget.component';

@Injectable()
export class WidgetRegistry {
  public widgets = {
    text: TextWidgetComponent
  };

  constructor() { }
}
