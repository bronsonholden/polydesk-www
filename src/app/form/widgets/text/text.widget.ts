import { Component } from '@angular/core';
import { ButtonWidget } from 'ngx-schema-form';

@Component({
  selector: 'app-text-widget',
  templateUrl: './text.widget.html',
  styleUrls: ['./text.widget.scss']
})
export class TextWidget extends ButtonWidget {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
