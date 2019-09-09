import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatSlider } from '@angular/material';
import { get } from 'lodash';

@Component({
  selector: 'app-form-widget-slider',
  templateUrl: './form-widget-slider.component.html',
  styleUrls: ['./form-widget-slider.component.scss']
})
export class FormWidgetSliderComponent extends FieldType implements OnInit {

  @ViewChild(MatSlider) slider!: MatSlider;

  defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always',
    },
  };

  constructor() {
    super();
  }

  ngOnInit() {
    this.baseLabel = this.to.label;
    this.updateLabel(this.formControl.value || this.to.min);
  }

  getDisplayValue() {
    if (typeof this.formControl.value !== 'number') {
      return this.to.min;
    } else {
      return this.formControl.value;
    }
  }

  updateLabel(value) {
    this.to.label = `${this.baseLabel}: ${value}`;
  }

  onSliderChange(sliderValue) {
    this.updateLabel(sliderValue.value);
    this.formControl.setValue(sliderValue.value);
  }

}
