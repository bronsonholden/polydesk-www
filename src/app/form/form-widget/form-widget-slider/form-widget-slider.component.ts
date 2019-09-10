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
  baseLabel: string;

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

    let val = this.formControl.value;

    if (!isNaN(val)) {
      this.updateLabel(this.getSliderMinimum());
    } else {
      this.updateLabel(val);
    }
  }

  getSliderMinimum() {
    let min = 0;

    if (!isNaN(this.to.minimum)) {
      min = this.to.minimum;
    }

    if (!isNaN(this.to.exclusiveMinimum)) {
      min = this.to.exclusiveMinimum + 1;
    }

    return min;
  }

  getSliderMaximum() {
    let max = 100;

    if (!isNaN(this.to.maximum)) {
      max = this.to.maximum;
    }

    if (!isNaN(this.to.exclusiveMaximum)) {
      max = this.to.exclusiveMaximum - 1;
    }

    return max;
  }

  getDisplayValue() {
    if (isNaN(this.formControl.value)) {
      return this.getSliderMinimum();
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
