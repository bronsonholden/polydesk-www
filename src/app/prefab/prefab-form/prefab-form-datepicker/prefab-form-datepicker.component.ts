import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';

@Component({
  selector: 'app-prefab-form-datepicker',
  templateUrl: './prefab-form-datepicker.component.html',
  styleUrls: ['./prefab-form-datepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [ MAT_DATE_LOCALE ] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class PrefabFormDatepickerComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onDateChange(event) {
    if (event.target.value) {
      this.formControl.setValue(event.target.value.format('YYYY-MM-DD'));
    }
  }

}
