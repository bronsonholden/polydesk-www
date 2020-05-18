import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material/form-field';

import { get } from 'lodash';

@Component({
  selector: 'app-prefab-form-input',
  templateUrl: './prefab-form-input.component.html',
  styleUrls: ['./prefab-form-input.component.scss']
})
export class PrefabFormInputComponent extends FieldType implements OnInit {
  @ViewChild(MatInput, { static: true }) formFieldControl!: MatInput;

  constructor() {
    super();
  }

  ngOnInit() {
    this.formControl.setValue(get(this.model, this.field.key));
  }

  get type() {
    return this.to.type || 'text';
  }
}
